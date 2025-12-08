import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Sentryのモック（インストールされていない場合でもテストが実行できるように）
vi.mock("@/lib/sentry", async () => {
  const actual = await vi.importActual("@/lib/sentry");
  return {
    ...actual,
    initSentry: vi.fn().mockResolvedValue(undefined),
    captureError: vi.fn().mockResolvedValue(undefined),
    captureMessage: vi.fn().mockResolvedValue(undefined),
  };
});

