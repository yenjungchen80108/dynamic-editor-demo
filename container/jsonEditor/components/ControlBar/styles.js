import styled from 'styled-components'

export const BarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: 12px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.lightGrey}; /* #F5F5F5 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`

export const ActionButton = styled.button`
  padding: 6px 14px;
  background: ${({ theme, disabled }) => (disabled ? theme.colors.lightGrey : theme.colors.white)};
  color: ${({ theme, disabled }) => (disabled ? theme.colors.grey : theme.colors.black)};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background: ${({ theme, disabled }) => (disabled ? theme.colors.lightGrey : theme.colors.lightGrey)};
  }
`
