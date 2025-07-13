// hooks/useGitLab.js
import { useCallback } from "react";

export function useGitLab() {
  const commitAndOpenMR = useCallback(
    async ({
      projectPath,
      targetBranch,
      sourceBranch,
      commitMessage,
      filePath,
      content,
      mrTitle,
      authorName,
      authorEmail,
    }) => {
      // 1. 拿 projectId
      let res = await fetch(
        `/api/json/get-proj-id?projectPath=${encodeURIComponent(projectPath)}`
      );
      if (!res.ok) throw new Error("getProjectId 失敗");
      const { id: projectId } = await res.json();

      // 2. 建立 branch
      res = await fetch("/api/json/create-branch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          branchName: sourceBranch,
          ref: targetBranch,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "createBranch 失敗");
      }

      // 3. Commit 到新 branch
      res = await fetch("/api/json/commit-to-branch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          branch: sourceBranch,
          commitMessage,
          filePath,
          content,
          authorName,
          authorEmail,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "commitToBranch 失敗");
      }

      // 4. 開 MR 頁面
      const url = new URL(
        `https://gitlab.com/${projectPath}/-/merge_requests/new`
      );
      url.searchParams.set("merge_request[source_branch]", sourceBranch);
      url.searchParams.set("merge_request[target_branch]", targetBranch);
      url.searchParams.set("merge_request[title]", mrTitle);
      window.open(url.toString(), "_blank");
    },
    []
  );

  return { commitAndOpenMR };
}
