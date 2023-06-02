/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react'

const Button = ({
  text, style
}) => {
  return (
    <button type='button' className={`${style} uppercase text-black bg-transparent border border-main-100 rounded-full cursor-pointer py-1 px-4`}>
      {text}
    </button>
  )
}

export default memo(Button)