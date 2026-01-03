import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { MemberForm } from "@/components/MemberForm";
import { useMembers } from "@/hooks/useMembers";
import { Edit } from "lucide-react";

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMemberById } = useMembers();

  const member = getMemberById(id!);

  if (!member) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="font-display text-2xl text-foreground">Member Not Found</h1>
          <button
            onClick={() => navigate("/members")}
            className="mt-4 text-primary hover:underline"
          >
            Back to Members
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
            <Edit className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-4xl tracking-wide text-foreground">
            EDIT MEMBER
          </h1>
          <p className="mt-2 text-muted-foreground">
            Update {member.fullName}'s information
          </p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl p-8 opacity-0 animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          <MemberForm
            initialData={{
              fullName: member.fullName,
              photo: member.photo,
              contactNumber: member.contactNumber,
              cnic: member.cnic,
              address: member.address,
              admissionDate: member.admissionDate,
              membershipFee: member.membershipFee,
              feeExpiryDate: member.feeExpiryDate,
            }}
            memberId={member.id}
            isEditing
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default EditMember;
