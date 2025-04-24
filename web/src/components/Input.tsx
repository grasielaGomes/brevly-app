import { FC, InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: boolean
  hintIcon?: ReactNode
}

export const Input: FC<InputProps> = ({
  label,
  hint,
  hintIcon,
  error = false,
  disabled = false,
  className,
  id,
  ...props
}) => {
  const inputBaseClasses =
    'w-full rounded-md border px-4 py-3 text-sm placeholder-gray-400 focus:outline-none transition-colors duration-200'

  const inputStateClasses = clsx({
    'bg-gray-100 cursor-not-allowed border-gray-300 text-gray-500': disabled,
    'border-danger focus:ring-1 focus:ring-danger focus:ring-inset':
      error && !disabled,
    'border-gray-300 focus:border-blue-base focus:ring-1 focus:ring-blue-base focus:ring-inset':
      !error && !disabled,
  })

  const inputClasses = clsx(inputBaseClasses, inputStateClasses, className)

  const labelBaseClasses = 'block mb-1 text-[10px] font-medium uppercase'

  const labelStateClasses = clsx({
    'text-danger': error,
    'text-gray-400 group-focus-within:text-blue-base': !error,
  })

  const labelClasses = clsx(labelBaseClasses, labelStateClasses)

  return (
    <div className="w-full group text-left">
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input id={id} disabled={disabled} className={inputClasses} {...props} />
      {hint && (
        <div className="mt-1.5 ml-1 flex items-center text-[10px] text-gray-400">
          {hintIcon && (
            <span className={error ? 'text-danger' : 'text-gray-400'}>
              {hintIcon}
            </span>
          )}
          <span className="ml-1">{hint}</span>
        </div>
      )}
    </div>
  )
}
