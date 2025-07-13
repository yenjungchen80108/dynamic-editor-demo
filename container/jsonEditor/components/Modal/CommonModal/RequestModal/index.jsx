import { useState, useEffect } from "react";
import CloseIcon from "@/container/jsonEditor/components/CloseIcon";
import { ModalContainer } from "../../styles";
import { StyledReqWrapper } from "./styles";

const RequestModal = ({ className, onClose, filePath, onSubmit }) => {
  // 1. 用戶輸入目標分支
  const [targetBranch, setTargetBranch] = useState("main");
  // 2. 來源分支自動生成：target + 時間戳，也可讓用戶覆蓋
  const [sourceBranch, setSourceBranch] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [mrTitle, setMrTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  // 當 targetBranch 改變時，重置 sourceBranch
  useEffect(() => {
    const ts = Date.now();
    setSourceBranch(`${targetBranch}-mr-${ts}`);
  }, [targetBranch]);

  const handleOk = () => {
    onSubmit({
      targetBranch,
      sourceBranch,
      commitMessage,
      mrTitle: mrTitle || commitMessage,
      filePath,
      authorName,
      authorEmail,
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
        <input
          value={targetBranch}
          onChange={(e) => setTargetBranch(e.target.value)}
          placeholder="e.g. main"
        />

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

        <label>作者名稱</label>
        <input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="e.g. jane doe"
        />

        <label>作者 Email</label>
        <input
          value={authorEmail}
          onChange={(e) => setAuthorEmail(e.target.value)}
          placeholder="e.g. jane@example.com"
        />

        <button onClick={handleOk} disabled={!commitMessage || !sourceBranch}>
          送出
        </button>
      </StyledReqWrapper>
    </ModalContainer>
  );
};

export default RequestModal;
