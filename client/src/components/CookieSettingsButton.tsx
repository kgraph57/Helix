/**
 * Cookie設定ボタンコンポーネント
 * 既に同意済みのユーザーが設定を変更できるようにする
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { needsConsent, revokeConsent } from "@/lib/cookieConsent";
import { CookieConsentBanner } from "./CookieConsentBanner";

export function CookieSettingsButton() {
  const [showBanner, setShowBanner] = useState(false);

  // 同意が必要な場合はバナーを表示
  useEffect(() => {
    if (needsConsent()) {
      setShowBanner(true);
    }
  }, []);

  const handleOpenSettings = () => {
    // 同意を撤回してバナーを再表示
    revokeConsent();
    setShowBanner(true);
  };

  if (showBanner) {
    return <CookieConsentBanner />;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleOpenSettings}
      className="flex items-center gap-2"
    >
      <Cookie className="w-4 h-4" />
      Cookie設定
    </Button>
  );
}
