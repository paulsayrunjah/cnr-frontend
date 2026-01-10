export interface ProcessedLead {
  id: number;
  business_name: string;
  first_name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface ProcessedLeadInput {
  business_name: string;
  first_name: string;
  phone: string;
  address: string;
  email?: string;
  website?: string;
}

export interface PaginatedProcessedLeadsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProcessedLead[];
}
