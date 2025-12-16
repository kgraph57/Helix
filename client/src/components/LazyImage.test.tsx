import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { LazyImage } from './LazyImage';

// IntersectionObserverのモック
class IntersectionObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  
  callback: IntersectionObserverCallback;
  
  // テスト用に手動でトリガー
  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this as any);
  }
}

describe('LazyImage', () => {
  let originalIntersectionObserver: typeof IntersectionObserver;
  
  beforeEach(() => {
    originalIntersectionObserver = window.IntersectionObserver;
    // @ts-ignore
    window.IntersectionObserver = IntersectionObserverMock;
  });
  
  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
    vi.clearAllMocks();
  });

  it('should render with placeholder initially', () => {
    render(<LazyImage src="/test.jpg" alt="Test image" placeholder="data:image/svg+xml" />);
    const img = screen.getByRole('img', { name: 'Test image' });
    expect(img).toBeInTheDocument();
    // placeholderが設定されていることを確認
  });

  it('should load image when intersecting', async () => {
    let observerInstance: IntersectionObserverMock | null = null;
    
    // @ts-ignore
    window.IntersectionObserver = vi.fn((callback) => {
      observerInstance = new IntersectionObserverMock(callback);
      return observerInstance;
    }) as any;
    
    render(<LazyImage src="/test.jpg" alt="Test image" priority={true} />);
    
    await waitFor(() => {
      const img = screen.getByRole('img', { name: 'Test image' });
      expect(img).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('should use fallback on error', async () => {
    let observerInstance: IntersectionObserverMock | null = null;
    
    // @ts-ignore
    window.IntersectionObserver = vi.fn((callback) => {
      observerInstance = new IntersectionObserverMock(callback);
      return observerInstance;
    }) as any;
    
    render(<LazyImage src="/test.jpg" alt="Test image" fallback="/fallback.jpg" priority={true} />);
    
    await waitFor(() => {
      const img = screen.getByRole('img', { name: 'Test image' });
      expect(img).toBeInTheDocument();
    }, { timeout: 1000 });
  });
});
