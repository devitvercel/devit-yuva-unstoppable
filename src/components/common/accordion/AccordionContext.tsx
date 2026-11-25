'use client';

import {createContext, useContext} from "react";

interface AccordionContextValue {
  selected: number;
  setSelected: (index: number) => void;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordion(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('`useAccordion` must be used inside an `<Accordion>`');
  return ctx;
}
