import React, { ReactNode } from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';

const filterOptionListRowVariants = cva(
  'cio-components cio-filter-option-list-row cio-filter-multiple-option',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export type FilterOptionListRowVariants = VariantProps<typeof filterOptionListRowVariants>;

export interface FilterOptionListRowProps
  extends Omit<React.ComponentProps<'li'>, 'onChange' | 'children'>,
    FilterOptionListRowVariants,
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
  onChange?: (value: string) => void;
  /** Whether to show the checkbox indicator */
  showCheckbox?: boolean;
  /** Optional content to render before the display value (e.g., color swatch) */
  startContent?: ReactNode;
  /** Optional children to render inside the component */
  children?: ReactNode;
}

export type FilterOptionListRowOverrides = ComponentOverrideProps<FilterOptionListRowProps>;

export default function FilterOptionListRow({
  className,
  size,
  id,
  optionValue,
  displayValue,
  displayCountValue,
  isChecked = false,
  onChange,
  showCheckbox = true,
  startContent,
  componentOverrides,
  children,
  ...props
}: FilterOptionListRowProps) {
  const renderProps = React.useMemo(
    () => ({
      id,
      optionValue,
      displayValue,
      displayCountValue,
      isChecked,
      onChange,
      showCheckbox,
      startContent,
      size,
      className,
      ...props,
    }),
    [id, optionValue, displayValue, displayCountValue, isChecked, onChange, showCheckbox, startContent, size, className, props],
  );

  const handleChange = () => {
    onChange?.(optionValue);
  };

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <li
        data-slot='filter-option-list-row'
        className={cn(filterOptionListRowVariants({ size, className }))}
        {...props}>
        <label htmlFor={id} className='cio-filter-option-label'>
          <input
            type='checkbox'
            id={id}
            value={optionValue}
            checked={isChecked}
            onChange={handleChange}
            className='cio-filter-option-input'
          />
          {showCheckbox && (
            <div className='cio-checkbox'>
              <svg
                width='10'
                height='8'
                viewBox='0 0 10 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='cio-check'>
                <path
                  d='M1 4L3.5 6.5L9 1'
                  stroke='white'
                  strokeWidth='1.7'
                  strokeLinecap='round'
                />
              </svg>
            </div>
          )}
          <div className='cio-filter-multiple-option-display'>
            {startContent}
            <span className='cio-filter-option-name'>{displayValue}</span>
            {displayCountValue && (
              <span className='cio-filter-option-count'>{displayCountValue}</span>
            )}
          </div>
        </label>
        {children}
      </li>
    </RenderPropsWrapper>
  );
}
