// SubscriptionManager.js
// Zustand store — persisted to localStorage.
// Wired to your existing /api/subscriptions/my-subscription endpoint.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useSubscription = create(
  persist(
    (set, get) => ({
      plan: 'free',
      status: null,
      expiresAt: null,
      isLoading: false,

      isPro: () => {
        const { plan, status, expiresAt } = get();
        const validPlan   = plan === 'pro' || plan === 'business';
        const validStatus = status === 'ACTIVE' || status === 'PAST_DUE';
        if (!validPlan || !validStatus) return false;
        if (!expiresAt) return true;
        return new Date(expiresAt) > new Date();
      },

      fetchSubscription: async () => {
        set({ isLoading: true });
        try {
          const token = localStorage.getItem('accessToken');
          console.log('📡 Fetching subscription, token:', token ? '✅ exists' : '❌ NULL');

          const res = await fetch(`${API_BASE_URL}/subscriptions/my-subscription`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          console.log('📦 Raw API response:', data);

          if (data.success && data.data) {
            const sub = data.data;
            console.log('📋 sub.plan:', sub.plan);
            console.log('📋 sub.status:', sub.status);
            console.log('📋 sub.currentPeriodEnd:', sub.currentPeriodEnd);

            set({
              plan:      sub.plan?.name?.toLowerCase() || 'free',
              status:    sub.status || null,
              expiresAt: sub.currentPeriodEnd || null,
            });

            console.log('✅ Zustand set to:', useSubscription.getState());
          } else {
            console.log('⚠️ No subscription data — setting free');
            set({ plan: 'free', status: null, expiresAt: null });
          }
        } catch (err) {
          console.error('❌ Subscription fetch error:', err);
        } finally {
          set({ isLoading: false });
        }
      },

      setActive: (planName, expiresAt) => set({
        plan:      planName?.toLowerCase() || 'pro',
        status:    'ACTIVE',
        expiresAt: expiresAt || null,
      }),

      reset: () => set({ plan: 'free', status: null, expiresAt: null }),
    }),
    {
      name: 'linkhub_subscription',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const initSubscriptionForUser = () => {
  useSubscription.getState().fetchSubscription();
};