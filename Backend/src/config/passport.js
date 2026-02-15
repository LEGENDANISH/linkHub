import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from './database.js';

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let account = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: 'google',
              providerAccountId: profile.id
            }
          },
          include: {
            user: true
          }
        });

        if (account) {
          // User exists, return user
          return done(null, account.user);
        }

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.emails[0].value }
        });

        if (existingUser) {
          // Link Google account to existing user
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: 'oauth',
              provider: 'google',
              providerAccountId: profile.id,
              access_token: accessToken,
              refresh_token: refreshToken,
              scope: profile._json.scope || 'email profile',
              token_type: 'Bearer',
            }
          });

          return done(null, existingUser);
        }

        // Create new user with Google account
        const username = profile.emails[0].value.split('@')[0] + Math.random().toString(36).substring(7);
        
        const user = await prisma.user.create({
          data: {
            email: profile.emails[0].value,
            username,
            name: profile.displayName,
            image: profile.photos?.[0]?.value,
            emailVerified: new Date(),
            password: '', // No password for OAuth users
            accounts: {
              create: {
                type: 'oauth',
                provider: 'google',
                providerAccountId: profile.id,
                access_token: accessToken,
                refresh_token: refreshToken,
                scope: 'email profile',
                token_type: 'Bearer',
              }
            },
            profile: {
              create: {
                slug: username,
                profileImage: profile.photos?.[0]?.value
              }
            }
          }
        });

        // Assign FREE plan
        const freePlan = await prisma.plan.findUnique({
          where: { name: 'FREE' }
        });

        if (freePlan) {
          await prisma.subscription.create({
            data: {
              userId: user.id,
              planId: freePlan.id,
              status: 'ACTIVE',
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            }
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
