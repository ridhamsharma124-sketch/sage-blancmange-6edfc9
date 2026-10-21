import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * items: [{ label: "Dashboard", path: "/admin" }, { label: "Coupons", path: "/admin/coupons" }, { label: "Create Coupon Code" }]
 * The last item (or any item without a path) renders as plain text.
 */
export default function Breadcrumb({ items = [] }) {
  const navigate = useNavigate();

  return (
    <p className="text-sm font-medium text-[#0A084799]">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {item.path && !isLast ? (
              <button
                type="button"
                onClick={() => navigate(item.path)}
                className="hover:text-[#001984] hover:underline cursor-pointer"
              >
                {item.label}
              </button>
            ) : (
              <span className={isLast ? "text-[#0A084799]" : ""}>{item.label}</span>
            )}
            {!isLast && <span className="mx-1.5">&gt;</span>}
          </React.Fragment>
        );
      })}
    </p>
  );
}