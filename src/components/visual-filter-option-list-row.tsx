import React from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';
import Chip from '@/components/chip';
import FilterOptionListRow, { FilterOptionListRowProps } from '@/components/filter-option-list-row';

// Variants defined locally to satisfy react-refresh/only-export-components
const visualFilterOptionListRowVariants = cva('');

export type VisualFilterOptionListRowVariants = VariantProps<
  typeof visualFilterOptionListRowVariants
>;

export interface VisualFilterOptionListRowProps
  extends Omit<FilterOptionListRowProps, 'startContent' | 'children' | 'componentOverrides'>,
    IncludeComponentOverrides<VisualFilterOptionListRowOverrides> {
  /** Type of visual - 'color' for hex colors, 'image' for image URLs */
  visualType: 'color' | 'image';
  /** The visual value - hex color code or image URL */
  visualValue: string;
}

export type VisualFilterOptionListRowOverrides =
  ComponentOverrideProps<VisualFilterOptionListRowProps>;

export default function VisualFilterOptionListRow({
  className,
  checkboxPosition = 'right',
  visualType,
  visualValue,
  displayValue,
  componentOverrides,
  ...props
}: VisualFilterOptionListRowProps) {
  const renderProps = React.useMemo(
    () => ({
      ...props,
      displayValue,
      checkboxPosition,
      visualType,
      visualValue,
      className,
    }),
    [props, displayValue, checkboxPosition, visualType, visualValue, className],
  );

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <FilterOptionListRow
        checkboxPosition={checkboxPosition}
        displayValue={displayValue}
        className={cn('cio-visual-filter-option-list-row', className)}
        data-slot='visual-filter-option-list-row'
        startContent={
          <Chip
            type={visualType}
            value={visualValue}
            name={displayValue}
            className='cio-filter-visual-swatch mr-2 shrink-0'
          />
        }
        {...props}
      />
    </RenderPropsWrapper>
  );
}
