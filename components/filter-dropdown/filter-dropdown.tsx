"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./filter-dropdown.module.scss";
import { Organization } from "@/app/dashboard/users/page";

interface FilterForm {
  organization: string;
  name: string;
  email: string;
  date: string;
  phone: string;
  status: string;
}

const emptyFilter: FilterForm = {
  organization: "",
  name: "",
  email: "",
  date: "",
  phone: "",
  status: "",
};

interface FilterDropdownProps {
  anchorEl: HTMLElement | null;
  organizations: Organization[]
  onClose: () => void;
  onFilter: (f: FilterForm) => void;
}

// Added: detect mobile so we can switch rendering mode
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

export default function FilterDropdown({
  anchorEl,
  onClose,
  onFilter,
  organizations,
}: FilterDropdownProps) {
  const [form, setForm] = useState<FilterForm>(emptyFilter);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(); 

  const rect = anchorEl?.getBoundingClientRect();
  const top = rect ? rect.bottom + window.scrollY + 6 : 0;
  const left = rect
    ? Math.min(
        rect.left - 100, 
      )
    : 16;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        e.target !== anchorEl
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchorEl]);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobile]);

  const set =
    (key: keyof FilterForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const fields = (
    <>
      <div className={styles.filterField}>
        <label>Organization</label>
        <select value={form.organization} onChange={set("organization")}>
          <option value="">Select</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.name}>
              {org.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filterField}>
        <label>Username</label>
        <input placeholder="User" value={form.name} onChange={set("name")} />
      </div>
      <div className={styles.filterField}>
        <label>Email</label>
        <input placeholder="Email" value={form.email} onChange={set("email")} />
      </div>
      <div className={styles.filterField}>
        <label>Date</label>
        <input type="date" value={form.date} onChange={set("date")} />
      </div>
      <div className={styles.filterField}>
        <label>Phone Number</label>
        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={set("phone")}
        />
      </div>
      <div className={styles.filterField}>
        <label>Status</label>
        <select value={form.status} onChange={set("status")}>
          <option value="">Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="blacklisted">Blacklisted</option>
        </select>
      </div>
      <div className={styles.filterActions}>
        <button
          className={styles.resetBtn}
          onClick={() => setForm(emptyFilter)}
        >
          Reset
        </button>
        <button
          className={styles.filterBtn}
          onClick={() => {
            onFilter(form);
            onClose();
          }}
        >
          Filter
        </button>
      </div>
    </>
  );

  if (isMobile) {
    return createPortal(
      <div className={styles.mobileOverlay} onClick={onClose}>
        <div
          ref={ref}
          className={styles.mobileSheet}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.mobileHandle} />
          <div className={styles.mobileHeader}>
            <span className={styles.mobileTitle}>Filter</span>
            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          {fields}
        </div>
      </div>,
      document.body,
    );
  }

  const dropdown = (
    <div ref={ref} className={styles.filterDropdown} style={{ top, left }}>
      {fields}
    </div>
  );

  return createPortal(dropdown, document.body);
}
