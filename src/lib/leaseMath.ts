// src/lib/leaseMath.ts
import { LEASE_TABLE } from "./leaseTable";

interface PremiumInputs {
  years: number;
  months: number;
  groundRent: number;
  extendedValue: number;
  defermentRatePct: number;
  fees: number;
}

interface PremiumResult {
  total: number;
  grc: number;
  pvc: number;
  marriageValue: number;
  fees: number;
}

// linear interpolation helper
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// find rows around the target years
function findBoundingRows(years: number, deferment: number) {
  const table = LEASE_TABLE.filter(r => r.deferment === deferment);
  const fallback = LEASE_TABLE.filter(r => r.deferment === 5);
  const data = table.length ? table : fallback;

  const sorted = [...data].sort((a, b) => a.years - b.years);

  if (years <= sorted[0].years) return { lower: sorted[0], upper: sorted[0] };
  if (years >= sorted[sorted.length - 1].years)
    return { lower: sorted[sorted.length - 1], upper: sorted[sorted.length - 1] };

  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i], b = sorted[i + 1];
    if (years >= a.years && years <= b.years) return { lower: a, upper: b };
  }
  return { lower: sorted[0], upper: sorted[0] };
}

export function computePremium({
  years,
  months,
  groundRent,
  extendedValue,
  defermentRatePct,
  fees,
}: PremiumInputs): PremiumResult {
  const totalYears = years + months / 12;
  const { lower, upper } = findBoundingRows(totalYears, defermentRatePct);

  const t = lower.years === upper.years ? 0 : (totalYears - lower.years) / (upper.years - lower.years);

  const total = lerp(lower.total, upper.total, t);
  const grc = lerp(lower.grc, upper.grc, t);
  const pvc = lerp(lower.pvc, upper.pvc, t);
  const mv = lerp(lower.mv, upper.mv, t);
  const totalWithFees = total + fees;

  return {
    total: totalWithFees,
    grc,
    pvc,
    marriageValue: mv,
    fees,
  };
}
