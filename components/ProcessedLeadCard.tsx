import { ProcessedLead } from "@/types/processedLead";

interface ProcessedLeadCardProps {
  lead: ProcessedLead;
}

export default function ProcessedLeadCard({ lead }: ProcessedLeadCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {lead.business_name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm font-medium rounded-full">
              Processed
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {lead.first_name && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm">{lead.first_name}</span>
          </div>
        )}

        {lead.address && (
          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
            <svg
              className="w-5 h-5 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">{lead.address}</span>
          </div>
        )}

        {lead.phone && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a
              href={`tel:${lead.phone}`}
              className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {lead.phone}
            </a>
          </div>
        )}

        {lead.email && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <svg
              className="w-5 h-5 flex-shrink-0"
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
            <a
              href={`mailto:${lead.email}`}
              className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
            >
              {lead.email}
            </a>
          </div>
        )}

        {lead.website && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            <a
              href={lead.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
            >
              {lead.website}
            </a>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Created: {formatDate(lead.created_at)}
        </div>
      </div>
    </div>
  );
}
