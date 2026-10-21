import React, { useState, useEffect } from "react";
import {
  FiPlus, FiEdit2, FiEye, FiChevronDown, FiCheck, FiCheckCircle,
  FiX, FiAlertTriangle, FiUsers, FiUser, FiShield,
} from "react-icons/fi";
import AddIcon from "../../../assets/RolePermissionsSvgs/AddIcon.svg";
import AdminSvg from "../../../assets/RolePermissionsSvgs/AdminSvg.svg";
import EditIcon from "../../../assets/RolePermissionsSvgs/EditIcon.svg";
import EyeIcon from "../../../assets/RolePermissionsSvgs/EyeIcon.svg";
import InfoIcon from "../../../assets/RolePermissionsSvgs/InfoIcon.svg";
import ModeratorSvg from "../../../assets/RolePermissionsSvgs/ModeratorSvg.svg"
import RolesBasedIcon from "../../../assets/RolePermissionsSvgs/RolesBasedIcon.svg";
import UsersSvg from "../../../assets/RolePermissionsSvgs/UsersSvg.svg";

const PERMISSIONS = [
  "Dashboard", "Manage Users", "Manage Roles", "Manage Plans", "View Subscriptions",
  "Manage Content", "Manage Orders", "View Analytics", "Send Notifications",
];

const SvgIcon = ({ src, size = 16, className = "" }) => (
              <img src={src} alt="" width={size} height={size} className={`shrink-0 ${className}`} />
            );
            
    const AddIconSvg = (p) => <SvgIcon src={AddIcon} {...p} />;
    const EditIconSvg = (p) => <SvgIcon src={EditIcon} {...p} />;
    const EyeIconSvg = (p) => <SvgIcon src={EyeIcon} {...p} />;
    const InfoIconSvg = (p) => <SvgIcon src={InfoIcon} {...p} />;
    const RolesBasedIconSvg = (p) => <SvgIcon src={RolesBasedIcon} {...p} />;

const INITIAL_ROLES = [
  {
    id: "admin", name: "Admin", tag: "Super Admin", summary: "Full system access",
    description: "Full system access with all permissions.",
    sessionTimeout: "15 minutes (recommended)", loginSettings: "",
    locked: true, icon: AdminSvg, iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
    permissions: Object.fromEntries(PERMISSIONS.map((p) => [p, true])),
  },
  {
    id: "moderator", name: "Moderator", summary: "Manages & edits limited content",
    description: "Can manage and edit content but cannot access user management.",
    sessionTimeout: "15 minutes (recommended)",
    loginSettings: "Require re-authentication for sensitive operations.",
    icon: ModeratorSvg, iconBg: "bg-[#EDE9FE] text-[#7C3AED]",
    permissions: {
      Dashboard: true, "Manage Users": true, "Manage Roles": true, "Manage Plans": false,
      "View Subscriptions": true, "Manage Content": true, "Manage Orders": true,
      "View Analytics": true, "Send Notifications": true,
    },
  },
  {
    id: "user", name: "User", summary: "Basic access with limited privileges",
    description: "Basic access with limited privileges.",
    sessionTimeout: "30 minutes", loginSettings: "",
    icon: UsersSvg, iconBg: "bg-[#E8EBF7] text-[#001984]",
    permissions: {
      ...Object.fromEntries(PERMISSIONS.map((p) => [p, false])),
      "View Analytics": true,
    },
  },
];

const TIMEOUTS = ["5 minutes", "15 minutes (recommended)", "30 minutes", "1 hour", "Never"];
const MAX_LEN = 200;

const inputCls =
  "w-full border border-[#E2DFFC] rounded-md px-3 py-3 text-xs text-[#0A0847] placeholder-gray-400 bg-white outline-none focus:border-[#001984] transition-all";

const Checkbox = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onChange}
    className={`w-4 h-4 rounded border flex items-center justify-center mx-auto ${
      checked ? "bg-[#001984] border-[#001984] text-white" : "border-gray-400 bg-white"
    } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
  >
    {checked && <FiCheck size={11} strokeWidth={3} />}
  </button>
);

const SelectField = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} appearance-none pr-9 cursor-pointer`}
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
    <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [selectedId, setSelectedId] = useState("moderator");
  const [showAll, setShowAll] = useState(false);
  const [toast, setToast] = useState(false);
  const [draft, setDraft] = useState(null);

  const selected = roles.find((r) => r.id === selectedId);

  // Reset the edit form whenever a different role is chosen
  useEffect(() => {
    setDraft({
      roleId: selected.id,
      description: selected.description,
      sessionTimeout: selected.sessionTimeout,
      loginSettings: selected.loginSettings,
    });
    // eslint-disable-next-line
  }, [selectedId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const togglePermission = (roleId, perm) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId && !r.locked
          ? { ...r, permissions: { ...r.permissions, [perm]: !r.permissions[perm] } }
          : r
      )
    );
  };

  const setDraftField = (k, v) => setDraft((p) => ({ ...p, [k]: v }));

  const saveChanges = () => {
    if (selected.locked) return;
    setRoles((prev) =>
      prev.map((r) =>
        r.id === selectedId
          ? { ...r, description: draft.description, sessionTimeout: draft.sessionTimeout, loginSettings: draft.loginSettings }
          : r
      )
    );
    console.log("Saved role:", { ...selected, ...draft });
    setToast(true);
  };

  const addCustomRole = () => {
    const name = window.prompt("New role name");
    if (!name?.trim()) return;
    const id = crypto.randomUUID();
    setRoles((prev) => [
      ...prev,
      {
        id, name: name.trim(), summary: "Custom role", description: "",
        sessionTimeout: "15 minutes (recommended)", loginSettings: "",
        icon: FiUser, iconBg: "bg-[#E8EBF7] text-[#001984]",
        permissions: Object.fromEntries(PERMISSIONS.map((p) => [p, false])),
      },
    ]);
    setSelectedId(id);
  };

  if (!draft) return null;

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen font-[Inter] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[#0A0847]">Manage Roles</h1>
          <p className="text-sm text-[#0A084799] font-medium mt-2">
            {toast ? "Role permissions updated successfully." : "Control access levels and permissions for each role."}
          </p>
        </div>
        {toast && (
          <div className="flex items-center gap-3 bg-[#21AC1C0D] border border-[#B7E4B4] text-[#21AC1C] rounded-md pl-4 pr-3 py-3 text-xs font-semibold">
            <FiCheckCircle size={18} />
            <span>Role permissions updated successfully.</span>
            <button type="button" onClick={() => setToast(false)} className="ml-6 cursor-pointer">
              <FiX size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((r) => {
          const Icon = r.icon;
          const active = r.id === selectedId;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedId(r.id)}
              className={`text-left rounded-lg border p-6 flex items-start gap-4 transition-colors cursor-pointer ${
                active ? "bg-[#F1F0F0] border-[#D9D9D9]" : "bg-white border-[#E2DFFC] hover:bg-gray-50"
              }`}
            >
              <div className={`w-14 h-14 rounded-xl ${r.iconBg} flex items-center justify-center shrink-0`}>
                <img src={Icon} alt="" className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xl font-semibold text-[#001984]">{r.name}</p>
                {r.tag && <p className="text-sm font-semibold text-[#0A0847CC] mt-1">{r.tag}</p>}
                <p className="text-sm font-medium text-[#0A084799] mt-1">{r.summary}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-3">
        <button type="button" onClick={addCustomRole}
          className="px-5 py-2.5 bg-white border border-[#E2DFFC] text-[#0A0847CC] rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
          <AddIconSvg size={15} /> New Custom Role
        </button>
        <button type="button" onClick={() => document.getElementById("role-desc")?.focus()}
          className="px-5 py-2.5 bg-white border border-[#E2DFFC] text-[#0A0847CC] rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
          <EditIconSvg size={14} /> Edit Role Info
        </button>
        <button type="button" onClick={() => setShowAll((s) => !s)}
          className="px-5 py-2.5 bg-white border border-[#E2DFFC] text-[#0A0847CC] rounded-md text-xs font-semibold flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
          <EyeIconSvg size={14} /> {showAll ? "Hide Details" : "View All Permissions"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-6 items-start">
        {/* Permissions Matrix */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 space-y-5">
          <h3 className="text-base font-semibold text-[#0A0847]">Permissions Matrix</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[480px]">
              <thead className="bg-[#F3F7FD]">
                <tr className="text-sm text-[#0A0847CC]">
                  <th className="p-4 font-medium">Permission</th>
                  {roles.map((r) => (
                    <th key={r.id} className="p-4 font-medium text-center">{r.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DFFC] text-[#0A0847CC]">
                {PERMISSIONS.map((perm) => (
                  <tr key={perm} className="hover:bg-gray-50/50">
                    <td className="p-4 font-medium">{perm}</td>
                    {roles.map((r) => (
                      <td key={r.id} className="p-4">
                        <Checkbox
                          checked={!!r.permissions[perm]}
                          disabled={r.locked}
                          onChange={() => togglePermission(r.id, perm)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showAll && (
            <div className="border border-[#E2DFFC] rounded-md p-4 text-xs text-[#0A0847CC] space-y-2">
              {roles.map((r) => (
                <p key={r.id}>
                  <span className="font-semibold text-[#0A0847]">{r.name}:</span>{" "}
                  {PERMISSIONS.filter((p) => r.permissions[p]).join(", ") || "No permissions"}
                </p>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 bg-[#FEF6E7] border border-[#FADCC7] rounded-md px-4 py-3.5">
            <InfoIconSvg size={24} className="text-[#F59E0B] shrink-0" />
            <p className="text-sm font-semibold text-[#001984]">Admin role cannot be modified.</p>
          </div>

          <div className="flex items-center gap-4 bg-[#F1F0F0] border border-[#E2E2E2] rounded-md px-4 py-4">
            <div className="w-12 h-12 rounded-lg bg-[#E4E7F5] text-[#001984] flex items-center justify-center shrink-0">
              <RolesBasedIconSvg size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#001984]">Roles are role-based to control access levels.</p>
              <p className="text-xs text-[#0A084799] font-medium mt-1">
                Modify role permissions to customize access rights.
              </p>
            </div>
          </div>
        </div>

        {/* Edit Role */}
        <div className="bg-white rounded-lg border border-[#E2DFFC] p-6 flex flex-col min-h-[600px]">
          <h3 className="text-base font-semibold text-[#0A0847]">
            Edit Role: <span className="text-[#0A084799] font-medium">{selected.name}</span>
          </h3>

          <div className="mt-6 space-y-5 flex-1">
            <div>
              <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
                Role Name <span className="text-[#EB0C10]">*</span>
              </label>
              <SelectField
                value={selected.id}
                onChange={(id) => setSelectedId(id)}
                options={roles.map((r) => r.id)}
              />
              {/* Shows names instead of ids */}
              <style>{`select option { color: inherit; }`}</style>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">Description</label>
              <div className="relative">
                <textarea
                  id="role-desc"
                  rows={4}
                  maxLength={MAX_LEN}
                  disabled={selected.locked}
                  value={draft.description}
                  onChange={(e) => setDraftField("description", e.target.value)}
                  className={`${inputCls} resize-none pb-7 disabled:bg-gray-50`}
                />
                <span className="absolute bottom-2 right-3 text-[11px] text-[#0A084799]">
                  {draft.description.length}/{MAX_LEN}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">Session Timeout</label>
              <SelectField
                value={draft.sessionTimeout}
                onChange={(v) => setDraftField("sessionTimeout", v)}
                options={TIMEOUTS}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0A0847CC] mb-1.5">
                Login Settings <span className="text-[#EB0C10]">*</span>
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  maxLength={MAX_LEN}
                  disabled={selected.locked}
                  value={draft.loginSettings}
                  onChange={(e) => setDraftField("loginSettings", e.target.value)}
                  className={`${inputCls} resize-none pb-7 disabled:bg-gray-50`}
                />
                <span className="absolute bottom-2 right-3 text-[11px] text-[#0A084799]">
                  {draft.loginSettings.length}/{MAX_LEN}
                </span>
              </div>
              <p className="text-[10px] italic text-[#0A084799] mt-1">You can leave this blank.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={saveChanges}
            disabled={selected.locked}
            className="w-full mt-6 py-3.5 bg-[#4A2BD0] hover:bg-[#3B21A8] text-white rounded-md text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}