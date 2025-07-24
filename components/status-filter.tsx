'use client';

import { WaterLevelType } from '@/services/types';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export function StatusFilter({
  currentStatusFilter,
  waterLevelData,
}: {
  currentStatusFilter?: string;
  waterLevelData: WaterLevelType[];
}) {
  const normal = waterLevelData.filter(
    (data) => data.status === 'normal'
  ).length;
  const alert = waterLevelData.filter((data) => data.status === 'alert').length;
  const alarm = waterLevelData.filter((data) => data.status === 'alarm').length;
  const critical = waterLevelData.filter(
    (data) => data.status === 'critical'
  ).length;

  const tabData = [
    { name: 'Normal', value: 'normal', count: normal },
    { name: 'Alert', value: 'alert', count: alert },
    { name: 'Alarm', value: 'alarm', count: alarm },
    { name: 'Critical', value: 'critical', count: critical },
  ];

  return (
    <Tabs defaultValue={currentStatusFilter ?? 'all'} className="gap-4 w-full">
      <TabsList className="w-full">
        <TabsTrigger
          value="all"
          className="flex items-center gap-1 px-2.5 sm:px-3"
          asChild
        >
          <Link href="/">All</Link>
        </TabsTrigger>
        {tabData.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center gap-1 px-2.5 sm:px-3"
            asChild
          >
            <Link
              href={{
                pathname: '/',
                query: { status: tab.value },
              }}
            >
              {tab.name}
              <Badge className="h-5 min-w-5 rounded-full px-1 tabular-nums">
                {tab.count}
              </Badge>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
