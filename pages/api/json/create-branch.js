export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { projectId, branchName, ref } = req.body;
  if (!projectId || !branchName || !ref) {
    return res.status(400).json({ error: "參數不足" });
  }

  const token = process.env.GITLAB_TOKEN;
  const url = `https://gitlab.com/api/v4/projects/${projectId}/repository/branches?branch=${encodeURIComponent(branchName)}&ref=${encodeURIComponent(ref)}`;

  const gitlabRes = await fetch(url, {
    method: "POST",
    headers: { "PRIVATE-TOKEN": token },
  });

  if (!gitlabRes.ok) {
    const err = await gitlabRes.text();
    return res.status(gitlabRes.status).json({ error: err });
  }

  return res.status(200).json({ success: true });
}
