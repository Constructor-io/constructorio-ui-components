import React, { ReactNode } from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
const baseClasses =
  'cio-components cio-filter-option cio-filter-multiple-option cio:group cio:cursor-pointer cio:flex cio:list-none cio:text-base cio:hover:bg-neutral-100 cio:hover:rounded';

export interface FilterOptionProps
  extends Omit<React.ComponentProps<'li'>, 'onChange' | 'children'>,
    IncludeComponentOverrides<FilterOptionOverrides> {
  /** Unique identifier for the filter option */
  id: string;
  /** Value to be used when the option is selected */
  optionValue: string;
  /** Display text for the option */
  displayValue: string;
  /** Count to display (e.g., "1572") */
  displayCountValue?: string;
  /** Whether the option is currently selected */
  isChecked?: boolean;
  /** Callback when option selection changes */
  onChange: (value: string) => void;
  /** Position of the checkbox. Can be 'left', 'right', or 'none'. Defaults to 'left' */
  checkboxPosition?: 'left' | 'right' | 'none';
  /** Optional content to render before the display value (e.g., color swatch) */
  startContent?: ReactNode;
  /** Optional children to render inside the component */
  children?: ReactNode;
}

export type FilterOptionOverrides = ComponentOverrideProps<FilterOptionProps>;

export default function FilterOption({
  className,
  id,
  optionValue,
  displayValue,
  displayCountValue,
  isChecked = false,
  onChange,
  checkboxPosition = 'left',
  startContent,
  componentOverrides,
  children,
  ...props
}: FilterOptionProps) {
  const renderProps = React.useMemo(
    () => ({
      ...props,
      id,
      optionValue,
      displayValue,
      displayCountValue,
      isChecked,
      onChange,
      checkboxPosition,
      startContent,
      className,
    }),
    [
      props,
      id,
      optionValue,
      displayValue,
      displayCountValue,
      isChecked,
      onChange,
      checkboxPosition,
      startContent,
      className,
    ],
  );

  const checkboxVisible = checkboxPosition !== 'none';
  const checkboxEl = checkboxVisible && (
    <div className='cio-checkbox cio:flex cio:justify-center cio:items-center cio:cursor-pointer cio:mx-2 cio:bg-white cio:w-5 cio:h-5 cio:min-w-5 cio:min-h-5 cio:rounded cio:transition-all cio:duration-250 cio:border cio:border-black/20 cio:group-has-[input:checked]:shadow-[inset_0_0_0_32px_#000]'>
      <svg
        width='10'
        height='8'
        viewBox='0 0 10 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='cio-check cio:opacity-0 cio:transition-opacity cio:duration-250 cio:group-has-[input:checked]:opacity-100'>
        <path d='M1 4L3.5 6.5L9 1' stroke='white' strokeWidth='1.7' strokeLinecap='round' />
      </svg>
    </div>
  );

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <li data-slot='filter-option' className={cn(baseClasses, className)} {...props}>
        <label
          htmlFor={id}
          className='cio-filter-option-label cio:text-sm cio:flex cio:flex-row cio:items-center cio:cursor-pointer cio:grow cio:p-1'>
          <input
            type='checkbox'
            id={id}
            value={optionValue}
            checked={isChecked}
            onChange={() => onChange(optionValue)}
            className='cio-filter-option-input cio:hidden'
          />
          {checkboxPosition === 'left' && checkboxEl}
          <div className='cio-filter-multiple-option-display cio:flex cio:flex-row cio:justify-between cio:w-full cio:items-center'>
            {startContent}
            <span className='cio-filter-option-name cio:grow cio:break-words'>{displayValue}</span>
            {displayCountValue && (
              <span className='cio-filter-option-count cio:text-gray-400 cio:ml-2'>
                {displayCountValue}
              </span>
            )}
          </div>
          {checkboxPosition === 'right' && checkboxEl}
        </label>
        {children}
      </li>
    </RenderPropsWrapper>
  );
}
