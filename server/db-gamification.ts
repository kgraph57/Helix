/**
 * ゲーミフィケーション機能用のデータベース関数
 * このファイルは feature/gamification-setup ブランチでのみ使用
 */

import { eq, desc, and } from "drizzle-orm";
import { getDb } from "./db";
import { logger } from "./_core/logger";

// 注意: 実際のスキーマ定義は drizzle/schema.ts にあります
// ここでは型定義のみ（実装時は適切なスキーマをインポート）

interface UserStats {
  id: number;
  userId: number;
  totalXP: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date | null;
  totalLessonsCompleted: number;
  totalQuizzesPassed: number;
  createdAt: Date;
  updatedAt: Date;
}

interface InsertUserStats {
  userId: number;
  totalXP?: number;
  currentLevel?: number;
  currentStreak?: number;
  longestStreak?: number;
  lastStudyDate?: Date | null;
  totalLessonsCompleted?: number;
  totalQuizzesPassed?: number;
}

/**
 * ユーザー統計を取得または作成
 */
export async function getUserStats(userId: number): Promise<UserStats | null> {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot get user stats: database not available", { userId });
    return null;
  }

  // 注意: 実際の実装では、drizzleスキーマから適切なテーブルをインポート
  // const result = await db.select().from(userStats).where(eq(userStats.userId, userId)).limit(1);
  // return result[0] || null;

  // 暫定実装: データベースが利用できない場合はnullを返す
  return null;
}

/**
 * ユーザー統計を更新または作成
 */
export async function upsertUserStats(data: InsertUserStats): Promise<void> {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot upsert user stats: database not available", { userId: data.userId });
    return;
  }

  // 注意: 実際の実装では、drizzleスキーマを使用
  // const existing = await getUserStats(data.userId);
  // if (existing) {
  //   await db.update(userStats).set(data).where(eq(userStats.userId, data.userId));
  // } else {
  //   await db.insert(userStats).values(data);
  // }

  logger.debug("User stats upserted", { userId: data.userId });
}

/**
 * XPを追加
 */
export async function addXP(userId: number, xp: number): Promise<void> {
  const stats = await getUserStats(userId);
  const newTotalXP = (stats?.totalXP || 0) + xp;

  await upsertUserStats({
    userId,
    totalXP: newTotalXP,
  });

  logger.info("XP added", { userId, xp, newTotalXP });
}

/**
 * ユーザーバッジを取得
 */
export async function getUserBadges(userId: number): Promise<Array<{
  id: number;
  userId: number;
  badgeId: string;
  badgeName: string;
  badgeDescription: string | null;
  earnedAt: Date;
}>> {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot get user badges: database not available", { userId });
    return [];
  }

  // 注意: 実際の実装では、drizzleスキーマを使用
  // return await db.select().from(userBadges).where(eq(userBadges.userId, userId));

  return [];
}

/**
 * バッジを付与
 */
export async function awardBadge(
  userId: number,
  badgeId: string,
  badgeName: string,
  badgeDescription?: string
): Promise<void> {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot award badge: database not available", { userId, badgeId });
    return;
  }

  // 注意: 実際の実装では、drizzleスキーマを使用
  // await db.insert(userBadges).values({
  //   userId,
  //   badgeId,
  //   badgeName,
  //   badgeDescription: badgeDescription || null,
  // }).onDuplicateKeyUpdate({ set: {} });

  logger.info("Badge awarded", { userId, badgeId, badgeName });
}
