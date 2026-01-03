import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterStatus: "all" | "active" | "expired";
  onFilterChange: (value: "all" | "active" | "expired") => void;
}

export const SearchFilter = ({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
}: SearchFilterProps) => {
  const filters = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "expired", label: "Expired" },
  ] as const;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, CNIC, or phone..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-gym w-full rounded-xl py-3 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <div className="flex rounded-xl bg-secondary p-1">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                filterStatus === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
