"use client";

import { useEffect, useState } from "react";
import { Email, EmailsResponse } from "@/types/email";
import { fetchEmails } from "@/lib/api";
import EmailCard from "./EmailCard";
import Pagination from "./Pagination";

export default function EmailsList() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const loadEmails = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const data: EmailsResponse = await fetchEmails({ page });
      setEmails(data.results);
      setTotalCount(data.count);
      setHasNext(!!data.next);
      setHasPrevious(!!data.previous);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load emails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmails(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRefresh = () => {
    loadEmails(currentPage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
        <p className="text-red-800 dark:text-red-300">Error: {error}</p>
        <button
          onClick={handleRefresh}
          className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Emails</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {totalCount} total email{totalCount !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
        >
          Refresh
        </button>
      </div>

      {emails.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">No emails found</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {emails.map((email) => (
              <EmailCard key={email.id} email={email} />
            ))}
          </div>

          {totalCount > 10 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={10}
                onPageChange={handlePageChange}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
