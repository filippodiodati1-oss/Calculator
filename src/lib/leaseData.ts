export interface LeaseRow {
    years: number;
    groundRent: number;
    extendedValue: number;
    defermentRate: number;
    total: number;
    grc: number; // Ground Rent Compensation
    pvc: number; // Property Value Component
    marriageValue: number;
  }
  
  // Table from your reference
  export const LEASE_TABLE: LeaseRow[] = [
    { years: 1,  groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 494774, grc: 472, pvc: 470292, marriageValue: 24010 },
    { years: 5,  groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 428572, grc: 2106, pvc: 386910, marriageValue: 39556 },
    { years: 10, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 359311, grc: 3680, pvc: 303154, marriageValue: 52477 },
    { years: 15, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 302315, grc: 4856, pvc: 237529, marriageValue: 59930 },
    { years: 20, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 255222, grc: 5735, pvc: 186110, marriageValue: 63377 },
    { years: 25, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 216141, grc: 6392, pvc: 145822, marriageValue: 63927 },
    { years: 30, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 183557, grc: 6882, pvc: 114256, marriageValue: 62419 },
    { years: 40, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 133251, grc: 7523, pvc: 70143, marriageValue: 55584 },
    { years: 50, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 97146, grc: 7881, pvc: 43062, marriageValue: 46203 },
    { years: 60, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 70577, grc: 8081, pvc: 26436, marriageValue: 36060 },
    { years: 70, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 50475, grc: 8192, pvc: 16230, marriageValue: 26053 },
    { years: 79, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 36215, grc: 8250, pvc: 10462, marriageValue: 17503 },
    { years: 80, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 34804, grc: 8255, pvc: 9964, marriageValue: 16586 },
    { years: 81, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 17748, grc: 8259, pvc: 9489, marriageValue: 0 },
    { years: 90, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 14406, grc: 8289, pvc: 6117, marriageValue: 0 },
    { years: 100, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 12064, grc: 8309, pvc: 3755, marriageValue: 0 },
    { years: 200, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 8362, grc: 8333, pvc: 29, marriageValue: 0 },
    { years: 500, groundRent: 500, extendedValue: 500000, defermentRate: 5, total: 8333, grc: 8333, pvc: 0, marriageValue: 0 },
    { years: 1000, groundRent: 500, extendedValue: 500000, defermentRate: 4, total: 8333, grc: 8333, pvc: 0, marriageValue: 0 },
  ];
  
  // Interpolate between table entries
  export function interpolateLeaseData(years: number, defermentRate: number) {
    const table = LEASE_TABLE.filter((r) => r.defermentRate === defermentRate);
    if (!table.length) return null;
  
    table.sort((a, b) => a.years - b.years);
  
    if (years <= table[0].years) return table[0];
    if (years >= table[table.length - 1].years) return table[table.length - 1];
  
    for (let i = 0; i < table.length - 1; i++) {
      const a = table[i];
      const b = table[i + 1];
      if (years >= a.years && years <= b.years) {
        const t = (years - a.years) / (b.years - a.years);
        return {
          years,
          groundRent: a.groundRent + t * (b.groundRent - a.groundRent),
          extendedValue: a.extendedValue + t * (b.extendedValue - a.extendedValue),
          defermentRate,
          total: a.total + t * (b.total - a.total),
          grc: a.grc + t * (b.grc - a.grc),
          pvc: a.pvc + t * (b.pvc - a.pvc),
          marriageValue: a.marriageValue + t * (b.marriageValue - a.marriageValue),
        };
      }
    }
  
    return table[table.length - 1];
  }
  
  