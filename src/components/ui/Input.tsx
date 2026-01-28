import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

import { SearchIcon } from '@/assets/icons/SearchIcon'
import { Field } from '@base-ui/react/field'

export const inputVariants = tv({
  base: [
    'flex items-center gap-3 text-md rounded-sm bg-black-20 text-white-40'
  ],
  variants: {
    variant: {
      text: [
        'h-9.5 px-3',
        'focus-within:ring-1 focus-within:ring-white-20',
        'data-invalid:focus-within:ring-danger-40',
      ],
      search: [
        'h-11 px-4 [&_svg]:size-4.5',
        'focus-visible-within:ring-1 focus-visible-within:ring-white-20',
      ],
    },
  },
  defaultVariants: {
    variant: 'text',
  },
})

export const inputIconVariants = tv({
  base: 'order-first flex items-center justify-center text-slate-50 peer-focus:text-white-40',
})

export const inputControlVariants = tv({
  base: 'peer w-full h-full bg-transparent outline-none text-white-40 placeholder:text-slate-50',
})

export interface InputProps
  extends
    Omit<ComponentProps<typeof Field.Control>, 'className'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  // icon?: ReactNode
  className?: string
}

export function Input({
  className,
  variant = 'text',
  label,
  error,
  disabled,
  name,
  ...props
}: InputProps) {
  const hasError = Boolean(error)
  const isSearch = variant === 'search'

  return (
    <Field.Root
      name={name}
      className="w-full data-disabled:pointer-events-none data-disabled:opacity-50"
      disabled={disabled}
      invalid={hasError}
    >
      {label && (
        <Field.Label
          data-slot="input-label"
          className="block mb-1 text-sm font-medium text-white-20"
        >
          {label}
        </Field.Label>
      )}

      <div data-slot="input-wrapper" className={twMerge(inputVariants({ variant }), className)}>
        <Field.Control data-slot="input" className={inputControlVariants()} {...props} />

        {isSearch && <span className={inputIconVariants()}>{<SearchIcon />}</span>}
      </div>

      {hasError && (
        <Field.Error data-slot="input-error" className="mt-1 text-xs text-danger-40">
          {error}
        </Field.Error>
      )}
    </Field.Root>
  )
}
