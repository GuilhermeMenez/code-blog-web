import { IconProps } from '@/types/iconTypes'

const IconFav = ({ width, height, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 14"
      className={`${className}`}
      style={{ flexShrink: 0, paddingTop: '2px' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
      d="M9.49902 0C9.77498 0.000217914 9.99902 0.223992 9.99902 0.5V12.8662C9.99869 13.0475 9.89981 13.2147 9.74121 13.3027C9.58238 13.3908 9.38746 13.3861 9.2334 13.29L4.99902 10.6445L0.764648 13.29C0.610685 13.386 0.416559 13.3906 0.257812 13.3027C0.0991362 13.2148 0.000331635 13.0476 0 12.8662V0.5C0 0.223858 0.223858 0 0.5 0H9.49902ZM1 11.9629L4.46973 9.79688C4.79388 9.59441 5.20514 9.5944 5.5293 9.79688L8.99902 11.9629V1H1V11.9629Z"
      fill="currentColor"
      />
    </svg>
  )
}

export default IconFav
