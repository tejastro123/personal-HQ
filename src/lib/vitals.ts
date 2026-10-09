"use client";

import { useEffect, useState } from "react";

export type Vitals = {
  lcpMs: number | null;
  cls: number | null;
  inpApproxMs: number | null;
  fcpMs: number | null;
  domContentLoadedMs: number | null;
  transferredKb: number | null;
};

const empty: Vitals = {
  lcpMs: null,
  cls: null,
  inpApproxMs: null,
  fcpMs: null,
  domContentLoadedMs: null,
  transferredKb: null,
};

export function usePerformanceVitals(): Vitals {
  const [vitals, setVitals] = useState<Vitals>(empty);

  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

    let lcp = 0;
    let cls = 0;
    let fcp = 0;
    let inp = 0;

    const update = () => {
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      let transferred: number | null = null;
      try {
        const entries = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
        const navEntry = nav as (PerformanceNavigationTiming & { transferSize?: number }) | undefined;
        const sum = entries.reduce((acc, e) => acc + (e.transferSize || 0), 0) + (navEntry?.transferSize || 0);
        transferred = sum > 0 ? Math.round(sum / 1024) : null;
      } catch {
        transferred = null;
      }

      setVitals({
        lcpMs: lcp || null,
        cls: cls || null,
        inpApproxMs: inp || null,
        fcpMs: fcp || null,
        domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
        transferredKb: transferred,
      });
    };

    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          const entry = e as PerformanceEntry & { startTime?: number; value?: number };
          if (entry.entryType === "largest-contentful-paint") {
            lcp = Math.round(entry.startTime || 0);
          }
          if (entry.entryType === "paint" && entry.name === "first-contentful-paint") {
            fcp = Math.round(entry.startTime || 0);
          }
          if (entry.entryType === "layout-shift" && !(e as { hadRecentInput?: boolean }).hadRecentInput) {
            cls += entry.value || 0;
          }
          if (entry.entryType === "event") {
            const ev = entry as PerformanceEntry & { duration?: number; name?: string };
            if (ev.duration) inp = Math.max(inp, Math.round(ev.duration));
          }
        }
        update();
      }).observe({ type: "largest-contentful-paint", buffered: true } as PerformanceObserverInit);
    } catch {
      /* older browsers */
    }

    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          const entry = e as PerformanceEntry & { name?: string; startTime?: number };
          if (entry.name === "first-contentful-paint") fcp = Math.round(entry.startTime || 0);
        }
        update();
      }).observe({ type: "paint", buffered: true } as PerformanceObserverInit);
    } catch {
      /* ignore */
    }

    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          const entry = e as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!entry.hadRecentInput) cls += entry.value || 0;
        }
        update();
      }).observe({ type: "layout-shift", buffered: true } as PerformanceObserverInit);
    } catch {
      /* ignore */
    }

    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          const entry = e as PerformanceEntry & { duration?: number };
          if (entry.duration) inp = Math.max(inp, Math.round(entry.duration));
        }
        update();
      }).observe({ type: "event", buffered: true, durationThreshold: 16 } as PerformanceObserverInit);
    } catch {
      /* ignore */
    }

    update();
    return () => {
      /* observers auto-disconnect on page teardown in practice */
    };
  }, []);

  return vitals;
}
