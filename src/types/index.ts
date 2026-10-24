export interface MaterialSpec {
  id: string;
  name: string;
  category: string;
  machinability: number; // Factor M de Zeng & Kim
  density: number; // g/cm3
  hardnessNote: string;
  thermalNote: string;
  maxRecommendedThick: number;
}

export interface QualityLevel {
  q: number;
  label: string;
  description: string;
  speedFactor: number;
  raBase: number;
  taperDeg: number;
  tolMm: number;
  typicalUse: string;
}

export interface CuttingHeadPart {
  id: string;
  name: string;
  function: string;
  material: string;
  lifespan: string;
  highlightCoordinates: { x: number; y: number; r: number };
}

export interface ComparisonProcess {
  name: string;
  group: string;
  members: string;
  physicalPrinciple: string;
  materials: string;
  haz: string;
  thicknessRange: string;
  tolerance: string;
  kerf: string;
  speed: string;
  cost: string;
  pros: string[];
  cons: string[];
}

export interface DefectItem {
  id: string;
  name: string;
  alias: string;
  visualDesc: string;
  cause: string;
  mechatronicFix: string;
  diagramType: 'taper' | 'jetlag' | 'rollover' | 'piercing' | 'draglines' | 'incomplete';
}

export interface MachineryComponent {
  component: string;
  function: string;
  techDetails: string;
  specs2026?: string;
}

export interface WorkingParameter {
  variable: string;
  effect: string;
  recommendedRange: string;
  controlMethod: string;
}

