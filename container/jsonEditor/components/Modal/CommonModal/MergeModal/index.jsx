import { useState } from "react";

import CloseIcon from "@/container/jsonEditor/components/CloseIcon";

import { ModalContainer } from "../../styles";

import {
  StyledTableContainer,
  LocalCell,
  RemoteCell,
  ActionCell,
  Footer,
  Button,
  TableWrapper,
} from "./styles";

const MergeModal = ({ className, onClose, title, conflicts, onApply }) => {
  // 初始化選擇為本地
  const [selected, setSelected] = useState(
    conflicts.reduce((acc, c) => ({ ...acc, [c.path]: "local" }), {})
  );

  const handleSelect = (path, side) => {
    setSelected((prev) => ({ ...prev, [path]: side }));
  };

  const handleApply = () => {
    // 根據選擇匯出合併結果
    const result = conflicts.reduce((acc, c) => {
      // eslint-disable-next-line no-param-reassign
      acc[c.path] = selected[c.path] === "local" ? c.local : c.remote;
      return acc;
    }, {});
    onApply(result);
    // console.log('result', result)
    onClose();
  };

  return (
    <ModalContainer
      className={className}
      border="2px solid #FFEAE8"
      borderRadius="5px"
    >
      <CloseIcon onClose={onClose} />
      {title && <div className="title">{title}</div>}
      <div className="content">
        <TableWrapper>
          <StyledTableContainer>
            <thead>
              <tr>
                <th>Path</th>
                <th>Local</th>
                <th>Remote</th>
                <th>使用</th>
              </tr>
            </thead>
            <tbody>
              {conflicts.map((c) => (
                <tr key={c.path}>
                  <td>{c.path}</td>
                  <LocalCell>{JSON.stringify(c.local)}</LocalCell>
                  <RemoteCell>{JSON.stringify(c.remote)}</RemoteCell>
                  <ActionCell>
                    <label>
                      <input
                        type="radio"
                        name={c.path}
                        checked={selected[c.path] === "local"}
                        onChange={() => handleSelect(c.path, "local")}
                      />{" "}
                      本地
                    </label>
                    <label style={{ marginLeft: "8px" }}>
                      <input
                        type="radio"
                        name={c.path}
                        checked={selected[c.path] === "remote"}
                        onChange={() => handleSelect(c.path, "remote")}
                      />{" "}
                      遠端
                    </label>
                  </ActionCell>
                </tr>
              ))}
            </tbody>
          </StyledTableContainer>
        </TableWrapper>
        <Footer>
          <Button onClick={onClose}>取消</Button>
          <Button primary onClick={handleApply}>
            確認合併
          </Button>
        </Footer>
      </div>
    </ModalContainer>
  );
};

export default MergeModal;
