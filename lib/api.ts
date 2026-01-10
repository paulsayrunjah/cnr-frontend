import { SearchResponse, PaginatedLeadsResponse } from "@/types/lead";
import { ProcessedLeadInput, ProcessedLead, PaginatedProcessedLeadsResponse } from "@/types/processedLead";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function searchLeads(query: string): Promise<SearchResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/searches/simple_search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textSearch: query,
      }),
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API request failed: ${response.statusText}`
      );
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to search leads"
    );
  }
}

export interface FetchLeadsParams {
  page?: number;
  status?: string;
  search?: string;
  ordering?: string;
}

export async function fetchLeads(params: FetchLeadsParams = {}): Promise<PaginatedLeadsResponse> {
  try {
    const queryParams = new URLSearchParams();

    if (params.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params.status && params.status !== "all") {
      queryParams.append("status", params.status);
    }
    if (params.search) {
      queryParams.append("search", params.search);
    }
    if (params.ordering) {
      queryParams.append("ordering", params.ordering);
    }

    const url = `${API_BASE_URL}/api/v1/leads/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API request failed: ${response.statusText}`
      );
    }

    const data: PaginatedLeadsResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch leads"
    );
  }
}

export async function fetchProcessedLeads(): Promise<PaginatedProcessedLeadsResponse> {
  try {
    const url = `${API_BASE_URL}/api/v1/processed-leads/`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API request failed: ${response.statusText}`
      );
    }

    const data: PaginatedProcessedLeadsResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch processed leads"
    );
  }
}

export async function createProcessedLead(leadData: ProcessedLeadInput): Promise<ProcessedLead> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/processed-leads/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API request failed: ${response.statusText}`
      );
    }

    const data: ProcessedLead = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to create processed lead"
    );
  }
}
