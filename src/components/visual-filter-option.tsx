import React from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import Chip from '@/components/chip';
import FilterOption, { FilterOptionProps } from '@/components/filter-option';

export interface VisualFilterOptionProps
  extends Omit<FilterOptionProps, 'startContent' | 'children' | 'componentOverrides'>,
    IncludeComponentOverrides<VisualFilterOptionOverrides> {
  /** Type of visual - 'color' for hex colors, 'image' for image URLs */
  visualType: 'color' | 'image';
  /** The visual value - hex color code or image URL */
  visualValue: string;
}

export type VisualFilterOptionOverrides = ComponentOverrideProps<VisualFilterOptionProps>;

export default function VisualFilterOption({
  className,
  checkboxPosition = 'right',
  visualType,
  visualValue,
  displayValue,
  componentOverrides,
  ...props
}: VisualFilterOptionProps) {
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
      <FilterOption
        checkboxPosition={checkboxPosition}
        displayValue={displayValue}
        className={cn('cio-visual-filter-option', className)}
        data-slot='visual-filter-option'
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
