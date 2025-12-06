// src/lib/computePremium.ts

interface PremiumInputs {
    propertyValue: number;    // This is the full, long-lease/freehold value
    remainingYears: number;       
    annualGroundRent: number;     
    defermentRatePct: number;     
    relativityRate: number;       
}
  
interface PremiumResults {
    grc: number;           // Ground Rent Compensation
    pvc: number;           // Property Value Component (Reversion)
    marriageValue: number; // Landlord's 50% share of MV
    total: number;         // Total Premium Cost
}
  
const calculateYearsPurchase = (years: number, yieldRate: number): number => {
    if (yieldRate === 0) return years;
    return (1 - Math.pow(1 + yieldRate, -years)) / yieldRate;
};

export function computePremium({
    propertyValue, 
    remainingYears,
    annualGroundRent,
    defermentRatePct,
    relativityRate, 
}: PremiumInputs): PremiumResults {
    
    const Y = 0.05 as number; 
    const D = defermentRatePct / 100;   
  
    // --- 1. Ground Rent Compensation (GRC)
    const ypCurrentTerm = calculateYearsPurchase(remainingYears, Y);
    const grc = annualGroundRent * ypCurrentTerm;

    // --- 2. Reversionary Value Compensation (PVC)
    const pvc = propertyValue * Math.pow(1 + D, -remainingYears);
    
    // --- 3. Marriage Value (MV)
    let marriageValue = 0.0;
  
    if (remainingYears < 80) {
      const valueAfterExtension = propertyValue;
      const existingLeaseholderInterest = propertyValue * relativityRate;
      const freeholdersExistingInterest = grc + pvc;
      const combinedValueBefore = existingLeaseholderInterest + freeholdersExistingInterest;
  
      let marriageValueTotalUplift = valueAfterExtension - combinedValueBefore;
      
      if (marriageValueTotalUplift < 0) {
          marriageValueTotalUplift = 0;
      }
      
      marriageValue = 0.5 * marriageValueTotalUplift;
    }
  
    // --- Total Premium Payable by the Leaseholder
    const total = grc + pvc + marriageValue; 
    
    // --- FINAL CONSTRAIN ADDED ---
    // The total premium cannot be greater than the value of the property extended value.
    const cappedTotal = Math.min(total, propertyValue); 

    // Use standard Math.round for final output
    return {
      grc: Math.round(grc),
      pvc: Math.round(pvc), 
      marriageValue: Math.round(marriageValue),
      total: Math.round(cappedTotal), 
    };
}
