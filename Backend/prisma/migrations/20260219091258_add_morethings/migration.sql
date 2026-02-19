-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "theme" TEXT DEFAULT 'custom',
ADD COLUMN     "titleFont" TEXT DEFAULT 'Inter',
ADD COLUMN     "titleSize" TEXT DEFAULT 'small',
ADD COLUMN     "titleStyle" TEXT DEFAULT 'text';
