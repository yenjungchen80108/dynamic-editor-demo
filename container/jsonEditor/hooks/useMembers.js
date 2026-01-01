import { useState, useEffect } from "react";

export function useMembers(projectId) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    setError(null);

    fetch(`/api/json/get-members?projectId=${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load members: ${res.status}`);
        return res.json();
      })
      .then(setMembers)
      .catch((e) => {
        console.error(e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  return { members, loading, error };
}
