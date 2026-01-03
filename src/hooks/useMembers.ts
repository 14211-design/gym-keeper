import { useState, useEffect, useMemo } from "react";
import { Member, MemberFormData } from "@/types/member";
import { mockMembers } from "@/data/mockMembers";

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "expired">("all");

  useEffect(() => {
    // Load from localStorage or use mock data
    const stored = localStorage.getItem("gym-members");
    if (stored) {
      setMembers(JSON.parse(stored));
    } else {
      setMembers(mockMembers);
      localStorage.setItem("gym-members", JSON.stringify(mockMembers));
    }
  }, []);

  const saveMembers = (newMembers: Member[]) => {
    setMembers(newMembers);
    localStorage.setItem("gym-members", JSON.stringify(newMembers));
  };

  const isExpired = (expiryDate: string): boolean => {
    return new Date(expiryDate) < new Date();
  };

  const addMember = (data: MemberFormData) => {
    const newMember: Member = {
      id: Date.now().toString(),
      ...data,
      isActive: !isExpired(data.feeExpiryDate),
    };
    saveMembers([...members, newMember]);
    return newMember;
  };

  const updateMember = (id: string, data: Partial<MemberFormData>) => {
    const updated = members.map((m) =>
      m.id === id
        ? { ...m, ...data, isActive: data.feeExpiryDate ? !isExpired(data.feeExpiryDate) : m.isActive }
        : m
    );
    saveMembers(updated);
  };

  const deleteMember = (id: string) => {
    saveMembers(members.filter((m) => m.id !== id));
  };

  const renewMembership = (id: string, newExpiryDate: string, newFee: number) => {
    const updated = members.map((m) =>
      m.id === id
        ? { ...m, feeExpiryDate: newExpiryDate, membershipFee: newFee, isActive: true }
        : m
    );
    saveMembers(updated);
  };

  const filteredMembers = useMemo(() => {
    return members
      .map((m) => ({ ...m, isActive: !isExpired(m.feeExpiryDate) }))
      .filter((member) => {
        const matchesSearch =
          member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.cnic.includes(searchQuery) ||
          member.contactNumber.includes(searchQuery);

        const matchesFilter =
          filterStatus === "all" ||
          (filterStatus === "active" && member.isActive) ||
          (filterStatus === "expired" && !member.isActive);

        return matchesSearch && matchesFilter;
      });
  }, [members, searchQuery, filterStatus]);

  const stats = useMemo(() => {
    const updatedMembers = members.map((m) => ({
      ...m,
      isActive: !isExpired(m.feeExpiryDate),
    }));
    const total = updatedMembers.length;
    const active = updatedMembers.filter((m) => m.isActive).length;
    const expired = updatedMembers.filter((m) => !m.isActive).length;
    const totalRevenue = updatedMembers.reduce((sum, m) => sum + m.membershipFee, 0);

    return { total, active, expired, totalRevenue };
  }, [members]);

  const expiredMembers = useMemo(() => {
    return members
      .map((m) => ({ ...m, isActive: !isExpired(m.feeExpiryDate) }))
      .filter((m) => !m.isActive);
  }, [members]);

  const getMemberById = (id: string) => {
    const member = members.find((m) => m.id === id);
    if (member) {
      return { ...member, isActive: !isExpired(member.feeExpiryDate) };
    }
    return null;
  };

  return {
    members: filteredMembers,
    allMembers: members,
    expiredMembers,
    stats,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    addMember,
    updateMember,
    deleteMember,
    renewMembership,
    getMemberById,
  };
};
