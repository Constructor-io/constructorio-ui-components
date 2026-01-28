import React from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';
import Chip from './chip';

const visualFilterOptionListRowVariants = cva(
  'cio-components cio-visual-filter-option-list-row cio-filter-multiple-option',
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

export type VisualFilterOptionListRowVariants = VariantProps<typeof visualFilterOptionListRowVariants>;

export interface VisualFilterOptionListRowProps
  extends Omit<React.ComponentProps<'li'>, 'onChange' | 'children'>,
    VisualFilterOptionListRowVariants,
    IncludeComponentOverrides<VisualFilterOptionListRowOverrides> {
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
  /** Type of visual - 'color' for hex colors, 'image' for image URLs */
  visualType: 'color' | 'image';
  /** The visual value - hex color code or image URL */
  visualValue: string;
  /** Size of the visual swatch */
  visualSize?: 'sm' | 'md' | 'lg';
}

export type VisualFilterOptionListRowOverrides = ComponentOverrideProps<VisualFilterOptionListRowProps>;

export default function VisualFilterOptionListRow({
  className,
  size,
  id,
  optionValue,
  displayValue,
  displayCountValue,
  isChecked = false,
  onChange,
  showCheckbox = true,
  visualType,
  visualValue,
  visualSize = 'md',
  componentOverrides,
  ...props
}: VisualFilterOptionListRowProps) {
  const renderProps = React.useMemo(
    () => ({
      id,
      optionValue,
      displayValue,
      displayCountValue,
      isChecked,
      onChange,
      showCheckbox,
      visualType,
      visualValue,
      visualSize,
      size,
      className,
      ...props,
    }),
    [id, optionValue, displayValue, displayCountValue, isChecked, onChange, showCheckbox, visualType, visualValue, visualSize, size, className, props],
  );

  const handleChange = () => {
    onChange?.(optionValue);
  };

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <li
        data-slot='visual-filter-option-list-row'
        className={cn(visualFilterOptionListRowVariants({ size, className }))}
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
            <Chip
              type={visualType}
              value={visualValue}
              name={displayValue}
              size={visualSize}
              className='cio-filter-visual-swatch'
            />
            <span className='cio-filter-option-name'>{displayValue}</span>
            {displayCountValue && (
              <span className='cio-filter-option-count'>{displayCountValue}</span>
            )}
          </div>
        </label>
      </li>
    </RenderPropsWrapper>
  );
}
