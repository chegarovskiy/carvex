import { setTimeout as wait } from "node:timers/promises";

export const waitUntilResetTimeEnd = async (
  resetTime: number,
  signal?: AbortSignal
): Promise<boolean> => {
  const now = Date.now();
  console.log(`wait to ${new Date(resetTime).toLocaleString()}`);

  if (Number.isFinite(resetTime) && resetTime > now) {
    return wait(resetTime - now, false, { signal });
  } else {
    return Promise.resolve(false);
  }
};

export const waitTime = async (
  waitTime: number,
  signal?: AbortSignal
): Promise<boolean> => {
  const now = Date.now();
  console.log(`waitTime`);

  if (Number.isFinite(waitTime)) {
    return wait(waitTime, false, { signal });
  } else {
    return Promise.resolve(false);
  }
};
