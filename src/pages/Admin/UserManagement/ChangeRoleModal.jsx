import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiAlertTriangle, FiCheckCircle, FiInfo, FiX, FiStar, FiUser, FiSettings, FiShield,
} from "react-icons/fi";
import AdminIcon from "../../../assets/UserManagementSvgs/AdminRolesvg.svg"
import ModeratorIcon from "../../../assets/UserManagementSvgs/ModerartorSvg.svg"
import UserRoleIcon from "../../../assets/UserManagementSvgs/UserRoleIcon.svg"
import CustomRoleIcon from "../../../assets/UserManagementSvgs/Customrole.svg"

const ROLE_OPTIONS = [
  { value: "Admin", desc: "Full system access", icon: AdminIcon },
  { value: "Moderator", desc: "Content and community management", icon: ModeratorIcon },
  { value: "User", desc: "Standard app access", icon: UserRoleIcon },
  { value: "Custom Role", desc: "Define custom permissions", icon: CustomRoleIcon },
];

const ELEVATED = ["Admin", "Moderator", "Custom Role"];

export default function ChangeRoleModal({ user, onClose, onSave }) {
  const currentRole = user?.role || "User";
  const [selected, setSelected] = useState(currentRole);
  const [reason, setReason] = useState("");
  const [reauth, setReauth] = useState(true);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!user) return null;

  const unchanged = selected === currentRole;
  const isElevatedChange = ELEVATED.includes(selected) && selected !== currentRole;
  // Demoting the primary admin — replace with a real API flag
  const isPrimaryAdmin = !!user.primaryAdmin;
  const blocked = isPrimaryAdmin && currentRole === "Admin" && selected !== "Admin";

  const handleConfirm = () => {
    if (blocked || unchanged) return;
    if (!reason.trim()) { setError(true); return; }

    onSave({ ...user, role: selected, roleChangeReason: reason.trim(), requireReauth: reauth });
    setToast(true);
    setTimeout(onClose, 1200);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] bg-black/45 flex items-start justify-center overflow-y-auto p-4 sm:p-8 font-[Inter]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative lg:ml-60 bg-white rounded-lg border border-[#E2DFFC] w-full max-w-[1065px] p-7 space-y-5">
        <button type="button" onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
          <FiX size={18} />
        </button>

        <h2 className="text-xl font-semibold text-[#0A0847]">Change Role</h2>

        <div className="flex items-center gap-8">
          <span className="text-sm font-semibold text-[#0A0847]">Current Role</span>
          <span className="px-5 py-1.5 rounded-md bg-[#E4E1F7] text-[#0A0847CC] text-xs font-semibold">
            {currentRole}
          </span>
        </div>

        {/* Role options */}
        <div className="space-y-4">
          {ROLE_OPTIONS.map(({ value, desc, icon }) => {
            const active = selected === value;
            return (
              <label
                key={value}
                className={`flex items-center gap-4 rounded-md border px-5 py-5 cursor-pointer transition-colors ${
                  active ? "bg-[#F5F5F5] border-[#001984]" : "bg-white border-[#E2DFFC] hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  checked={active}
                  onChange={() => { setSelected(value); setError(false); }}
                  className="accent-[#001984] w-5 h-5 shrink-0"
                />
                <img src={icon} alt="" width={34} height={34} className="shrink-0" />
                <div>
                  <p className={`text-xl font-semibold ${active ? "text-[#001984]" : "text-[#0A0847CC]"}`}>{value}</p>
                  <p className="text-sm font-medium text-[#0A084799]">{desc}</p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Warning */}
        <div className="flex items-center gap-3 bg-[#FEF6E7] border border-[#FADCC7] rounded-md px-5 py-4">
          <FiAlertTriangle size={24} className="text-[#F59E0B] shrink-0" />
          <p className="text-sm font-semibold text-[#0A0847CC]">
            {blocked
              ? "Primary Administrator access cannot be removed."
              : "Primary Administrator access cannot be removed."}
          </p>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
            Reason for Role Change <span className="text-[#EB0C10]">*</span>
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => { setReason(e.target.value); setError(false); }}
            placeholder="Updated responsibilities."
            className={`w-full border rounded-md px-4 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none resize-none focus:border-[#001984] ${
              error ? "border-[#EB0C10]" : "border-[#E2DFFC]"
            }`}
          />
          {error && <p className="text-[10px] text-[#EB0C10] mt-1">A reason is required for the audit log.</p>}
        </div>

        {/* Re-auth toggle */}
        <div className="flex items-center justify-between gap-6">
          <p className="text-xs font-semibold text-[#0A0847CC] max-w-[280px]">
            Require re-authentication before applying elevated access.
          </p>
          <button
            type="button"
            onClick={() => setReauth((r) => !r)}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
              reauth ? "bg-[#001984]" : "bg-gray-300"
            }`}
          >
            <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${reauth ? "translate-x-4" : ""}`} />
          </button>
        </div>
        {isElevatedChange && !reauth && (
          <p className="text-[10px] text-[#C65406] -mt-3">
            Re-authentication is off. Elevated access will apply immediately.
          </p>
        )}

        {/* Privacy note */}
        <div className="flex items-center gap-2 bg-[#EEF0FB] border border-[#CBC6F8] rounded-md px-3 py-2.5 text-[11px] font-medium text-[#0A0847CC]">
          <FiInfo size={13} className="text-gray-500 shrink-0" />
          Private reflections and prayers are never visible to administrators.
        </div>

        {/* Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.15fr] gap-6">
          <button type="button" onClick={onClose}
            className="py-3.5 bg-white border border-[#001984] text-[#0A0847] rounded-md text-sm font-semibold hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={blocked || unchanged}
            className="py-3.5 bg-[#4A2BD0] hover:bg-[#3B21A8] text-white rounded-md text-sm font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Role Change
          </button>
        </div>

        {toast && (
          <div className="flex items-center justify-between bg-[#21AC1C0D] border border-[#B7E4B4] text-[#21AC1C] rounded-md px-4 py-4 text-sm font-semibold">
            <span className="flex items-center gap-3">
              <FiCheckCircle size={22} /> Role changed to {selected} and recorded.
            </span>
            <button type="button" onClick={() => setToast(false)} className="cursor-pointer"><FiX size={20} /></button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}