"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProcessedLeadForm from "./ProcessedLeadForm";
import ProcessedLeadCard from "./ProcessedLeadCard";
import Modal from "./Modal";
import { ProcessedLeadInput } from "@/types/processedLead";
import { fetchProcessedLeads, createProcessedLead } from "@/lib/api";

export default function ProcessedLeadsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data: leadsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["processedLeads"],
    queryFn: fetchProcessedLeads,
  });

  const createMutation = useMutation({
    mutationFn: createProcessedLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processedLeads"] });
      setIsModalOpen(false);
      setSuccessMessage("Processed lead added successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  const handleSubmit = async (leadData: ProcessedLeadInput) => {
    await createMutation.mutateAsync(leadData);
  };

  const leads = leadsData?.results || [];

  return (
    <div className="max-w-7xl mx-auto">
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
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
              <p className="text-red-700 dark:text-red-300">
                {error instanceof Error ? error.message : "Failed to fetch processed leads"}
              </p>
            </div>
          </div>
        </div>
      )}

      {createMutation.error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
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
              <p className="text-red-700 dark:text-red-300">
                {createMutation.error instanceof Error
                  ? createMutation.error.message
                  : "Failed to create processed lead"}
              </p>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-200">
                Success
              </h3>
              <p className="text-green-700 dark:text-green-300">
                {successMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Processed Leads ({leads.length})
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => queryClient.invalidateQueries({ queryKey: ["processedLeads"] })}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <svg
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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
              Add Processed Lead
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Loading processed leads...
          </p>
        </div>
      ) : leads.length === 0 ? (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            No Processed Leads Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6">
            Add your first processed lead by clicking the button above.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
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
            Add Your First Lead
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <ProcessedLeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Processed Lead"
      >
        <ProcessedLeadForm
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>
    </div>
  );
}
