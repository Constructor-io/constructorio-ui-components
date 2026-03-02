import React, { ReactNode } from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
const baseClasses =
  'cio-components cio-filter-option-list-row cio-filter-multiple-option group cursor-pointer flex list-none text-base hover:bg-neutral-100 hover:rounded';

export interface FilterOptionListRowProps
  extends Omit<React.ComponentProps<'li'>, 'onChange' | 'children'>,
    IncludeComponentOverrides<FilterOptionListRowOverrides> {
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

export type FilterOptionListRowOverrides = ComponentOverrideProps<FilterOptionListRowProps>;

export default function FilterOptionListRow({
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
}: FilterOptionListRowProps) {
  const checkboxVisible = checkboxPosition !== 'none';
  const checkboxEl = checkboxVisible && (
    <div className='cio-checkbox flex justify-center items-center cursor-pointer mx-2 bg-white w-5 h-5 min-w-5 min-h-5 rounded transition-all duration-250 border border-black/20 group-has-[input:checked]:shadow-[inset_0_0_0_32px_#000]'>
      <svg
        width='10'
        height='8'
        viewBox='0 0 10 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='cio-check opacity-0 transition-opacity duration-250 group-has-[input:checked]:opacity-100'>
        <path d='M1 4L3.5 6.5L9 1' stroke='white' strokeWidth='1.7' strokeLinecap='round' />
      </svg>
    </div>
  );

  return (
    <RenderPropsWrapper
      props={{
        id,
        optionValue,
        displayValue,
        displayCountValue,
        isChecked,
        onChange,
        checkboxPosition,
        startContent,
        className,
      }}
      override={componentOverrides?.reactNode}>
      <li data-slot='filter-option-list-row' className={cn(baseClasses, className)} {...props}>
        <label
          htmlFor={id}
          className='cio-filter-option-label text-sm flex flex-row items-center cursor-pointer grow p-1'>
          <input
            type='checkbox'
            id={id}
            value={optionValue}
            checked={isChecked}
            onChange={() => onChange(optionValue)}
            className='cio-filter-option-input hidden'
          />
          {checkboxPosition === 'left' && checkboxEl}
          <div className='cio-filter-multiple-option-display flex flex-row justify-between w-full items-center'>
            {startContent}
            <span className='cio-filter-option-name grow break-words'>{displayValue}</span>
            {displayCountValue && (
              <span className='cio-filter-option-count text-gray-400 ml-2'>
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
