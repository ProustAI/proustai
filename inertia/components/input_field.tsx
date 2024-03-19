import useError from '../hooks/use_error'
import clsx from 'clsx'
import * as React from 'react'

interface InputFieldProps {
  className?: string
  divClassName?: string
  label?: string | React.ReactNode
  labelRight?: React.ReactNode
  id?: string
  type?: string
  placeholder?: string
  required?: boolean
  value?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  readOnly?: boolean
  textarea?: boolean
  optional?: boolean
  rows?: number
}

const InputField: React.FC<InputFieldProps> = ({
  className,
  divClassName,
  label,
  labelRight,
  id,
  type,
  placeholder,
  required,
  value,
  onChange,
  readOnly,
  textarea,
  optional,
  rows,
}) => {
  const error = useError(id)
  return (
    <div className={divClassName}>
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium leading-6 text-black">
            <span>{label}</span>
            {optional && <span className="text-zinc-400 ml-1">(optional)</span>}
          </label>
        )}
        {labelRight}
      </div>
      <div className={label && 'mt-1'}>
        {textarea ? (
          <textarea
            className={clsx(
              'block w-full rounded-md outline-none placeholder-zinc-400 px-3 py-1.5 text-black shadow-sm  border focus:border-transparent border-zinc-300 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-black text-sm sm:leading-6',
              className
            )}
            readOnly={readOnly}
            id={id}
            name={id}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            rows={rows}
          ></textarea>
        ) : (
          <input
            className={clsx(
              'block w-full rounded-md outline-none placeholder-zinc-400 px-3 py-1.5 text-black shadow-sm  border focus:border-transparent border-zinc-300 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-black text-sm sm:leading-6',
              className
            )}
            readOnly={readOnly}
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
          />
        )}
      </div>

      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  )
}

export default InputField
