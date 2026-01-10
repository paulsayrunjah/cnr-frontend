"use client";

import { useForm } from "react-hook-form";
import { ProcessedLeadInput } from "@/types/processedLead";

interface ProcessedLeadFormProps {
  onSubmit: (leadData: ProcessedLeadInput) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export default function ProcessedLeadForm({
  onSubmit,
  onCancel,
  isLoading,
}: ProcessedLeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProcessedLeadInput>();

  const onSubmitForm = async (data: ProcessedLeadInput) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="business_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="business_name"
            {...register("business_name", {
              required: "Business name is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter business name"
          />
          {errors.business_name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.business_name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first_name"
            {...register("first_name", {
              required: "First name is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter first name"
          />
          {errors.first_name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.first_name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone", {
              required: "Phone number is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="0752370787"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            {...register("address", {
              required: "Address is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter address"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="test@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Website
          </label>
          <input
            type="url"
            id="website"
            {...register("website", {
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Invalid URL format (must start with http:// or https://)",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="https://google.com"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.website.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
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
            </>
          )}
        </button>
      </div>
    </form>
  );
}
