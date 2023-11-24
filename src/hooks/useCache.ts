import { useState } from "react";

export const useKeyCache = <T>(
  key: PropertyKey,
  value: T,
) => {
  const [cached, setCached] = useState<Record<PropertyKey, T>>({
    [key]: value,
  });

  if (!isEqual(value, cached[key])) {
    setCached((prev) => ({ ...prev, [key]: value }));
  }

  return cached;
};

function isEqual(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}
