import { useState, useEffect } from "react";
import CloseIcon from "@/container/jsonEditor/components/CloseIcon";
import { ModalContainer } from "../../styles";
import { StyledReqWrapper } from "./styles";
import { useBranches } from "@/container/jsonEditor/hooks/useBranches";
import { useMembers } from "@/container/jsonEditor/hooks/useMembers";

import { PROJECT_PATH } from "@/container/jsonEditor/constant";

const RequestModal = ({ className, onClose, filePath, onSubmit }) => {
  const [projectId, setProjectId] = useState(null);
  const { branches, loading: brLoading } = useBranches(projectId);
  const { members, loading: mbLoading } = useMembers(projectId);

  const [targetBranch, setTargetBranch] = useState("main");
  const [sourceBranch, setSourceBranch] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [mrTitle, setMrTitle] = useState("");
  const [authorId, setAuthorId] = useState(null);

  useEffect(() => {
    async function fetchProjectId() {
      try {
        const res = await fetch(
          `/api/json/get-proj-id?projectPath=${encodeURIComponent(
            PROJECT_PATH
          )}`
        );
        if (!res.ok) throw new Error("getProjectId 失敗");
        const { id } = await res.json();
        setProjectId(id);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProjectId();
    // 因為我們只要在 mount 時跑一次，就把依賴留空
  }, []);

  // 當 targetBranch 改變時，重置 sourceBranch
  useEffect(() => {
    const ts = Date.now();
    setSourceBranch(`${targetBranch}-mr-${ts}`);
  }, [targetBranch]);

  const handleOk = () => {
    const author = members.find((m) => m.id === authorId);
    onSubmit({
      targetBranch,
      sourceBranch,
      commitMessage,
      mrTitle: mrTitle || commitMessage,
      filePath,
      authorName: author?.name || "",
      authorEmail: author?.username + "@gmail.com", // or other mapping
    });
    onClose();
  };

  return (
    <ModalContainer
      className={className}
      border="2px solid #FFEAE8"
      borderRadius="5px"
    >
      <CloseIcon onClose={onClose} />
      <div className="title">發 MR 到遠端</div>
      <StyledReqWrapper>
        <label>目標分支</label>
        {brLoading ? (
          <p>Loading branches...</p>
        ) : (
          <select
            value={targetBranch}
            onChange={(e) => setTargetBranch(e.target.value)}
          >
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        )}

        <label>新來源分支</label>
        <input
          value={sourceBranch}
          onChange={(e) => setSourceBranch(e.target.value)}
        />

        <label>Commit 訊息</label>
        <input
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
          placeholder={`Update ${filePath}`}
        />

        <label>MR 標題</label>
        <input
          value={mrTitle}
          onChange={(e) => setMrTitle(e.target.value)}
          placeholder="Title for MR"
        />

        <label>作者</label>
        {mbLoading ? (
          <p>Loading members...</p>
        ) : (
          <select
            value={authorId ?? undefined}
            onChange={(e) => setAuthorId(Number(e.target.value))}
          >
            <option value="">— 選擇作者 —</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.username})
              </option>
            ))}
          </select>
        )}

        <button
          onClick={handleOk}
          disabled={!commitMessage || !sourceBranch || !authorId}
        >
          送出
        </button>
      </StyledReqWrapper>
    </ModalContainer>
  );
};

export default RequestModal;
