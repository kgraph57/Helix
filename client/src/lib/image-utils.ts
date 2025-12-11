/**
 * 画像最適化ユーティリティ
 * WebP対応、遅延ロード、レスポンシブ画像のサポート
 */

/**
 * WebP対応をチェック
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * 最適な画像形式を選択
 * WebPがサポートされている場合はWebP、そうでない場合は元の形式
 */
export async function getOptimalImageSrc(
  originalSrc: string,
  webpSrc?: string
): Promise<string> {
  if (!webpSrc) {
    return originalSrc;
  }

  const supports = await supportsWebP();
  return supports ? webpSrc : originalSrc;
}

/**
 * 画像のプリロード
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * 画像のサイズを取得
 */
export function getImageSize(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * 画像の遅延ロード用のsrcsetを生成
 */
export function generateSrcSet(
  baseSrc: string,
  sizes: number[] = [320, 640, 960, 1280, 1920]
): string {
  return sizes
    .map((size) => `${baseSrc}?w=${size} ${size}w`)
    .join(', ');
}

/**
 * 画像のサイズ属性を生成
 */
export function generateSizes(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const parts: string[] = [];
  
  if (breakpoints.mobile) {
    parts.push(`(max-width: 768px) ${breakpoints.mobile}`);
  }
  if (breakpoints.tablet) {
    parts.push(`(max-width: 1024px) ${breakpoints.tablet}`);
  }
  if (breakpoints.desktop) {
    parts.push(breakpoints.desktop);
  }
  
  return parts.length > 0 ? parts.join(', ') : '100vw';
}
