import { Attribution } from '@/components/attribution';
import { CriticalAlertBanner } from '@/components/critical-alert-banner';
import { DataLegend } from '@/components/data-legend';
import { FAQ } from '@/components/faq';
import { StatusFilter } from '@/components/status-filter';
import { WaterLevelChart } from '@/components/water-level-chart';
import { getWaterLevelData } from '@/services/pagasa';
import { WaterLevelType } from '@/services/types';
import Image from 'next/image';

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

  const criticalItems = waterLevelData.filter((d) => d.status === 'critical');

  return (
    <>
      <CriticalAlertBanner data={criticalItems} />
      <header className="border-b">
        <div className="container mx-auto flex items-center max-w-xl px-4 py-4">
          <div className="flex gap-2 items-center">
            <Image
              unoptimized
              src="/icons/logo.png"
              alt="FloodLine PH"
              width={70}
              height={10}
              className="object-contain"
            />
            <h1 className="font-bold text-xl">FloodLine PH</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <a href="#faq" className="text-sm font-semibold hover:underline">
              FAQ
            </a>
            <a
              href="https://github.com/engrjeff/floodline-ph"
              target="_blank"
              className="text-sm font-semibold hover:underline"
            >
              Source
            </a>
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-xl px-4 py-6 space-y-6">
        <p className="text-muted-foreground">
          Visual representation of PAGASA&apos;s water level data for major dams
          and rivers in the Philippines.
        </p>
        <DataLegend />
        <StatusFilter
          key={(queryParams.status as string) ?? 'key'}
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
      </main>
      <footer className="border-t">
        <div className="container mx-auto max-w-xl px-4 py-8 text-muted-foreground text-sm">
          <FAQ />
          <Attribution />
        </div>
      </footer>
    </>
  );
}
