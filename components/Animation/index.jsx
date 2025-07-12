import React, { useEffect, useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

/**
 *
 * @param {React.ReactElement} param.children
 * @param {string} param.animation - animation type
 * @param {number} param.duration - animation duration
 * @param {boolean} param.isIn - Show the component; triggers the enter or exit states
 * @param {boolean} param.unmountOnExit - remove children element if isIn is equal to false
 * @param {() => void} param.onEntered - Callback fired after the "entered" status is applied
 * @param {() => void} param.onExited - Callback fired after the "exited" status is applied
 * @returns
 */

const Animation = ({ children, animation, duration = 250, isIn = true, unmountOnExit = true, onExited, onEntered }) => {
  const [isStart, setIsStart] = useState(false)
  const nodeRef = useRef(null)

  useEffect(() => {
    if (!isStart && isIn) {
      setIsStart(true)
    }

    if (!isIn) {
      setIsStart(false)
    }
  }, [isIn, isStart])

  const handleExited = () => {
    onExited?.()
  }

  const getChildren = () => {
    let currentChildren = children

    if (typeof children !== 'function' && React.isValidElement(children)) {
      const {
        props: { style = {} },
      } = children

      currentChildren = React.cloneElement(children, {
        ref: nodeRef,
        style: {
          ...{
            '--webkit-animation-duration': `${duration}ms`,
            animationDuration: `${duration}ms`,
          },
          ...style,
        },
      })
    }

    return currentChildren
  }

  return (
    <CSSTransition
      in={isStart}
      classNames={animation}
      timeout={duration}
      onExited={handleExited}
      onEntered={onEntered}
      unmountOnExit={unmountOnExit}
      nodeRef={nodeRef}
    >
      {getChildren()}
    </CSSTransition>
  )
}

export default Animation
