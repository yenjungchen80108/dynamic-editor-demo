import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 90%;
  overflow-x: scroll;
  margin-top: 16px;
`;

export const StyledTableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* min-width: 300px; */

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    vertical-align: top;
  }

  th {
    background: #f4f4f4;
    text-align: left;
  }
`;

export const LocalCell = styled.td`
  background-color: #ffecec;
  color: #a94442;
`;

export const RemoteCell = styled.td`
  background-color: #ecffec;
  color: #3c763d;
`;

export const ActionCell = styled.td`
  text-align: center;
  white-space: nowrap;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  margin-left: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${(props) => (props.primary ? "#4caf50" : "#f5f5f5")};
  color: ${(props) => (props.primary ? "#fff" : "#333")};
  &:hover {
    opacity: 0.9;
  }
`;
