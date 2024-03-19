import useError from '../hooks/use_error.js'
import clsx from 'clsx'
import * as React from 'react'

interface SelectFieldProps {
  className?: string
  divClassName?: string
  label?: string | React.ReactNode
  labelRight?: React.ReactNode
  id?: string
  value?: string | number
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  options?: { value: string; label: string }[]
}

const SelectField: React.FC<SelectFieldProps> = ({
  className,
  divClassName,
  label,
  labelRight,
  id,
  options,
  value,
  onChange,
}) => {
  const error = useError(id)
  return (
    <div className={divClassName}>
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium leading-6 text-black">
            {label}
          </label>
        )}
        {labelRight}
      </div>
      <div className={label && 'mt-1'}>
        <select
          className={clsx(
            'block cursor-pointer w-full rounded-md outline-none placeholder-zinc-400 px-3 py-1.5 text-black shadow-sm  border focus:border-transparent border-zinc-300 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-black text-sm sm:leading-6',
            className
          )}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value} selected={option.value === value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  )
}

export default SelectField
