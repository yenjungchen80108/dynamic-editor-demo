import styled from 'styled-components'

export const EditorContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 16px;
  border-radius: 4px;
  margin: 16px;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 100vh;
  font-family: monospace;
  background: ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  padding: 12px;
  border-radius: 4px;
  resize: vertical;

  &:disabled {
    background: ${({ theme }) => theme.colors.lightGrey};
    color: ${({ theme }) => theme.colors.disabledGrey};
  }
`
