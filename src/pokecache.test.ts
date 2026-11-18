import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  test("adds a value and retrieves it by key", () => {
    const cache = new Cache(1000);
    try {
      cache.add<string>("key1", "value1");
      expect(cache.get<string>("key1")).toBe("value1");
    } finally {
      cache.stopReapLoop();
    }
  });

  test("returns undefined for a key that was never added", () => {
    const cache = new Cache(1000);
    try {
      expect(cache.get<string>("missing")).toBeUndefined();
    } finally {
      cache.stopReapLoop();
    }
  });

  test("replaces the value when the same key is added again", () => {
    const cache = new Cache(1000);
    try {
      cache.add<string>("key1", "first");
      cache.add<string>("key1", "second");
      expect(cache.get<string>("key1")).toBe("second");
    } finally {
      cache.stopReapLoop();
    }
  });

  test("keeps different keys independent of each other", () => {
    const cache = new Cache(1000);
    try {
      cache.add<string>("key1", "value1");
      cache.add<string>("key2", "value2");
      expect(cache.get<string>("key1")).toBe("value1");
      expect(cache.get<string>("key2")).toBe("value2");
    } finally {
      cache.stopReapLoop();
    }
  });

  test("stores values of different types in the same cache", () => {
    const cache = new Cache(1000);
    try {
      cache.add<number>("count", 42);
      cache.add<string[]>("names", ["pikachu", "eevee"]);
      expect(cache.get<number>("count")).toBe(42);
      expect(cache.get<string[]>("names")).toEqual(["pikachu", "eevee"]);
    } finally {
      cache.stopReapLoop();
    }
  });

  test("keeps a fresh entry available before it is reaped", async () => {
    const cache = new Cache(100);
    try {
      cache.add<string>("fresh", "value");
      await new Promise((resolve) => setTimeout(resolve, 20));
      expect(cache.get<string>("fresh")).toBe("value");
    } finally {
      cache.stopReapLoop();
    }
  });

  test("reaps an entry once it is older than the interval", async () => {
    const cache = new Cache(50);
    try {
      cache.add<string>("stale", "value");
      await expect
        .poll(() => cache.get<string>("stale"), { timeout: 1000 })
        .toBeUndefined();
    } finally {
      cache.stopReapLoop();
    }
  });
});