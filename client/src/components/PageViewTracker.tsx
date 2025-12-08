/**
 * ページビューを自動的に追跡するコンポーネント
 * ルーティング変更時にGoogle Analytics 4にページビューを送信
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics";

export function PageViewTracker() {
  const [location] = useLocation();

  useEffect(() => {
    // ルート変更時にページビューを追跡
    trackPageView(location, document.title);
  }, [location]);

  return null;
}
