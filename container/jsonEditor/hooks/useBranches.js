import { useState, useEffect } from "react";

export function useBranches(projectId) {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    setError(null);

    fetch(`/api/json/get-branches?projectId=${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load branches: ${res.status}`);
        return res.json();
      })
      .then(setBranches)
      .catch((e) => {
        console.error(e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  return { branches, loading, error };
}
