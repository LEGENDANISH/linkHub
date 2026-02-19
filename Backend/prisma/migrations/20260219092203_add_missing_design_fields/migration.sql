-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "gradientColor" TEXT,
ADD COLUMN     "gradientDirection" TEXT DEFAULT 'linear-down',
ADD COLUMN     "imageEffect" TEXT DEFAULT 'none',
ADD COLUMN     "imageTint" INTEGER DEFAULT 0,
ADD COLUMN     "noise" BOOLEAN DEFAULT false;
