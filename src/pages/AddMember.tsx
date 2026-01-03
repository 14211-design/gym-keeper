import { MainLayout } from "@/components/layout/MainLayout";
import { MemberForm } from "@/components/MemberForm";
import { UserPlus } from "lucide-react";

const AddMember = () => {
  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" }}>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-4xl tracking-wide text-foreground">
            ADD NEW MEMBER
          </h1>
          <p className="mt-2 text-muted-foreground">
            Register a new gym member
          </p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl p-8 opacity-0 animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
          <MemberForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default AddMember;
