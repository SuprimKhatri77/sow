import { useState } from "react";
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

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("no");

  const languages = [
    { code: "no", name: "Norsk Bokmål", flag: "norway" },
    { code: "en", name: "English", flag: "uk" },
  ];

  const menuItems = [
    { icon: FileText, label: "Invoices", path: "/invoices" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: Settings, label: "My Business", path: "/my-business" },
    { icon: BookOpen, label: "Invoice Journal", path: "/invoice-journal" },
    { icon: Tag, label: "Price List", path: "/price-list" },
    { icon: Files, label: "Multiple Invoicing", path: "/multiple-invoicing" },
    { icon: DollarSign, label: "Unpaid Invoices", path: "/unpaid-invoices" },
    { icon: FileCheck, label: "Offer", path: "/offer" },
    {
      icon: Package,
      label: "Inventory Control",
      path: "/inventory-control",
      disabled: true,
    },
    { icon: User, label: "Member Invoicing", path: "#", disabled: true },
    { icon: ArrowUpDown, label: "Import/Export", path: "/import-export" },
    { icon: LogOut, label: "Log out", path: "/logout" },
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
            <div className={`flag-icon ${getCurrentLanguage().flag}`}></div>
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
                    <div className={`flag-icon ${lang.flag}`}></div>
                    <span>{lang.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="main-content">
        <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
          <div className="menu-header desktop-only">Menu</div>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`menu-item ${isActive(item.path) ? "active" : ""} ${item.disabled ? "disabled" : ""}`}
              >
                <IconComponent className="menu-icon" size={20} />
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
