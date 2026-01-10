"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import LeadsList from "@/components/LeadsList";
import LeadsBrowser from "@/components/LeadsBrowser";
import ProcessedLeadsList from "@/components/ProcessedLeadsList";
import EmailsList from "@/components/EmailsList";
import SendEmailModal from "@/components/SendEmailModal";
import { searchLeads } from "@/lib/api";
import { Lead } from "@/types/lead";

type TabType = "search" | "browse" | "processed" | "emails";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("browse");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSendEmailModalOpen, setIsSendEmailModalOpen] = useState(false);
  const [emailsKey, setEmailsKey] = useState(0);
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

  const handleEmailSent = () => {
    setEmailsKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Leads Tracker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover and manage your business leads
          </p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-xl shadow-md p-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "browse"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Browse All Leads
              </div>
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "search"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
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
                Search New Leads
              </div>
            </button>
            <button
              onClick={() => setActiveTab("processed")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "processed"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Processed Leads
              </div>
            </button>
            <button
              onClick={() => setActiveTab("emails")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "emails"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Emails
              </div>
            </button>
          </div>
        </div>

        {/* Browse Tab Content */}
        {activeTab === "browse" && <LeadsBrowser />}

        {/* Search Tab Content */}
        {activeTab === "search" && (
          <>
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
                  Enter a search query above to find new business leads. Try
                  searching for something like &quot;kitchen cabinets in
                  Atlanta&quot;
                </p>
              </div>
            )}
          </>
        )}

        {/* Processed Leads Tab Content */}
        {activeTab === "processed" && <ProcessedLeadsList />}

        {/* Emails Tab Content */}
        {activeTab === "emails" && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsSendEmailModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Send New Email
              </button>
            </div>
            <EmailsList key={emailsKey} />
          </div>
        )}

        <SendEmailModal
          isOpen={isSendEmailModalOpen}
          onClose={() => setIsSendEmailModalOpen(false)}
          onSuccess={handleEmailSent}
        />
      </div>
    </div>
  );
}
