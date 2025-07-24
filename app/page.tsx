import { StatusFilter } from '@/components/status-filter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WaterLevelChart } from '@/components/water-level-chart';
import { getWaterLevelData } from '@/services/pagasa';
import { WaterLevelType } from '@/services/types';
import { GlassWaterIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryParams = await searchParams;

  const waterLevelData = await getWaterLevelData();

  const waterLevelDataToDisplay = queryParams.status
    ? waterLevelData.filter(
        (data) =>
          data.status === (queryParams.status as WaterLevelType['status'])
      )
    : waterLevelData;

  return (
    <>
      <header className="border-b">
        <div className="container mx-auto max-w-xl px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="font-bold text-2xl flex items-center gap-2">
              <GlassWaterIcon
                className="size-6 text-blue-500"
                strokeWidth={2.5}
              />{' '}
              FloodLine PH
            </h1>
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-xl px-4 py-6 space-y-6">
        <div className="text-center">
          <h1 className="font-bold text-2xl">FloodLine PH</h1>
          <p className="text-sm text-muted-foreground">
            Visual representation of PAGASA's water level data for major dams
            and rivers in the Philippines.
          </p>
        </div>

        <StatusFilter
          currentStatusFilter={queryParams.status as WaterLevelType['status']}
          waterLevelData={waterLevelData}
        />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
          {waterLevelDataToDisplay.map((data) => (
            <li key={data.id}>
              <WaterLevelChart waterLevelData={data} />
            </li>
          ))}
        </ul>

        {/* legend */}
        <Card className="fixed py-2 top-20 gap-2 right-2 w-40 hidden md:flex">
          <CardHeader className="border-b px-3 [.border-b]:pb-2">
            <CardTitle className="text-sm">Legend</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="inline-block size-3 rounded-full bg-green-500" />
                Normal
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-3 rounded-full bg-amber-500" />
                Alert
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-3 rounded-full bg-red-500" />
                Alarm
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block size-3 rounded-full bg-purple-500" />
                Critical
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <footer className="border-t">
        <div className="container mx-auto max-w-xl px-4 py-8 text-center text-muted-foreground text-sm">
          <p>
            Made by{' '}
            <a
              href="https://jeffsegovia.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-500"
            >
              Jeff Segovia
            </a>
          </p>
          <p>
            Data Source:{' '}
            <a
              href="https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:no-underline font-semibold"
            >
              PAGASA
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
