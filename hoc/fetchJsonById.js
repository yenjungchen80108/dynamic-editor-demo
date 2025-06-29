export const fetchJsonById = async (fileName, latestVersionId) => {
  try {
    const response = await fetch("/api/get-latest-config-by-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, latestVersionId }),
    });

    if (!response.ok) throw new Error("Failed to fetch JSON diff");

    const { latestJson } = await response.json();
    return { latestJson };
  } catch (error) {
    console.error("Error fetching JSON diff:", error);
  }
};
