export default async function handler(req, res) {
  try {
    const { projectPath } = req.query;
    if (!projectPath)
      return res.status(400).json({ error: "projectPath required" });

    const token = process.env.GITLAB_TOKEN; // in Vercel / .env.local
    const gitlabUrl = `https://gitlab.com/api/v4/projects/${encodeURIComponent(projectPath)}`;

    const gitlabRes = await fetch(gitlabUrl, {
      headers: { "PRIVATE-TOKEN": token },
    });

    if (!gitlabRes.ok) {
      const err = await gitlabRes.text();
      return res.status(gitlabRes.status).json({ error: err });
    }

    const project = await gitlabRes.json();
    return res.status(200).json({ id: project.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
