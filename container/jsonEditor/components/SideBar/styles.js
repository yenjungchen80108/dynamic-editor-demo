import styled from 'styled-components'

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .file-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 100vh;
    overflow-y: auto;
  }
`

const buttonBase = styled.button`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  text-align: left;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background: ${({ theme }) => theme.colors.lightGrey};

    &:disabled {
      background: ${({ theme }) => theme.colors.lightGrey};
      cursor: not-allowed;
    }
  }
`

export const FolderButton = styled(buttonBase)``
export const FileButton = styled(buttonBase)`
  margin-left: 16px;
`
export const BackButton = styled(buttonBase)`
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.darkGrey};
  &:disabled {
    color: ${({ theme }) => theme.colors.disabledGrey};
  }
`
export const Breadcrumb = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 8px;
`
