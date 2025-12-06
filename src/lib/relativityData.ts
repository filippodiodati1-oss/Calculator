// src/lib/relativityData.ts

// Data derived by reverse-engineering the provided Google Sheets data
// to match the implicit relativity rates used in that specific valuation model.
// Years remaining: Relativity percentage (as a decimal)

export const relativityData: Record<number, number> = {
    80: 1.000, // No marriage value above 80 years
    79: 0.941,
    70: 0.898,
    60: 0.840,
    50: 0.776,
    40: 0.700,
    30: 0.612,
    25: 0.550,
    20: 0.470,
    15: 0.380,
    10: 0.280,
    5: 0.170,
    1: 0.090, 
  };
  
  /**
   * Function to get an interpolated relativity rate based on remaining years.
   * Uses linear interpolation between known data points from the provided spreadsheet data.
   */
  export function getRelativityRate(remainingYears: number): number {
    if (remainingYears >= 80) return 1.0;
    if (remainingYears <= 1) return relativityData[1];
  
    const years = Object.keys(relativityData)
      .map(Number)
      .sort((a, b) => a - b);
  
    let lowerYear = years[0];
    let higherYear = years[years.length - 1];
  
    for (let i = 0; i < years.length - 1; i++) {
      if (years[i] <= remainingYears && years[i + 1] >= remainingYears) {
        lowerYear = years[i];
        higherYear = years[i + 1];
        break;
      }
    }
  
    const lowerRate = relativityData[lowerYear];
    const higherRate = relativityData[higherYear];
  
    // Linear interpolation: y = y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)
    const interpolatedRate =
      lowerRate +
      ((remainingYears - lowerYear) * (higherRate - lowerRate)) /
        (higherYear - lowerYear);
  
    return Math.max(0.09, Math.min(1.0, interpolatedRate));
  }
  