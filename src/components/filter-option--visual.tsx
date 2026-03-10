import React from 'react';
import { cn } from '@/utils';
import Chip from '@/components/chip';
import FilterOption, { type FilterOptionProps } from '@/components/filter-option';

export interface FilterOptionVisualProps
  extends Omit<FilterOptionProps, 'startContent' | 'children'> {
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
  ...props
}: FilterOptionVisualProps) {
  return (
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
  );
}
