import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useMembers } from "@/hooks/useMembers";
import { AlertTriangle, Phone, Calendar, ArrowRight, RefreshCw } from "lucide-react";

const ExpiredMembers = () => {
  const { expiredMembers } = useMembers();

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/20">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h1 className="font-display text-4xl tracking-wide text-foreground">
                EXPIRED MEMBERSHIPS
              </h1>
              <p className="mt-1 text-muted-foreground">
                {expiredMembers.length} members need fee renewal
              </p>
            </div>
          </div>
        </div>

        {/* Expired Members List */}
        {expiredMembers.length > 0 ? (
          <div className="space-y-4">
            {expiredMembers.map((member, index) => {
              const daysExpired = Math.ceil(
                (new Date().getTime() - new Date(member.feeExpiryDate).getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <div
                  key={member.id}
                  className="member-card expired rounded-2xl p-6 opacity-0 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.fullName}
                          className="h-16 w-16 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-destructive/20 font-display text-2xl text-destructive">
                          {member.fullName.charAt(0)}
                        </div>
                      )}

                      {/* Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {member.fullName}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {member.contactNumber}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Expired: {new Date(member.feeExpiryDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/20 px-3 py-1 text-sm font-medium text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                          {daysExpired} days overdue
                        </span>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Fee: ₨{member.membershipFee.toLocaleString()}
                        </p>
                      </div>

                      <Link
                        to={`/member/${member.id}`}
                        className="flex items-center gap-2 rounded-xl bg-primary/20 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Renew
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-success/30 bg-success/5 py-16 opacity-0 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/20">
              <RefreshCw className="h-8 w-8 text-success" />
            </div>
            <h3 className="mt-4 font-display text-xl text-foreground">
              ALL MEMBERSHIPS ACTIVE
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No expired memberships at the moment
            </p>
            <Link
              to="/members"
              className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline"
            >
              View All Members
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ExpiredMembers;
