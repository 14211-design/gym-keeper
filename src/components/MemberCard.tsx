import { Link } from "react-router-dom";
import { Phone, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { Member } from "@/types/member";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  member: Member;
  index?: number;
}

export const MemberCard = ({ member, index = 0 }: MemberCardProps) => {
  const isExpired = new Date(member.feeExpiryDate) < new Date();
  const daysUntilExpiry = Math.ceil(
    (new Date(member.feeExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Link
      to={`/member/${member.id}`}
      className={cn(
        "member-card block rounded-2xl p-5 opacity-0 animate-scale-in",
        isExpired && "expired"
      )}
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.fullName}
              className="h-14 w-14 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 font-display text-xl text-primary">
              {getInitials(member.fullName)}
            </div>
          )}
          <div
            className={cn(
              "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card",
              isExpired ? "bg-destructive" : "bg-success"
            )}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{member.fullName}</h3>
          <p className="text-sm text-muted-foreground truncate">{member.cnic}</p>
          
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {member.contactNumber}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex flex-col items-end gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
              isExpired
                ? "bg-destructive/20 text-destructive"
                : "bg-success/20 text-success"
            )}
          >
            {isExpired ? (
              <>
                <AlertCircle className="h-3 w-3" />
                Expired
              </>
            ) : (
              <>
                <CheckCircle className="h-3 w-3" />
                Active
              </>
            )}
          </span>
          
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {isExpired
              ? `${Math.abs(daysUntilExpiry)} days ago`
              : `${daysUntilExpiry} days left`}
          </span>
        </div>
      </div>
    </Link>
  );
};
