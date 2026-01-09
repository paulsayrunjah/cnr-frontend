import { Lead } from "@/types/lead";
import LeadCard from "./LeadCard";

interface LeadsListProps {
  leads: Lead[];
  resultsInfo?: {
    query: string;
    total: number;
    new: number;
    updated: number;
    duplicates: number;
  };
}

export default function LeadsList({ leads, resultsInfo }: LeadsListProps) {
  if (leads.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
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
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No leads found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try searching with different keywords
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {resultsInfo && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Search Results for &quot;{resultsInfo.query}&quot;
          </h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Total Results:
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-md font-semibold">
                {resultsInfo.total}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                New:
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-md font-semibold">
                {resultsInfo.new}
              </span>
            </div>
            {resultsInfo.updated > 0 && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Updated:
                </span>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-md font-semibold">
                  {resultsInfo.updated}
                </span>
              </div>
            )}
            {resultsInfo.duplicates > 0 && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Duplicates:
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md font-semibold">
                  {resultsInfo.duplicates}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}
