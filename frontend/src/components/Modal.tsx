import React from 'react'
import './modal.css'

const Modal = ({ children, isFormVisible }: { children: React.ReactNode, isFormVisible: boolean }) => {

  const className = isFormVisible ? 'modal modal--visible' : 'modal'

  return (
    <div className={className}>{children}</div>
  )
}

export default Modal