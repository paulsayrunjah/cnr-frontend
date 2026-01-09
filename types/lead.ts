export interface Lead {
  id: number;
  google_place_id: string;
  business_name: string;
  address_full: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  address_country: string;
  phone: string;
  website: string;
  email: string;
  google_maps_url: string;
  rating: string;
  user_ratings_total: number;
  business_types: string[];
  status: string;
  first_discovered: string;
  last_updated: string;
  last_verified: string | null;
  notes: string;
  sources_count: number;
}

export interface SearchResponse {
  success: boolean;
  query: string;
  region: string;
  results_count: number;
  new_leads_count: number;
  updated_leads_count: number;
  duplicate_leads_count: number;
  new_leads: Lead[];
}

export interface PaginatedLeadsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Lead[];
}
