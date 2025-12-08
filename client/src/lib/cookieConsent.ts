/**
 * Cookie同意管理
 * GDPR対応のためのCookie同意管理システム
 */

const CONSENT_KEY = "cookie_consent";
const CONSENT_VERSION = "1.0";

export type ConsentPreferences = {
  necessary: boolean; // 必須Cookie（常にtrue）
  analytics: boolean; // アナリティクスCookie（Google Analytics等）
  marketing: boolean; // マーケティングCookie（現在未使用）
};

export type ConsentStatus = {
  consented: boolean;
  preferences: ConsentPreferences;
  version: string;
  timestamp: string;
};

/**
 * Cookie同意状態を取得
 */
export function getConsentStatus(): ConsentStatus | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;

    const consent: ConsentStatus = JSON.parse(stored);
    
    // バージョンが異なる場合は再同意を求める
    if (consent.version !== CONSENT_VERSION) {
      return null;
    }

    return consent;
  } catch (error) {
    console.error("Failed to get consent status:", error);
    return null;
  }
}

/**
 * Cookie同意状態を保存
 */
export function saveConsentStatus(preferences: ConsentPreferences): void {
  if (typeof window === "undefined") return;

  const consent: ConsentStatus = {
    consented: true,
    preferences: {
      necessary: true, // 必須Cookieは常にtrue
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    },
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch (error) {
    console.error("Failed to save consent status:", error);
  }
}

/**
 * 同意が必要かどうかを確認
 */
export function needsConsent(): boolean {
  return getConsentStatus() === null;
}

/**
 * アナリティクスCookieの使用が同意されているか
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getConsentStatus();
  return consent?.preferences.analytics ?? false;
}

/**
 * 同意を撤回（削除）
 */
export function revokeConsent(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch (error) {
    console.error("Failed to revoke consent:", error);
  }
}
