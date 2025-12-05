import { IconProps } from '@/types/iconTypes'

const IconHome = ({ width, height, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      className={`${className}`}
      style={{ flexShrink: 0 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6056 6.57532V14.55H2.49445V6.57532"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M0.549988 8.39481L8.04999 0.550049L15.55 8.39481"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.05 14.55V9.55005H6.04999V14.55" stroke="currentColor" strokeLinejoin="round" />
    </svg>
  )
}

export default IconHome
