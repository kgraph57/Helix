/**
 * 遅延ロード対応の画像コンポーネント
 * 画像がビューポートに入った時にのみ読み込む
 */

import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  placeholder?: string;
  fallback?: string;
}

export function LazyImage({ 
  src, 
  alt, 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E',
  fallback,
  className,
  ...props 
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // 画像がビューポートに入ったら読み込む
            const img = new Image();
            img.src = src;
            img.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
            };
            img.onerror = () => {
              if (fallback) {
                setImageSrc(fallback);
              } else {
                setHasError(true);
              }
            };
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // ビューポートの50px前から読み込み開始
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, isLoaded, fallback]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className || ''} ${isLoaded ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}
      loading="lazy"
      {...props}
    />
  );
}
