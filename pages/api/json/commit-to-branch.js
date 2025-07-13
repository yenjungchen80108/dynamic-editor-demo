export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const {
      projectId,
      branch,
      commitMessage,
      filePath,
      content,
      authorName,
      authorEmail,
    } = req.body;
    if (!projectId || !branch || !commitMessage || !filePath) {
      return res.status(400).json({ error: "missing parameters" });
    }

    const token = process.env.GITLAB_TOKEN;
    const url = `https://gitlab.com/api/v4/projects/${projectId}/repository/commits`;

    const payload = {
      branch,
      commit_message: commitMessage,
      actions: [
        {
          action: "update",
          file_path: filePath,
          content,
        },
      ],
      ...(authorName ? { author_name: authorName } : {}),
      ...(authorEmail ? { author_email: authorEmail } : {}),
    };

    const gitlabRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PRIVATE-TOKEN": token,
      },
      body: JSON.stringify(payload),
    });

    if (!gitlabRes.ok) {
      const err = await gitlabRes.text();
      return res.status(gitlabRes.status).json({ error: err });
    }

    const data = await gitlabRes.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
