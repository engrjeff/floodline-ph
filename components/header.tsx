import { site } from '@/config/site';
import Image from 'next/image';

export function Header() {
  return (
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
          <h1 className="font-bold text-xl">{site.title}</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <a href="#faq" className="text-sm font-semibold hover:underline">
            FAQ
          </a>
          <a
            href={site.githubLink}
            target="_blank"
            className="text-sm font-semibold hover:underline"
          >
            Source
          </a>
        </div>
      </div>
    </header>
  );
}
