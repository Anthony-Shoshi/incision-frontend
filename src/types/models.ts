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
