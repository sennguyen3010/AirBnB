import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import React from 'react'

type Props = {
    children:ReactJSXElement
}

export default function PopperWrapper({children}: Props) {
  return (
    <div className='popper-wrapper'>{children}</div>
  )
}