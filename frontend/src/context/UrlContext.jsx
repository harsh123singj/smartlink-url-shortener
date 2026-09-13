import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const UrlContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;
export const UrlProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();

  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GET USER URLs
  // ==========================================

  const fetchUrls = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/urls`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch URLs"
        );
      }

      setUrls(data.urls || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CREATE URL
  // ==========================================

  const createUrl = async ({
    originalUrl,
    customAlias,
    expiresAt,
  }) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(
      `${API_URL}/urls`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originalUrl,
          ...(customAlias && { customAlias }),
          ...(expiresAt && { expiresAt }),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to create URL"
      );
    }

    await fetchUrls();

    return data;
  };

  // ==========================================
  // DELETE URL
  // ==========================================

  const deleteUrl = async (id) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(
      `${API_URL}/urls/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete URL"
      );
    }

    setUrls((currentUrls) =>
      currentUrls.filter((url) => url._id !== id)
    );

    return data;
  };

  // ==========================================
  // UPDATE URL
  // ==========================================

  const updateUrl = async (id, updates) => {
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(
      `${API_URL}/urls/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update URL"
      );
    }

    setUrls((currentUrls) =>
      currentUrls.map((url) =>
        url._id === id ? data.url : url
      )
    );

    return data;
  };

  // ==========================================
  // FETCH WHEN AUTHENTICATED
  // ==========================================

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchUrls();
    } else {
      setUrls([]);
    }
  }, [isAuthenticated, token]);

  return (
    <UrlContext.Provider
      value={{
        urls,
        loading,
        error,
        fetchUrls,
        createUrl,
        updateUrl,
        deleteUrl,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const useUrls = () => {
  return useContext(UrlContext);
};