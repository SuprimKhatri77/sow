export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const authApi = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data;
  },

  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data;
  },
};

export const apiClient = {
  get: async (endpoint, token) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        window.location.href = "/";
        throw new Error("Session expired");
      }
      throw new Error("Request failed");
    }

    return response.json();
  },

  post: async (endpoint, data, token) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        window.location.href = "/";
        throw new Error("Session expired");
      }
      throw new Error("Request failed");
    }

    return response.json();
  },
};

export const languageApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/languages`);
    if (!response.ok) {
      throw new Error("Failed to fetch languages");
    }
    const data = await response.json();
    return data;
  },
};
