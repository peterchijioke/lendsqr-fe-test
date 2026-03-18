"use client";

import { useState } from "react";
import styles from "./header.module.scss";
import Link from "next/link";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className={styles.header}>
      {showMobileSearch && (
        <div className={styles.mobileSearchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button 
            className={styles.searchButton}
            onClick={() => setShowMobileSearch(false)}
          >
            <span>
              <img src={"/icons/search.svg"} />
            </span>
          </button>
          <button 
            className={styles.closeSearch}
            onClick={() => setShowMobileSearch(false)}
          >
            ✕
          </button>
        </div>
      )}

      {!showMobileSearch && (
        <>
          <div className={styles.logoContainer}>
            <a href="/" className={styles.logo}>
              <img src="/logo.svg" />
            </a>
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className={styles.searchButton}>
                <span>
                  <img src={"/icons/search.svg"} />
                </span>
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/docs" className={styles.docsLink}>
              Docs
            </Link>
            <button className={styles.notificationBtn}>
              <span>
                <img src={"/icons/bell.svg"} />
              </span>
            </button>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                <img src="/profile.png" alt="User" />
              </div>
              <span className={styles.userName}>Adedeji</span>
              <span className={styles.dropdownArrow}>
                <img src={"/icons/down-sh.svg"} />
              </span>
            </div>
          </div>

          {/* Mobile actions */}
          <div className={styles.mobileActions}>
            <button 
              className={styles.mobileSearchBtn}
              onClick={() => setShowMobileSearch(true)}
            >
              <img src={"/icons/search.svg"} />
            </button>
          </div>

          {/* Mobile hamburger menu - toggles sidebar */}
          <button 
            className={styles.hamburger}
            onClick={() => onMenuClick?.()}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </>
      )}
    </header>
  );
}
