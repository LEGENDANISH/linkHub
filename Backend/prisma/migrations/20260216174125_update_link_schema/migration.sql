/*
  Warnings:

  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `borderColor` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `borderWidth` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `buttonColor` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `buttonStyle` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `clickCount` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `isScheduled` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `linkType` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleEnd` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleStart` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Link` table. All the data in the column will be lost.
  - The `id` column on the `Link` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `LinkClick` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LinkClick` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `linkId` on the `LinkClick` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "LinkClick" DROP CONSTRAINT "LinkClick_linkId_fkey";

-- DropIndex
DROP INDEX "Link_isActive_idx";

-- DropIndex
DROP INDEX "Link_order_idx";

-- AlterTable
ALTER TABLE "Link" DROP CONSTRAINT "Link_pkey",
DROP COLUMN "borderColor",
DROP COLUMN "borderWidth",
DROP COLUMN "buttonColor",
DROP COLUMN "buttonStyle",
DROP COLUMN "clickCount",
DROP COLUMN "icon",
DROP COLUMN "isActive",
DROP COLUMN "isScheduled",
DROP COLUMN "linkType",
DROP COLUMN "order",
DROP COLUMN "scheduleEnd",
DROP COLUMN "scheduleStart",
DROP COLUMN "textColor",
DROP COLUMN "title",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "animation" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "iconType" TEXT DEFAULT 'auto',
ADD COLUMN     "layout" TEXT NOT NULL DEFAULT 'classic',
ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "redirect" TEXT,
ADD COLUMN     "schedule" JSONB,
ADD COLUMN     "thumbnailCrop" JSONB,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Link_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LinkClick" DROP CONSTRAINT "LinkClick_pkey",
ADD COLUMN     "os" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "linkId",
ADD COLUMN     "linkId" BIGINT NOT NULL,
ADD CONSTRAINT "LinkClick_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Link_active_idx" ON "Link"("active");

-- CreateIndex
CREATE INDEX "LinkClick_linkId_idx" ON "LinkClick"("linkId");

-- AddForeignKey
ALTER TABLE "LinkClick" ADD CONSTRAINT "LinkClick_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
