import React from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';
import Chip from '@/components/chip';

const visualFilterOptionListRowVariants = cva(
  'cio-components cio-visual-filter-option-list-row cio-filter-multiple-option text-base',
);

export type VisualFilterOptionListRowVariants = VariantProps<
  typeof visualFilterOptionListRowVariants
>;

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
  /** Position of the checkbox. Can be 'left', 'right', or 'none'. Defaults to 'left' */
  checkboxPosition?: 'left' | 'right' | 'none';
  /** Type of visual - 'color' for hex colors, 'image' for image URLs */
  visualType: 'color' | 'image';
  /** The visual value - hex color code or image URL */
  visualValue: string;
}

export type VisualFilterOptionListRowOverrides =
  ComponentOverrideProps<VisualFilterOptionListRowProps>;

export default function VisualFilterOptionListRow({
  className,
  id,
  optionValue,
  displayValue,
  displayCountValue,
  isChecked = false,
  onChange,
  checkboxPosition = 'right',
  visualType,
  visualValue,
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
      checkboxPosition,
      visualType,
      visualValue,
      className,
    }),
    [
      id,
      optionValue,
      displayValue,
      displayCountValue,
      isChecked,
      onChange,
      checkboxPosition,
      visualType,
      visualValue,
      className,
    ],
  );

  const handleChange = () => {
    onChange?.(optionValue);
  };

  const checkboxVisible = checkboxPosition !== 'none';
  const checkboxEl = checkboxVisible && (
    <div className='cio-checkbox'>
      <svg
        width='10'
        height='8'
        viewBox='0 0 10 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='cio-check'>
        <path d='M1 4L3.5 6.5L9 1' stroke='white' strokeWidth='1.7' strokeLinecap='round' />
      </svg>
    </div>
  );

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <li
        data-slot='visual-filter-option-list-row'
        className={cn(visualFilterOptionListRowVariants({ className }))}
        {...props}>
        <label htmlFor={id} className='cio-filter-option-label'>
          {checkboxVisible && (
            <input
              type='checkbox'
              id={id}
              value={optionValue}
              checked={isChecked}
              onChange={handleChange}
              className='cio-filter-option-input'
            />
          )}
          {checkboxPosition === 'left' && checkboxEl}
          <div className='cio-filter-multiple-option-display'>
            <Chip
              type={visualType}
              value={visualValue}
              name={displayValue}
              className='cio-filter-visual-swatch'
            />
            <span className='cio-filter-option-name'>{displayValue}</span>
            {displayCountValue && (
              <span className='cio-filter-option-count'>{displayCountValue}</span>
            )}
          </div>
          {checkboxPosition === 'right' && checkboxEl}
        </label>
      </li>
    </RenderPropsWrapper>
  );
}
