import { describe, expect, test } from "vitest";
import { getAPIKey } from "./auth";

describe("getAPIKey", () => {
  test("should extract API key from valid authorization header", () => {
    const headers = { authorization: "ApiKey abc123xyz" };
    const result = getAPIKey(headers);
    expect(result).toBe("abc123xyz");
  });

  test("should return null when authorization header is missing", () => {
    const headers = {};
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  test("should return null when authorization scheme is not ApiKey", () => {
    const headers = { authorization: "Bearer sometoken" };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  test("should return null when authorization header has scheme only without key", () => {
    const headers = { authorization: "ApiKey" };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  test("should return null when authorization header has key only without scheme", () => {
    const headers = { authorization: "justAKey" };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });
});
