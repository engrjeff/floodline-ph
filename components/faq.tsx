'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const FAQ_ITEMS = [
  {
    title: 'Is it real-time?',
    contents: [
      'It displays what PAGASA is displaying on their website, particularly the page for Flood Information.',
    ],
  },
  {
    title: 'Is it open-source?',
    contents: [
      'Yes. You can find the source code link in the header section of this page.',
    ],
  },
  {
    title: 'Is it in active development?',
    contents: ['Yes', 'Potential additional features may be added soon.'],
  },
];

export function FAQ() {
  return (
    <div id="faq">
      <Link href={{ pathname: '/', hash: 'faq' }}>
        <h2 className="text-foreground text-xl font-semibold">
          Frequently Asked Questions (FAQs)
        </h2>
      </Link>
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map((faq) => (
          <AccordionItem
            key={`faq-${faq.title.toLowerCase().split(' ').join('-')}`}
            value={faq.title}
          >
            <AccordionTrigger>{faq.title}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {faq.contents.map((c, cIndex) => (
                <p
                  key={`content-${faq.title
                    .toLowerCase()
                    .split(' ')
                    .join('-')}-${cIndex.toString()}`}
                >
                  {c}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
