export function stripNulls<T extends Record<string, unknown>>(obj: T): T {
  if (!obj || typeof obj !== "object") return obj;

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      const filtered = value.filter((v) => v !== null && v !== undefined);
      if (filtered.length > 0) {
        result[key] = filtered.map((v) =>
          typeof v === "object" && v !== null ? stripNulls(v as Record<string, unknown>) : v,
        );
      }
      continue;
    }

    if (typeof value === "object") {
      const cleaned = stripNulls(value as Record<string, unknown>);
      if (Object.keys(cleaned).length > 0) {
        result[key] = cleaned;
      }
      continue;
    }

    result[key] = value;
  }

  return result as T;
}
