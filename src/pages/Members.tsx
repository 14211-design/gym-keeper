import { MainLayout } from "@/components/layout/MainLayout";
import { MemberCard } from "@/components/MemberCard";
import { SearchFilter } from "@/components/SearchFilter";
import { useMembers } from "@/hooks/useMembers";
import { Users } from "lucide-react";

const Members = () => {
  const {
    members,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
  } = useMembers();

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <h1 className="font-display text-4xl tracking-wide text-foreground">
            ALL MEMBERS
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage and view all gym members
          </p>
        </div>

        {/* Search & Filter */}
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />
        </div>

        {/* Members Grid */}
        {members.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 opacity-0 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-display text-xl text-foreground">
              NO MEMBERS FOUND
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search or filter"
                : "Add your first member to get started"}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Members;
