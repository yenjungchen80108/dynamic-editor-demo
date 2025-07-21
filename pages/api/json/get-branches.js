export default async function handler(req, res) {
  const { projectId } = req.query;
  const token = process.env.GITLAB_TOKEN;

  if (!projectId || Array.isArray(projectId)) {
    return res.status(400).json({ error: "Missing projectId" });
  }

  try {
    const resp = await fetch(
      `https://gitlab.com/api/v4/projects/${encodeURIComponent(projectId)}/repository/branches`,
      {
        headers: { "PRIVATE-TOKEN": token || "" },
      }
    );
    if (!resp.ok) {
      throw new Error(
        `GitLab branches failed: ${resp.status} ${resp.statusText}`
      );
    }
    const data = await resp.json();
    const names = data.map((b) => b.name);
    return res.status(200).json(names);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
