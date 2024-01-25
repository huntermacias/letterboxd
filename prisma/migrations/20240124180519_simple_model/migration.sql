/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovieList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToMovieList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserFavorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserLikedLists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToMovieList" DROP CONSTRAINT "_MovieToMovieList_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToMovieList" DROP CONSTRAINT "_MovieToMovieList_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavorites" DROP CONSTRAINT "_UserFavorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavorites" DROP CONSTRAINT "_UserFavorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedLists" DROP CONSTRAINT "_UserLikedLists_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedLists" DROP CONSTRAINT "_UserLikedLists_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "role";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "MovieList";

-- DropTable
DROP TABLE "_MovieToMovieList";

-- DropTable
DROP TABLE "_UserFavorites";

-- DropTable
DROP TABLE "_UserLikedLists";

-- DropEnum
DROP TYPE "UserRole";
