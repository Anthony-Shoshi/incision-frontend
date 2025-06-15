export type Speciality = {
  id: number;
  name: string;
};

export type Procedure = {
  id: number;
  procedure_name: string;
  optimized_cost: number;
  original_cost: number;
};

export type Surgeon = {
  id: number;
  name: string;
  speciality_id: number;
  created_at: string;
}

export type Material = {
  material_name: string;
  original_cost: number;
  optimized_cost: number;
};

export type SurgeonBasic = {
  id: number;
  name: string;
};

export type ProcedureSummary = {
  name: string;
  original_cost: number;
  optimized_cost: number;
};

export type MaterialItem = {
  name: string;
  original_price: number;
  optimized_price: number;
  surgeon_specific_action: string;
};

export type MaterialBreakdown = {
  [materialType: string]: {
    [subtype: string]: MaterialItem[];
  };
};

export type ProcedureDetail = {
  procedure: ProcedureSummary;
  surgeons: SurgeonBasic[];
  materials: MaterialBreakdown;
};
