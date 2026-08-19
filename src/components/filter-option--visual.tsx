import React from 'react';
import { cn } from '@/utils';
import Chip from '@/components/chip';
import FilterOption, { type FilterOptionProps } from '@/components/filter-option';

export interface FilterOptionVisualProps extends Omit<FilterOptionProps, 'startContent'> {
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
  children,
  ...props
}: FilterOptionVisualProps) {
  return (
    <FilterOption
      {...props}
      checkboxPosition={checkboxPosition}
      displayValue={displayValue}
      className={cn('cio-visual-filter-option', className)}
      data-slot='visual-filter-option'
      startContent={
        <Chip
          type={visualType}
          value={visualValue}
          name={displayValue}
          className='cio-filter-visual-swatch cio:mr-2 cio:shrink-0'
        />
      }>
      {children}
    </FilterOption>
  );
}
