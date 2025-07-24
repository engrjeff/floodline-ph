import { InfoIcon } from 'lucide-react';

export function DataLegend() {
  return (
    <div className="z-50 md:fixed  md:top-1/4 md:-translate-y-1/4 gap-2 md:right-2 md:w-44 flex-col bg-card rounded-md border">
      <div className="border-b px-2 py-2">
        <h2 className="text-sm font-semibold">Legend</h2>
      </div>
      <div className="px-3 py-2">
        <ul className="flex flex-col gap-2 text-xs">
          <li className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-green-500" />
            Normal
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-amber-500" />
            Alert
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-orange-500" />
            Alarm
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-red-500" />
            Critical
          </li>
          <li className="flex items-start gap-2">
            <InfoIcon className="size-4 text-blue-500" />
            masl - meters above sea level
          </li>
        </ul>
      </div>
    </div>
  );
}
