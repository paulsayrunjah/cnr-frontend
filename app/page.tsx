"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import LeadsList from "@/components/LeadsList";
import { searchLeads } from "@/lib/api";
import { Lead } from "@/types/lead";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultsInfo, setResultsInfo] = useState<{
    query: string;
    total: number;
    new: number;
    updated: number;
    duplicates: number;
  } | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await searchLeads(query);

      if (response.success) {
        setLeads(response.new_leads);
        setResultsInfo({
          query: response.query,
          total: response.results_count,
          new: response.new_leads_count,
          updated: response.updated_leads_count,
          duplicates: response.duplicate_leads_count,
        });
      } else {
        setError("Search was not successful. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while searching"
      );
      setLeads([]);
      setResultsInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Leads Tracker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover and manage your business leads
          </p>
        </header>

        <div className="mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-200">
                  Error
                </h3>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Searching for leads...
            </p>
          </div>
        ) : (
          <LeadsList leads={leads} resultsInfo={resultsInfo || undefined} />
        )}

        {!isLoading && leads.length === 0 && !resultsInfo && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <svg
                className="w-10 h-10 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Start Your Search
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Enter a search query above to find business leads. Try searching
              for something like &quot;kitchen cabinets in Atlanta&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
