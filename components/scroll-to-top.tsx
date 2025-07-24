'use client';

import { cn } from '@/lib/utils';
import { ChevronUpIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';

function useScrollToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const scrollCallback = () => {
      const scrolledFromTop = window.scrollY;
      setShown(() => scrolledFromTop > 300);
    };

    window.addEventListener('scroll', scrollCallback);

    scrollCallback();

    return () => {
      window.removeEventListener('scroll', scrollCallback);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { shown, scrollToTop };
}

export function ScrollToTopButton() {
  const { shown, scrollToTop } = useScrollToTop();

  if (!shown) return null;

  return (
    <Button
      aria-label="scroll to top"
      onClick={scrollToTop}
      variant="secondary"
      size="icon"
      className={cn(
        'transition-transform duration-200 fixed right-10 bottom-10 rounded-full border',
        shown ? 'scale-100' : 'scale-0'
      )}
    >
      <ChevronUpIcon />
    </Button>
  );
}
