import { Users, UserCheck, UserX, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/StatCard";
import { MemberCard } from "@/components/MemberCard";
import { useMembers } from "@/hooks/useMembers";

const Dashboard = () => {
  const { stats, expiredMembers, members } = useMembers();
  const recentMembers = members.slice(0, 5);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <h1 className="font-display text-4xl tracking-wide text-foreground">
            DASHBOARD
          </h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Here's your gym overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Members"
            value={stats.total}
            icon={Users}
            trend="All registered members"
            variant="default"
            delay={100}
          />
          <StatCard
            title="Active Members"
            value={stats.active}
            icon={UserCheck}
            trend="Fee up to date"
            variant="success"
            delay={200}
          />
          <StatCard
            title="Expired Members"
            value={stats.expired}
            icon={UserX}
            trend="Need renewal"
            variant="danger"
            delay={300}
          />
          <StatCard
            title="Total Revenue"
            value={`₨${stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend="From membership fees"
            variant="warning"
            delay={400}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Expired Members Alert */}
          {expiredMembers.length > 0 && (
            <div className="glass-card rounded-2xl border border-destructive/30 p-6 opacity-0 animate-slide-up" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/20">
                    <UserX className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl tracking-wide text-foreground">
                      EXPIRED MEMBERSHIPS
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {expiredMembers.length} members need fee renewal
                    </p>
                  </div>
                </div>
                <Link
                  to="/expired"
                  className="flex items-center gap-2 rounded-xl bg-destructive/20 px-4 py-2 text-sm font-medium text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground"
                >
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Mini list of expired */}
              <div className="mt-4 space-y-2">
                {expiredMembers.slice(0, 3).map((member) => (
                  <Link
                    key={member.id}
                    to={`/member/${member.id}`}
                    className="flex items-center gap-3 rounded-lg bg-destructive/10 p-3 transition-all hover:bg-destructive/20"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/20 text-sm font-semibold text-destructive">
                      {member.fullName.charAt(0)}
                    </div>
                    <span className="text-sm text-foreground">{member.fullName}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      Expired: {new Date(member.feeExpiryDate).toLocaleDateString()}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="glass-card rounded-2xl p-6 opacity-0 animate-slide-up" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl tracking-wide text-foreground">
                  QUICK ACTIONS
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage your gym efficiently
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                to="/add-member"
                className="btn-gym flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-primary-foreground"
              >
                Add New Member
              </Link>
              <Link
                to="/members"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
              >
                View All Members
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Members */}
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl tracking-wide text-foreground">
              RECENT MEMBERS
            </h2>
            <Link
              to="/members"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentMembers.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
