import { useEffect } from 'react'

import Animation from '../Animation'

import {
  StyledBackdrop,
  StyledCloseButton,
  StyledContainer,
  StyledModalSection,
  StyledDefaultCloseIcon,
} from './Modal.styles'

/**
 *
 * @param {Object} modal - 傳入 modal 參數
 * @param {Boolean} param.isOpen - 是否顯示彈窗
 * @param {onClose} param.onClose - 點擊關閉按鈕的 callback
 * @param {Boolean} param.isBackdrop - 是否顯示可掛上事件的 Backdrop (預設：false)
 * @param {Boolean} param.isDefaultStyleButton - 是否使用預設樣式的關閉彈窗按鈕 (預設：true)
 * @param {React.Node} param.closeIcon - close icon，傳入客製化的 close icon
 * @param {Number} param.width - 設定 modal section 的 width
 * @param {string} param.overflowY - 設定 modal section overflow 時的行為
 * @param {Number} param.marginTop - 設定 modal section 的 margin-top
 * @returns
 */

const Modal = ({
  children,
  isOpen,
  onClose,
  isBackdrop = false,
  isDefaultStyleButton = true,
  closeIcon = <StyledDefaultCloseIcon />,
  width,
  overflowY,
  marginTop,
  modalSectionClass = '',
  containerClass = '',
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    if (!isOpen) document.body.style.overflow = 'visible'
  }, [isOpen])

  return (
    <Animation animation="backdrop" isIn={isOpen}>
      <StyledContainer className={containerClass}>
        {isBackdrop && <StyledBackdrop onClick={onClose} />}
        <Animation animation="reveal" isIn={isOpen}>
          <StyledModalSection className={modalSectionClass} width={width} overflowY={overflowY} marginTop={marginTop}>
            {isDefaultStyleButton && <StyledCloseButton onClick={onClose}>{closeIcon}</StyledCloseButton>}
            {children}
          </StyledModalSection>
        </Animation>
      </StyledContainer>
    </Animation>
  )
}

export default Modal
