import React from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';
import Chip from '@/components/chip';

const visualFilterOptionListRowVariants = cva(
  'cio-components cio-visual-filter-option-list-row cio-filter-multiple-option group cursor-pointer flex list-none text-base hover:bg-neutral-100 hover:rounded',
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
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <li
        data-slot='visual-filter-option-list-row'
        className={cn(visualFilterOptionListRowVariants({ className }))}
        {...props}>
        <label
          htmlFor={id}
          className='cio-filter-option-label text-sm flex flex-row items-center cursor-pointer grow p-1'>
          {checkboxVisible && (
            <input
              type='checkbox'
              id={id}
              value={optionValue}
              checked={isChecked}
              onChange={handleChange}
              className='cio-filter-option-input hidden'
            />
          )}
          {checkboxPosition === 'left' && checkboxEl}
          <div className='cio-filter-multiple-option-display flex flex-row justify-between w-full items-center'>
            <Chip
              type={visualType}
              value={visualValue}
              name={displayValue}
              className='cio-filter-visual-swatch mr-2 shrink-0'
            />
            <span className='cio-filter-option-name grow break-words'>{displayValue}</span>
            {displayCountValue && (
              <span className='cio-filter-option-count text-gray-400 ml-2'>
                {displayCountValue}
              </span>
            )}
          </div>
          {checkboxPosition === 'right' && checkboxEl}
        </label>
      </li>
    </RenderPropsWrapper>
  );
}
