"use client";

import { useEffect, useState } from "react";

const units = ["days", "hours", "minutes", "seconds"] as const;

export default function Countdown({ datetimeISO }: Readonly<{ datetimeISO: string }>) {
  // Both prerendering and the first client render use dashes, never the current time.
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(datetimeISO).getTime();
    const tick = () => setRemaining(Math.max(0, Math.ceil((target - Date.now()) / 1000)));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [datetimeISO]);

  const figures = remaining === null ? null : [
    Math.floor(remaining / 86400),
    Math.floor((remaining % 86400) / 3600),
    Math.floor((remaining % 3600) / 60),
    remaining % 60,
  ];

  return (
    <div className="countdown">
      {remaining === 0 ? (
        <p className="countdown-open" role="status">The window is open. Go.</p>
      ) : (
        <div className="countdown-grid" role="timer" aria-label="Time until launch" aria-live="off">
          {units.map((unit, index) => (
            <div className="countdown-unit" key={unit}>
              <span className="countdown-figure">{figures ? String(figures[index]).padStart(2, "0") : "--"}</span>
              <span className="countdown-label">{unit}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
