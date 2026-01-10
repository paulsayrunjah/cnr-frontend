import { SearchResponse, PaginatedLeadsResponse } from "@/types/lead";
import { ProcessedLeadInput, ProcessedLead, PaginatedProcessedLeadsResponse } from "@/types/processedLead";
import { EmailsResponse, SendEmailRequest } from "@/types/email";
import { getAccessToken } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http:///91.99.220.6:8000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function searchLeads(query: string): Promise<SearchResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/searches/simple_search/`, {
      method: "POST",
      headers: getAuthHeaders(),
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
      headers: getAuthHeaders(),
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
      headers: getAuthHeaders(),
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
      headers: getAuthHeaders(),
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

export interface FetchEmailsParams {
  page?: number;
}

export async function fetchEmails(params: FetchEmailsParams = {}): Promise<EmailsResponse> {
  try {
    const queryParams = new URLSearchParams();

    if (params.page) {
      queryParams.append("page", params.page.toString());
    }

    const url = `${API_BASE_URL}/api/v1/emails/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API request failed: ${response.statusText}`
      );
    }

    const data: EmailsResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch emails"
    );
  }
}

export async function sendEmail(emailData: SendEmailRequest): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/emails/send-html-template/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API request failed: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      error instanceof Error ? error.message : "Failed to send email"
    );
  }
}

