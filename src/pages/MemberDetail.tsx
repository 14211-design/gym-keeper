import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useMembers } from "@/hooks/useMembers";
import { 
  ArrowLeft, 
  Phone, 
  CreditCard, 
  MapPin, 
  Calendar, 
  DollarSign,
  Edit,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMemberById, deleteMember, renewMembership } = useMembers();
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [newFee, setNewFee] = useState(5000);

  const member = getMemberById(id!);

  if (!member) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="font-display text-2xl text-foreground">Member Not Found</h1>
          <Link to="/members" className="mt-4 text-primary hover:underline">
            Back to Members
          </Link>
        </div>
      </MainLayout>
    );
  }

  const isExpired = new Date(member.feeExpiryDate) < new Date();
  const daysUntilExpiry = Math.ceil(
    (new Date(member.feeExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this member?")) {
      deleteMember(member.id);
      toast.success("Member deleted successfully");
      navigate("/members");
    }
  };

  const handleRenew = () => {
    if (!newExpiryDate) {
      toast.error("Please select a new expiry date");
      return;
    }
    renewMembership(member.id, newExpiryDate, newFee);
    toast.success("Membership renewed successfully!");
    setShowRenewModal(false);
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground opacity-0 animate-fade-in"
          style={{ animationFillMode: "forwards" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-8 opacity-0 animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            {/* Avatar */}
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.fullName}
                className="h-32 w-32 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-primary/20 font-display text-4xl text-primary">
                {member.fullName.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
            )}

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <h1 className="font-display text-3xl tracking-wide text-foreground">
                  {member.fullName.toUpperCase()}
                </h1>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
                    isExpired
                      ? "bg-destructive/20 text-destructive"
                      : "bg-success/20 text-success"
                  )}
                >
                  {isExpired ? (
                    <>
                      <AlertCircle className="h-4 w-4" />
                      Expired
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Active
                    </>
                  )}
                </span>
              </div>
              <p className="mt-2 text-muted-foreground">
                Member since {new Date(member.admissionDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                to={`/edit-member/${member.id}`}
                className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-muted"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Contact Info */}
          <div className="glass-card rounded-2xl p-6 opacity-0 animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <h2 className="font-display text-xl tracking-wide text-foreground">CONTACT INFO</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{member.contactNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">CNIC</p>
                  <p className="font-medium text-foreground">{member.cnic}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">{member.address || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Membership Info */}
          <div className="glass-card rounded-2xl p-6 opacity-0 animate-slide-up" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
            <h2 className="font-display text-xl tracking-wide text-foreground">MEMBERSHIP</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Fee</p>
                  <p className="font-medium text-foreground">₨{member.membershipFee.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Admission Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(member.admissionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  isExpired ? "bg-destructive/10" : "bg-success/10"
                )}>
                  <Clock className={cn("h-5 w-5", isExpired ? "text-destructive" : "text-success")} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fee Expiry</p>
                  <p className={cn("font-medium", isExpired ? "text-destructive" : "text-foreground")}>
                    {new Date(member.feeExpiryDate).toLocaleDateString()}
                    <span className="ml-2 text-sm">
                      ({isExpired ? `${Math.abs(daysUntilExpiry)} days ago` : `${daysUntilExpiry} days left`})
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Renew Button */}
        {isExpired && (
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
            <button
              onClick={() => setShowRenewModal(true)}
              className="btn-gym w-full rounded-xl py-4 text-lg font-semibold text-primary-foreground"
            >
              <RefreshCw className="mr-2 inline h-5 w-5" />
              Renew Membership
            </button>
          </div>
        )}

        {/* Renew Modal */}
        {showRenewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="glass-card w-full max-w-md rounded-2xl p-8 animate-scale-in">
              <h2 className="font-display text-2xl tracking-wide text-foreground">RENEW MEMBERSHIP</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Set new expiry date for {member.fullName}
              </p>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">New Expiry Date</label>
                  <input
                    type="date"
                    value={newExpiryDate}
                    onChange={(e) => setNewExpiryDate(e.target.value)}
                    className="input-gym w-full rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">New Fee (PKR)</label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    className="input-gym w-full rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setShowRenewModal(false)}
                  className="flex-1 rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRenew}
                  className="btn-gym flex-1 rounded-xl py-3 text-sm font-semibold text-primary-foreground"
                >
                  Renew Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MemberDetail;
