export const fetchLatestVersionId = async () => {
  try {
    const response = await fetch("/api/list-object-versions");
    const data = await response.json();

    const versionId = data[0]?.VersionId;

    return versionId;
  } catch (error) {
    console.error("Error getting latest version ID:", error);
  }
};
