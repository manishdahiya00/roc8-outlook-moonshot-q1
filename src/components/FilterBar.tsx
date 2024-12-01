import React from "react";
import clsx from "clsx";

type FilterType = "all" | "unread" | "read" | "favorites";

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border-b border-[#CFD2DC]">
      <span className="text-sm font-medium text-gray-600">Filter By:</span>
      {[
        { id: "all", label: "All" },
        { id: "unread", label: "Unread" },
        { id: "read", label: "Read" },
        { id: "favorites", label: "Favorites" },
      ].map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id as FilterType)}
          className={clsx(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeFilter === filter.id
              ? "bg-[#E54065] text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
