import { useEffect, useState } from "react";

export function useCountdown(
  startValue: number = 30,
  isActive: boolean = true
): number {
  const [countdown, setCountdown] = useState(startValue);

  useEffect(() => {
    if (!isActive || countdown <= 0) return;

    const timeout = setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isActive, countdown]);

  return countdown;
}
