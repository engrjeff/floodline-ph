import { CriticalAlertBanner } from '@/components/critical-alert-banner';
import { DataLegend } from '@/components/data-legend';
import { StatusFilter } from '@/components/status-filter';
import { WaterLevelChart } from '@/components/water-level-chart';
import { site } from '@/config/site';
import { getWaterLevelData } from '@/services/pagasa';
import { WaterLevelType } from '@/services/types';

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
      <main className="container mx-auto max-w-xl px-4 py-6 space-y-6">
        <p className="text-muted-foreground">{site.description}</p>
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
    </>
  );
}
