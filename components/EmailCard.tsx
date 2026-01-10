"use client";

import { Email } from "@/types/email";

interface EmailCardProps {
  email: Email;
}

export default function EmailCard({ email }: EmailCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "delivered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "opened":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {email.subject}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                email.status
              )}`}
            >
              {email.status}
            </span>
            {email.provider && (
              <span className="text-sm text-gray-500 dark:text-gray-400">via {email.provider}</span>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">ID: {email.id}</div>
      </div>

      <div className="space-y-3 mb-4">
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To:</p>
            <div className="flex flex-wrap gap-1">
              {email.to_emails.map((recipient, index) => (
                <span
                  key={index}
                  className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded"
                >
                  {recipient}
                </span>
              ))}
            </div>
          </div>
        </div>

        {email.cc_emails.length > 0 && (
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CC:</p>
              <div className="flex flex-wrap gap-1">
                {email.cc_emails.map((recipient, index) => (
                  <span
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                  >
                    {recipient}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Created: {formatDate(email.created_at)}</span>
        </div>
        {email.sent_at && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Sent: {formatDate(email.sent_at)}</span>
          </div>
        )}
      </div>

      {email.lead_name && (
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Lead: <span className="font-medium text-gray-900 dark:text-white">{email.lead_name}</span></span>
        </div>
      )}

      {email.error_message && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-300">
            <span className="font-medium">Error:</span> {email.error_message}
          </p>
        </div>
      )}

      {email.provider_message_id && (
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
          Provider Message ID: {email.provider_message_id}
        </div>
      )}
    </div>
  );
}
