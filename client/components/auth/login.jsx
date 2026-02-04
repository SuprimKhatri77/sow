import { useState, useEffect, useRef } from "react";

export function LoginPage() {
  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  const translations = {
    en: {
      home: "Home",
      order: "Order",
      customers: "Our Customers",
      about: "About us",
      contact: "Contact Us",
      login: "Log in",
      enterEmail: "Enter your email address",
      emailPlaceholder: "Email address",
      emailError: "Please enter a valid email address",
      enterPassword: "Enter your password",
      passwordPlaceholder: "Password",
      passwordError: "This field cannot be empty",
      loginButton: "Log in",
      register: "Register",
      forgot: "Forgotten password?",
      rights: "All rights reserved.",
      english: "English",
      swedish: "Svenska",
    },
    sv: {
      home: "Hem",
      order: "Beställ",
      customers: "Våra Kunder",
      about: "Om oss",
      contact: "Kontakta Oss",
      login: "Logga in",
      enterEmail: "Ange din e-postadress",
      emailPlaceholder: "E-postadress",
      emailError: "Vänligen ange en giltig e-postadress",
      enterPassword: "Ange ditt lösenord",
      passwordPlaceholder: "Lösenord",
      passwordError: "Detta fält kan inte vara tomt",
      loginButton: "Logga in",
      register: "Registrera",
      forgot: "Glömt lösenord?",
      rights: "Alla rättigheter förbehållna.",
      english: "English",
      swedish: "Svenska",
    },
  };

  const t = translations[language];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError && value) {
      setPasswordError(false);
    }
  };

  const handleLogin = () => {
    let hasError = false;

    if (!email || !validateEmail(email)) {
      setEmailError(true);
      hasError = true;
    }

    if (!password) {
      setPasswordError(true);
      hasError = true;
    }

    if (!hasError) {
      console.log("Login attempted");
    }
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
    setShowLangDropdown(false);
  };

  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="nav-left">
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="Logo"
            className="logo"
          />
        </div>

        <button
          className="hamburger-menu"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-center ${showMobileMenu ? "show" : ""}`}>
          <a href="#home" onClick={() => setShowMobileMenu(false)}>
            {t.home}
          </a>
          <a href="#order" onClick={() => setShowMobileMenu(false)}>
            {t.order}
          </a>
          <a href="#customers" onClick={() => setShowMobileMenu(false)}>
            {t.customers}
          </a>
          <a href="#about" onClick={() => setShowMobileMenu(false)}>
            {t.about}
          </a>
          <a href="#contact" onClick={() => setShowMobileMenu(false)}>
            {t.contact}
          </a>
        </div>

        <div className="nav-right">
          <div className="language-switcher" ref={dropdownRef}>
            <button
              className="lang-button"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
            >
              {language === "en" ? (
                <>
                  {t.english}
                  <img
                    src="https://storage.123fakturere.no/public/flags/GB.png"
                    alt="British Flag"
                  />
                </>
              ) : (
                <>
                  {t.swedish}

                  <img
                    src="https://storage.123fakturere.no/public/flags/SE.png"
                    alt="Swedish Flag"
                  />
                </>
              )}
            </button>

            {showLangDropdown && (
              <div className="lang-dropdown">
                <button
                  className={language === "sv" ? "active" : ""}
                  onClick={() => switchLanguage("sv")}
                >
                  {t.swedish} 🇸🇪
                </button>
                <button
                  className={language === "en" ? "active" : ""}
                  onClick={() => switchLanguage("en")}
                >
                  {t.english} 🇬🇧
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="login-card">
          <h1>{t.login}</h1>

          <div className="form-group">
            <label>{t.enterEmail}</label>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={handleEmailChange}
              className={emailError ? "error" : ""}
            />
            {emailError && (
              <span className="error-message">{t.emailError}</span>
            )}
          </div>

          <div className="form-group">
            <label>{t.enterPassword}</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={handlePasswordChange}
                className={passwordError ? "error" : ""}
              />
              <button
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {passwordError && (
              <span className="error-message">{t.passwordError}</span>
            )}
          </div>

          <button className="login-button" onClick={handleLogin}>
            {t.loginButton}
          </button>

          <div className="footer-links">
            <a href="#register">{t.register}</a>
            <a href="#forgot">{t.forgot}</a>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-left">
              <span className="footer-logo">123 Fakturera</span>
            </div>
            <div className="footer-center">
              <a href="#home">{t.home}</a>
              <a href="#order">{t.order}</a>
              <a href="#contact">{t.contact}</a>
            </div>
          </div>
          <hr />
          <div className="footer-bottom">
            © Lattfaktura, CRO no. 638537, 2025. {t.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
