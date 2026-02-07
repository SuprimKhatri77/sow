import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/UseAuth.jsx";
import { authApi } from "../../services/api";
import "./auth.css";

export function AuthPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [language, setLanguage] = useState("en");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => document.body.classList.remove("auth-page");
  }, []);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/price-list");
    }
  }, [isAuthenticated, navigate]);

  const translations = {
    en: {
      home: "Home",
      order: "Order",
      customers: "Our Customers",
      about: "About us",
      contact: "Contact Us",
      login: "Log in",
      register: "Register",
      createAccount: "Create Account",
      enterName: "Enter your full name",
      namePlaceholder: "Full name",
      nameRequired: "Name is required",
      nameMinLength: "Name must be at least 2 characters",
      enterEmail: "Enter your email address",
      emailPlaceholder: "Email address",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      enterPassword: "Enter your password",
      passwordPlaceholder: "Password",
      passwordRequired: "Password is required",
      passwordMinLength: "Password must be at least 6 characters",
      confirmPassword: "Confirm your password",
      confirmPasswordPlaceholder: "Confirm password",
      confirmPasswordRequired: "Please confirm your password",
      passwordMismatch: "Passwords do not match",
      loginButton: "Log in",
      registerButton: "Register",
      loggingIn: "Logging in...",
      registering: "Creating account...",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      loginHere: "Log in",
      registerHere: "Register",
      forgot: "Forgotten password?",
      rights: "All rights reserved.",
      english: "English",
      swedish: "Svenska",
      loginFailed: "Login failed. Please check your credentials.",
      serverError: "Server error. Please try again later.",
      emailAlreadyExists: "This email is already registered.",
    },
    sv: {
      home: "Hem",
      order: "Beställ",
      customers: "Våra Kunder",
      about: "Om oss",
      contact: "Kontakta Oss",
      login: "Logga in",
      register: "Registrera",
      createAccount: "Skapa Konto",
      enterName: "Ange ditt fullständiga namn",
      namePlaceholder: "Fullständigt namn",
      nameRequired: "Namn krävs",
      nameMinLength: "Namnet måste vara minst 2 tecken",
      enterEmail: "Ange din e-postadress",
      emailPlaceholder: "E-postadress",
      emailRequired: "E-post krävs",
      emailInvalid: "Vänligen ange en giltig e-postadress",
      enterPassword: "Ange ditt lösenord",
      passwordPlaceholder: "Lösenord",
      passwordRequired: "Lösenord krävs",
      passwordMinLength: "Lösenordet måste vara minst 6 tecken",
      confirmPassword: "Bekräfta ditt lösenord",
      confirmPasswordPlaceholder: "Bekräfta lösenord",
      confirmPasswordRequired: "Vänligen bekräfta ditt lösenord",
      passwordMismatch: "Lösenorden matchar inte",
      loginButton: "Logga in",
      registerButton: "Registrera",
      loggingIn: "Loggar in...",
      registering: "Skapar konto...",
      alreadyHaveAccount: "Har du redan ett konto?",
      dontHaveAccount: "Har du inget konto?",
      loginHere: "Logga in",
      registerHere: "Registrera",
      forgot: "Glömt lösenord?",
      rights: "Alla rättigheter förbehållna.",
      english: "English",
      swedish: "Svenska",
      loginFailed: "Inloggningen misslyckades. Kontrollera dina uppgifter.",
      serverError: "Serverfel. Försök igen senare.",
      emailAlreadyExists: "Denna e-postadress är redan registrerad.",
    },
  };

  const t = translations[language];

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralError("");
  }, [isLogin]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".hamburger-menu")
      ) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileMenu]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [showMobileMenu]);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError("");
    setGeneralError("");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError("");
    setGeneralError("");

    if (value && !validateEmail(value)) {
      setEmailError(t.emailInvalid);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError("");
    setGeneralError("");
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError("");
    setGeneralError("");
  };

  const handleNameBlur = () => {
    if (!name.trim()) {
      setNameError(t.nameRequired);
    } else if (name.trim().length < 2) {
      setNameError(t.nameMinLength);
    }
  };

  const handleEmailBlur = () => {
    if (!email.trim()) {
      setEmailError(t.emailRequired);
    } else if (!validateEmail(email)) {
      setEmailError(t.emailInvalid);
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError(t.passwordRequired);
    } else if (password.length < 6) {
      setPasswordError(t.passwordMinLength);
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (!confirmPassword) {
      setConfirmPasswordError(t.confirmPasswordRequired);
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(t.passwordMismatch);
    }
  };

  const validateLoginForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError(t.emailRequired);
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t.emailInvalid);
      isValid = false;
    }

    if (!password) {
      setPasswordError(t.passwordRequired);
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(t.passwordMinLength);
      isValid = false;
    }

    return isValid;
  };

  const validateRegisterForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError(t.nameRequired);
      isValid = false;
    } else if (name.trim().length < 2) {
      setNameError(t.nameMinLength);
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError(t.emailRequired);
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t.emailInvalid);
      isValid = false;
    }

    if (!password) {
      setPasswordError(t.passwordRequired);
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(t.passwordMinLength);
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError(t.confirmPasswordRequired);
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(t.passwordMismatch);
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login(email, password);
      login(response.token, response.user);
      navigate("/price-list");
    } catch (error) {
      console.error("Login error:", error);

      if (error.message === "Invalid credentials") {
        setGeneralError(t.loginFailed);
      } else {
        setGeneralError(t.serverError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralError("");

    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.register(name, email, password);
      login(response.token, response.user);
      navigate("/price-list");
    } catch (error) {
      console.error("Register error:", error);

      if (error.message === "Email already registered") {
        setGeneralError(t.emailAlreadyExists);
      } else {
        setGeneralError(error.message || t.serverError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
    setShowLangDropdown(false);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
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

        <div
          ref={mobileMenuRef}
          className={`nav-center ${showMobileMenu ? "show" : ""}`}
        >
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

          <button
            className="hamburger-menu"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className="main-content">
        <div className="login-card">
          <h1>{isLogin ? t.login : t.createAccount}</h1>

          {generalError && <div className="error-banner">{generalError}</div>}

          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <div className="form-group">
                <label>{t.enterName}</label>
                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  className={nameError ? "error" : ""}
                  disabled={isLoading}
                  autoComplete="name"
                />
                {nameError && (
                  <span className="error-message">{nameError}</span>
                )}
              </div>
            )}

            <div className="form-group">
              <label>{t.enterEmail}</label>
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={emailError ? "error" : ""}
                disabled={isLoading}
                autoComplete="email"
              />
              {emailError && (
                <span className="error-message">{emailError}</span>
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
                  onBlur={handlePasswordBlur}
                  className={passwordError ? "error" : ""}
                  disabled={isLoading}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  disabled={isLoading}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {passwordError && (
                <span className="error-message">{passwordError}</span>
              )}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>{t.confirmPassword}</label>
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t.confirmPasswordPlaceholder}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={handleConfirmPasswordBlur}
                    className={confirmPasswordError ? "error" : ""}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <button
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {confirmPasswordError && (
                  <span className="error-message">{confirmPasswordError}</span>
                )}
              </div>
            )}

            <button className="login-button" type="submit" disabled={isLoading}>
              {isLoading
                ? isLogin
                  ? t.loggingIn
                  : t.registering
                : isLogin
                  ? t.loginButton
                  : t.registerButton}
            </button>
          </form>

          <div className="footer-links">
            <button
              onClick={toggleAuthMode}
              className="toggle-auth-link"
              disabled={isLoading}
            >
              {isLogin ? (
                <>
                  {t.dontHaveAccount} <span>{t.registerHere}</span>
                </>
              ) : (
                <>
                  {t.alreadyHaveAccount} <span>{t.loginHere}</span>
                </>
              )}
            </button>
            {isLogin && <a href="#forgot">{t.forgot}</a>}
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
