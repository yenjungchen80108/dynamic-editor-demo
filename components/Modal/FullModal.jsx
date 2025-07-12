import { useEffect } from 'react'

import { StyledCloseButton, StyledContainer, StyledDefaultCloseIcon } from './Modal.styles'
/**
 *
 * @param {Object} param - 傳入 modal 參數
 * @param {boolean} param.isOpen - 是否顯示彈窗
 * @param {onClose} param.onClose - 點擊關閉按鈕的 callback
 * @param {React.Node} param.closeIcon - close icon，傳入客製化的 close icon
 * @param {React.Node} param.disableEscapeKeyDown - 禁止使用 esc 關閉彈窗
 * @returns
 */

const FullModal = ({
  children,
  isOpen,
  onClose,
  isDefaultStyleButton = true,
  className,
  closeIcon = <StyledDefaultCloseIcon />,
  disableEscapeKeyDown = false,
}) => {
  useEffect(() => {
    if (disableEscapeKeyDown) return () => {}

    const handleEscClick = (e) => {
      if (e.code === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscClick)

    return () => {
      document.removeEventListener('keydown', handleEscClick)
    }
  }, [disableEscapeKeyDown, isOpen, onClose])

  if (!isOpen) return null

  return (
    <StyledContainer className={className}>
      {isDefaultStyleButton && <StyledCloseButton onClick={onClose}>{closeIcon}</StyledCloseButton>}
      {children}
    </StyledContainer>
  )
}

export default FullModal
