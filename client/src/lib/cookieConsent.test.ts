/**
 * Cookie同意管理のテスト
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getConsentStatus,
  saveConsentStatus,
  needsConsent,
  hasAnalyticsConsent,
  revokeConsent,
  type ConsentPreferences,
} from "./cookieConsent";

// localStorageのモック
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

describe("cookieConsent", () => {
  beforeEach(() => {
    // 各テスト前にlocalStorageをクリア
    localStorageMock.clear();
    // localStorageをモック
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
  });

  describe("needsConsent", () => {
    it("同意がない場合はtrueを返す", () => {
      expect(needsConsent()).toBe(true);
    });

    it("同意がある場合はfalseを返す", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: true,
        marketing: false,
      };
      saveConsentStatus(preferences);
      expect(needsConsent()).toBe(false);
    });
  });

  describe("saveConsentStatus", () => {
    it("同意状態を保存できる", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: true,
        marketing: false,
      };
      saveConsentStatus(preferences);

      const consent = getConsentStatus();
      expect(consent).not.toBeNull();
      expect(consent?.preferences.analytics).toBe(true);
      expect(consent?.consented).toBe(true);
    });

    it("必須Cookieは常にtrueになる", () => {
      const preferences: ConsentPreferences = {
        necessary: false, // falseを設定しても
        analytics: true,
        marketing: false,
      };
      saveConsentStatus(preferences);

      const consent = getConsentStatus();
      expect(consent?.preferences.necessary).toBe(true); // trueになる
    });
  });

  describe("hasAnalyticsConsent", () => {
    it("アナリティクスに同意していない場合はfalseを返す", () => {
      expect(hasAnalyticsConsent()).toBe(false);
    });

    it("アナリティクスに同意している場合はtrueを返す", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: true,
        marketing: false,
      };
      saveConsentStatus(preferences);
      expect(hasAnalyticsConsent()).toBe(true);
    });
  });

  describe("revokeConsent", () => {
    it("同意を撤回できる", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: true,
        marketing: false,
      };
      saveConsentStatus(preferences);
      expect(needsConsent()).toBe(false);

      revokeConsent();
      expect(needsConsent()).toBe(true);
    });
  });
});
