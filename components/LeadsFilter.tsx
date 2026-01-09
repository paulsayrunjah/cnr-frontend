"use client";

interface LeadsFilterProps {
  status: string;
  ordering: string;
  search: string;
  onStatusChange: (status: string) => void;
  onOrderingChange: (ordering: string) => void;
  onSearchChange: (search: string) => void;
}

export default function LeadsFilter({
  status,
  ordering,
  search,
  onStatusChange,
  onOrderingChange,
  onSearchChange,
}: LeadsFilterProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, city..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label
            htmlFor="ordering"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Sort By
          </label>
          <select
            id="ordering"
            value={ordering}
            onChange={(e) => onOrderingChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
          >
            <option value="-first_discovered">Newest First</option>
            <option value="first_discovered">Oldest First</option>
            <option value="business_name">Name (A-Z)</option>
            <option value="-business_name">Name (Z-A)</option>
            <option value="-rating">Highest Rating</option>
            <option value="rating">Lowest Rating</option>
            <option value="-user_ratings_total">Most Reviews</option>
            <option value="user_ratings_total">Least Reviews</option>
          </select>
        </div>
      </div>
    </div>
  );
}
