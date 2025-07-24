'use client';

import { WavesIcon } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { WaterLevelType } from '@/services/types';
import * as React from 'react';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

export const description = 'An area chart with axes';

const chartConfig = {
  waterLevel: {
    label: 'Level',
    color: 'var(--chart-1)',
    icon: WavesIcon,
  },
} satisfies ChartConfig;

function getStatusClasses(status: WaterLevelType['status']) {
  switch (status) {
    case 'normal':
      return 'bg-green-500/20 text-green-500';
    case 'alert':
      return 'bg-amber-500/20 text-amber-500';
    case 'alarm':
      return 'bg-orange-500/20 text-orange-500';
    case 'critical':
      return 'bg-red-500/20 text-red-500';
    default:
      return 'bg-green-500/20 text-green-500';
  }
}

export function WaterLevelChart({
  waterLevelData,
}: {
  waterLevelData: WaterLevelType;
}) {
  const [warningLinesVisible, setWarningLinesVisible] = React.useState(false);

  const chartData = [
    {
      dataAt: '2 hrs ago',
      waterLevel: waterLevelData.waterLevel2hrAgo,
    },
    {
      dataAt: '1 hr ago',
      waterLevel: waterLevelData.waterLevel1hrAgo,
    },
    {
      dataAt: '30 min ago',
      waterLevel: waterLevelData.waterLevel30minAgo,
    },
    {
      dataAt: waterLevelData.asOfTime,
      waterLevel: waterLevelData.currentWaterLevel,
    },
  ];

  const yValues = [
    waterLevelData.currentWaterLevel,
    waterLevelData.waterLevel30minAgo,
    waterLevelData.waterLevel1hrAgo,
    waterLevelData.waterLevel2hrAgo,
  ];

  const padding = 0.02;

  const minY = Math.min(...yValues) - padding;
  const maxY = !warningLinesVisible
    ? Math.max(...yValues) + padding
    : waterLevelData.criticalWaterLevel + 0.5;

  const statusClasses = getStatusClasses(waterLevelData.status);

  return (
    <Card>
      <CardHeader className="relative border-b">
        <CardTitle>{waterLevelData.name}</CardTitle>
        <CardDescription>Real-time water level data</CardDescription>
        <div className="absolute top-0 right-3">
          <span
            className={cn(
              'inline-flex capitalize rounded-full w-fit shrink-0 items-center justify-center gap-1 px-2 py-0.5 text-xs font-medium whitespace-nowrap',
              statusClasses
            )}
          >
            <span
              className={cn(
                'size-2 rounded-full',
                statusClasses.replace('/20', ''),
                waterLevelData.status === 'normal' ? '' : 'animate-ping'
              )}
              aria-hidden="true"
            />
            {waterLevelData.status}
          </span>
        </div>
        <div className="hidden items-center space-x-2 absolute top-0 right-3">
          <Label
            htmlFor="show-warning-lines"
            className="text-muted-foreground text-xs"
          >
            Show Warning Lines
          </Label>
          <Switch
            id="show-warning-lines"
            checked={warningLinesVisible}
            onCheckedChange={setWarningLinesVisible}
          />
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <ChartContainer config={chartConfig} className="aspect-video">
          <AreaChart
            key={warningLinesVisible.toString()}
            accessibilityLayer
            data={chartData}
            margin={{
              left: -10,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dataAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              tickFormatter={(value) => value.toFixed(1) + 'm'}
              domain={[minY, maxY]}
              //   domain={[ticks[0], ticks[ticks.length - 1]]}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  hideLabel
                  formatter={(value, name) => (
                    <div className="flex items-center gap-2">
                      <WavesIcon className="size-3 text-blue-500" />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                        {value}
                        <span className="text-muted-foreground font-normal">
                          m
                        </span>
                      </div>
                    </div>
                  )}
                />
              }
            />
            <Area
              dataKey="waterLevel"
              type="natural"
              fill="var(--color-waterLevel)"
              fillOpacity={0.3}
              stroke="var(--color-waterLevel)"
              unit="masl"
              dot={{ r: 3, stroke: 'green', fill: 'green', fillOpacity: 1 }}
            >
              <LabelList
                position="top"
                offset={12}
                fontSize={10}
                formatter={(value: number) => `${value.toFixed(1)}m`}
              />
            </Area>
            {/* <ReferenceLine
              key={warningLinesVisible.toString()}
              y={waterLevelData.alertWaterLevel}
              label={`Alert Level (${waterLevelData.alertWaterLevel} masl)`}
              stroke="yellow"
              strokeDasharray="3 3"
            />
            <ReferenceLine
              key={warningLinesVisible.toString()}
              y={waterLevelData.alarmWaterLevel}
              label={`Alarm Level (${waterLevelData.alarmWaterLevel} masl)`}
              stroke="orange"
              strokeDasharray="3 3"
            />
            <ReferenceLine
              key={warningLinesVisible.toString()}
              y={waterLevelData.criticalWaterLevel}
              label={`Critical Level (${waterLevelData.criticalWaterLevel} masl)`}
              stroke="red"
              strokeDasharray="3 3"
            /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground text-center">
          Warning Levels
        </p>
        <div className="flex w-full flex-wrap justify-center items-center gap-2">
          <DotBadge className="bg-amber-500">
            {waterLevelData.alertWaterLevel}m
          </DotBadge>
          <DotBadge className="bg-orange-500">
            {waterLevelData.alarmWaterLevel}m
          </DotBadge>
          <DotBadge className="bg-red-500">
            {waterLevelData.criticalWaterLevel}m
          </DotBadge>
        </div>
      </CardFooter>
    </Card>
  );
}

function DotBadge({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
      <span
        className={cn('bg-primary size-2 rounded-full', className)}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
