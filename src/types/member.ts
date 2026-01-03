export interface Member {
  id: string;
  fullName: string;
  photo: string;
  contactNumber: string;
  cnic: string;
  address: string;
  admissionDate: string;
  membershipFee: number;
  feeExpiryDate: string;
  isActive: boolean;
}

export interface MemberFormData {
  fullName: string;
  photo: string;
  contactNumber: string;
  cnic: string;
  address: string;
  admissionDate: string;
  membershipFee: number;
  feeExpiryDate: string;
}
