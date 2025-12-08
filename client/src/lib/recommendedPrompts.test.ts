/**
 * おすすめプロンプトのテスト
 */

import { describe, it, expect } from "vitest";
import {
  getRecommendedPrompts,
  getCategoryRecommendedPrompts,
  recommendedPromptIds,
} from "./recommendedPrompts";
import { fullPrompts } from "./prompts-full";

describe("recommendedPrompts", () => {
  describe("getRecommendedPrompts", () => {
    it("おすすめプロンプトIDリストに含まれるプロンプトを返す", () => {
      const recommended = getRecommendedPrompts(fullPrompts);
      
      expect(recommended.length).toBeGreaterThan(0);
      expect(recommended.length).toBeLessThanOrEqual(recommendedPromptIds.length);
      
      // すべてのプロンプトがrecommendedPromptIdsに含まれているか確認
      recommended.forEach((prompt) => {
        expect(recommendedPromptIds).toContain(prompt.id);
      });
    });

    it("空の配列を渡した場合は空配列を返す", () => {
      const recommended = getRecommendedPrompts([]);
      expect(recommended).toEqual([]);
    });
  });

  describe("getCategoryRecommendedPrompts", () => {
    it("カテゴリ別のおすすめプロンプトを返す", () => {
      const diagnosisPrompts = getCategoryRecommendedPrompts(fullPrompts, "diagnosis");
      
      expect(diagnosisPrompts.length).toBeGreaterThan(0);
      diagnosisPrompts.forEach((prompt) => {
        expect(prompt.category).toBe("diagnosis");
      });
    });

    it("存在しないカテゴリの場合は空配列を返す", () => {
      const prompts = getCategoryRecommendedPrompts(fullPrompts, "nonexistent");
      expect(prompts).toEqual([]);
    });
  });
});
