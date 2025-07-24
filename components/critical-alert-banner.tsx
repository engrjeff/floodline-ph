'use client';

import { WaterLevelType } from '@/services/types';
import Link from 'next/link';
import * as React from 'react';

const TRANSITION_PERIOD = 4000;

export function CriticalAlertBanner({ data }: { data: WaterLevelType[] }) {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const timeout = setInterval(() => {
      setCurrent((value) => (value + 1) % data.length);
    }, TRANSITION_PERIOD);

    return () => {
      clearInterval(timeout);
    };
  }, [data]);

  if (data.length === 0) return null;

  const currentItem = data[current];

  if (!currentItem) return null;

  return (
    <Link href={{ pathname: '/', query: { status: 'critical' } }}>
      <div className="p-2 text-center text-sm bg-red-500/20 text-red-500 font-semibold">
        <p>
          Critical:{' '}
          <span>
            {currentItem.name} @ {currentItem.currentWaterLevel} masl
          </span>
        </p>
      </div>
    </Link>
  );
}
