// src/lib/leaseTable.ts
export interface LeaseRow {
  years: number;
  groundRent: number;
  extendedValue: number;
  deferment: number;
  total: number;
  grc: number;
  pvc: number;
  mv: number;
}

export const LEASE_TABLE: LeaseRow[] = [
  { years: 10, groundRent: 500, extendedValue: 500000, deferment: 5, total: 359311, grc: 3680, pvc: 303154, mv: 52477 },
  { years: 20, groundRent: 500, extendedValue: 500000, deferment: 5, total: 255222, grc: 5735, pvc: 186110, mv: 63377 },
  { years: 30, groundRent: 500, extendedValue: 500000, deferment: 5, total: 183557, grc: 6882, pvc: 114256, mv: 62419 },
  { years: 40, groundRent: 500, extendedValue: 500000, deferment: 5, total: 133251, grc: 7523, pvc: 70143, mv: 55584 },
  { years: 50, groundRent: 500, extendedValue: 500000, deferment: 5, total: 97146,  grc: 7881, pvc: 43062, mv: 46203 },
  { years: 60, groundRent: 500, extendedValue: 500000, deferment: 5, total: 70577,  grc: 8081, pvc: 26436, mv: 36060 },
  { years: 70, groundRent: 500, extendedValue: 500000, deferment: 5, total: 50475,  grc: 8192, pvc: 16230, mv: 26053 },
  { years: 80, groundRent: 500, extendedValue: 500000, deferment: 5, total: 34804,  grc: 8255, pvc: 9964,  mv: 16586 },
  { years: 90, groundRent: 500, extendedValue: 500000, deferment: 5, total: 14406,  grc: 8289, pvc: 6117,  mv: 0 },
  { years: 100, groundRent: 500, extendedValue: 500000, deferment: 5, total: 12064, grc: 8309, pvc: 3755,  mv: 0 },
  { years: 200, groundRent: 500, extendedValue: 500000, deferment: 5, total: 8362,  grc: 8333, pvc: 29,    mv: 0 },
  { years: 500, groundRent: 500, extendedValue: 500000, deferment: 5, total: 8333,  grc: 8333, pvc: 0,     mv: 0 },
  { years: 70, groundRent: 500, extendedValue: 500000, deferment: 8, total: 43502,  grc: 8192, pvc: 2285,  mv: 33025 },
];
