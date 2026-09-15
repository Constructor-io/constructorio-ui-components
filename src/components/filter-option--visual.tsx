import React from 'react';
import { cn } from '@/utils';
import { IncludeComponentOverrides } from '@/types';
import Chip, { type ChipOverrides } from '@/components/chip';
import FilterOption, {
  type FilterOptionProps,
  type FilterOptionOverrides,
} from '@/components/filter-option';

export type FilterOptionVisualOverrides = FilterOptionOverrides & {
  chip?: ChipOverrides;
};

export interface FilterOptionVisualProps
  extends Omit<FilterOptionProps, 'startContent' | 'componentOverrides'>,
    IncludeComponentOverrides<FilterOptionVisualOverrides> {
  /** Type of visual - 'color' for hex colors, 'image' for image URLs */
  visualType: 'color' | 'image';
  /** The visual value - hex color code or image URL */
  visualValue: string;
}

export default function FilterOptionVisual({
  className,
  checkboxPosition = 'right',
  visualType,
  visualValue,
  displayValue,
  componentOverrides,
  children,
  ...props
}: FilterOptionVisualProps) {
  const { chip: chipOverrides, ...filterOptionOverrides } = componentOverrides ?? {};

  return (
    <FilterOption
      {...props}
      checkboxPosition={checkboxPosition}
      displayValue={displayValue}
      className={cn('cio-visual-filter-option', className)}
      data-slot='visual-filter-option'
      componentOverrides={filterOptionOverrides}
      startContent={
        <Chip
          type={visualType}
          value={visualValue}
          name={displayValue}
          className='cio-filter-visual-swatch cio:mr-2 cio:shrink-0'
          componentOverrides={chipOverrides}
        />
      }>
      {children}
    </FilterOption>
  );
}
