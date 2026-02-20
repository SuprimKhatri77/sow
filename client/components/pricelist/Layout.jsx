import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import {
  FileText,
  Users,
  Settings,
  BookOpen,
  Tag,
  Files,
  DollarSign,
  FileCheck,
  Package,
  User,
  ArrowUpDown,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react";
import "./Layout.css";
import { useAuth } from "../../context/UseAuth";
import { useRef } from "react";

export function Layout() {
  const { logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const sidebarRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("price-list-page");
    return () => document.body.classList.remove("price-list-page");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const languages = [
    {
      code: "sv",
      name: "Svenska",
      flag: "https://storage.123fakturere.no/public/flags/SE.png",
    },
    {
      code: "en",
      name: "English",
      flag: "https://storage.123fakturere.no/public/flags/GB.png",
    },
  ];

  const menuItems = [
    { icon: FileText, label: "Invoices", path: "/invoices", color: "#38bdf8" },
    { icon: Users, label: "Customers", path: "/customers", color: "#10b981" },
    {
      icon: Settings,
      label: "My Business",
      path: "/my-business",
      color: "#f59e0b",
    },
    {
      icon: BookOpen,
      label: "Invoice Journal",
      path: "/invoice-journal",
      color: "#a78bfa",
    },
    { icon: Tag, label: "Price List", path: "/price-list", color: "#0ea5e9" },
    {
      icon: Files,
      label: "Multiple Invoicing",
      path: "/multiple-invoicing",
      color: "#ef4444",
    },
    {
      icon: DollarSign,
      label: "Unpaid Invoices",
      path: "/unpaid-invoices",
      color: "#22c55e",
    },
    { icon: FileCheck, label: "Offer", path: "/offer", color: "#06b6d4" },
    {
      icon: Package,
      label: "Inventory Control",
      path: "/inventory-control",
      disabled: true,
      color: "#9ca3af",
    },
    {
      icon: User,
      label: "Member Invoicing",
      path: "#",
      disabled: true,
      color: "#9ca3af",
    },
    {
      icon: ArrowUpDown,
      label: "Import/Export",
      path: "/import-export",
      color: "#6366f1",
    },
    { icon: LogOut, label: "Log out", path: "/logout", color: "#f43f5e" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    setLangDropdownOpen(false);
    console.log("Language changed to:", langCode);
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === currentLanguage);
  };

  const getOtherLanguages = () => {
    return languages.filter((lang) => lang.code !== currentLanguage);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="user-info desktop-only">
            <div className="user-avatar"></div>
            <div className="user-details">
              <div className="user-name">John Andre</div>
              <div className="user-location">Storfjord AS</div>
            </div>
          </div>
        </div>
        <div className="header-right">
          <div
            className="language-switcher"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          >
            <span className="language-label">{getCurrentLanguage().name}</span>
            <img
              src={getCurrentLanguage().flag}
              alt={`${getCurrentLanguage().name} flag`}
              className="flag-icon"
            />
            <ChevronDown
              size={16}
              className={`dropdown-icon ${langDropdownOpen ? "open" : ""}`}
            />
            {langDropdownOpen && (
              <div className="language-dropdown">
                {getOtherLanguages().map((lang) => (
                  <div
                    key={lang.code}
                    className="language-option"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange(lang.code);
                    }}
                  >
                    <img
                      src={lang.flag}
                      alt={`${lang.name} flag`}
                      className="flag-icon"
                    />
                    <span>{lang.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="main-content-pricelist">
        <aside ref={sidebarRef} className={`sidebar ${menuOpen ? "open" : ""}`}>
          <div className="menu-header desktop-only">Menu</div>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                onClick={() => {
                  if (item.path === "/logout") {
                    logout();
                  }
                }}
                className={`menu-item ${isActive(item.path) ? "active" : ""} ${item.disabled ? "disabled" : ""}`}
              >
                <IconComponent
                  className="menu-icon"
                  size={20}
                  color={item.color}
                />
                <span className="menu-label">{item.label}</span>
              </div>
            );
          })}
        </aside>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
