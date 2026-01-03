import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, User, Phone, CreditCard, MapPin, Calendar, DollarSign } from "lucide-react";
import { MemberFormData } from "@/types/member";
import { useMembers } from "@/hooks/useMembers";
import { toast } from "sonner";

interface MemberFormProps {
  initialData?: MemberFormData;
  memberId?: string;
  isEditing?: boolean;
}

export const MemberForm = ({ initialData, memberId, isEditing = false }: MemberFormProps) => {
  const navigate = useNavigate();
  const { addMember, updateMember } = useMembers();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<MemberFormData>(
    initialData || {
      fullName: "",
      photo: "",
      contactNumber: "",
      cnic: "",
      address: "",
      admissionDate: new Date().toISOString().split("T")[0],
      membershipFee: 5000,
      feeExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    }
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.contactNumber || !formData.cnic) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isEditing && memberId) {
      updateMember(memberId, formData);
      toast.success("Member updated successfully!");
    } else {
      addMember(formData);
      toast.success("Member added successfully!");
    }
    
    navigate("/members");
  };

  const inputClasses = "input-gym w-full rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Photo Upload */}
      <div className="flex flex-col items-center gap-4">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative h-32 w-32 cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-border transition-all hover:border-primary"
        >
          {formData.photo ? (
            <img
              src={formData.photo}
              alt="Member"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-secondary text-muted-foreground">
              <User className="h-10 w-10" />
              <span className="mt-2 text-xs">Add Photo</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="h-8 w-8 text-primary" />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <Upload className="h-4 w-4" />
          Upload Photo
        </button>
      </div>

      {/* Form Fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <User className="h-4 w-4 text-primary" />
            Full Name *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
            placeholder="Enter full name"
            className={inputClasses}
            required
          />
        </div>

        {/* Contact Number */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Phone className="h-4 w-4 text-primary" />
            Contact Number *
          </label>
          <input
            type="tel"
            value={formData.contactNumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, contactNumber: e.target.value }))}
            placeholder="0300-1234567"
            className={inputClasses}
            required
          />
        </div>

        {/* CNIC */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <CreditCard className="h-4 w-4 text-primary" />
            CNIC Number *
          </label>
          <input
            type="text"
            value={formData.cnic}
            onChange={(e) => setFormData((prev) => ({ ...prev, cnic: e.target.value }))}
            placeholder="35201-1234567-1"
            className={inputClasses}
            required
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="Enter address"
            className={inputClasses}
          />
        </div>

        {/* Admission Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            Admission Date
          </label>
          <input
            type="date"
            value={formData.admissionDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, admissionDate: e.target.value }))}
            className={inputClasses}
          />
        </div>

        {/* Fee Expiry Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Calendar className="h-4 w-4 text-destructive" />
            Fee Expiry Date
          </label>
          <input
            type="date"
            value={formData.feeExpiryDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, feeExpiryDate: e.target.value }))}
            className={inputClasses}
          />
        </div>

        {/* Membership Fee */}
        <div className="space-y-2 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <DollarSign className="h-4 w-4 text-primary" />
            Membership Fee (PKR)
          </label>
          <input
            type="number"
            value={formData.membershipFee}
            onChange={(e) => setFormData((prev) => ({ ...prev, membershipFee: Number(e.target.value) }))}
            placeholder="5000"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-gym rounded-xl px-8 py-3 text-sm font-semibold text-primary-foreground"
        >
          {isEditing ? "Update Member" : "Add Member"}
        </button>
      </div>
    </form>
  );
};
