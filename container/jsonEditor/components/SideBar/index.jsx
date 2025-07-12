import { useState } from "react";

import { useTree } from "../../hooks/useTree";

import {
  SidebarContainer,
  Breadcrumb,
  FolderButton,
  FileButton,
  BackButton,
} from "./styles";

const Sidebar = ({ onFileSelect }) => {
  const [prefix, setPrefix] = useState("config/"); // 目前在第幾層資料夾
  const { folders, files } = useTree(prefix);

  return (
    <SidebarContainer>
      {prefix && (
        <BackButton
          onClick={() => {
            const parts = prefix.split("/").filter(Boolean);
            parts.pop();
            const parent = parts.length ? parts.join("/") + "/" : "";
            setPrefix(parent);
            onFileSelect(null);
          }}
          disabled={prefix === "config/"}
        >
          ← Back
        </BackButton>
      )}
      <Breadcrumb>{prefix || "/"}</Breadcrumb>
      <div className="file-list">
        {folders.map((folder) => (
          <FolderButton
            key={folder}
            onClick={() => {
              setPrefix(folder);
              onFileSelect(null);
            }}
          >
            📁 {folder.replace(prefix, "").replace(/\/$/, "")}
          </FolderButton>
        ))}
        {files.map((file) => (
          <FileButton key={file} onClick={() => onFileSelect(file)}>
            📄 {file.replace(prefix, "")}
          </FileButton>
        ))}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
