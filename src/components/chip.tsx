import React from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';

const chipVariants = cva(
  'cio-components cio-chip inline-flex items-center justify-center rounded-full overflow-hidden border border-gray-200 flex-shrink-0',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export type ChipVariants = VariantProps<typeof chipVariants>;

export interface ChipProps
  extends Omit<React.ComponentProps<'div'>, 'children'>,
    ChipVariants,
    IncludeComponentOverrides<ChipOverrides> {
  /** Type of chip - 'color' for hex colors, 'image' for image URLs */
  type: 'color' | 'image';
  /** The value - hex color code for color type, URL for image type */
  value: string;
  /** Name for accessibility (used in aria-label and alt text) */
  name: string;
}

export type ChipOverrides = ComponentOverrideProps<ChipProps>;

export default function Chip({
  className,
  size,
  type,
  value,
  name,
  componentOverrides,
  ...props
}: ChipProps) {
  const renderProps = React.useMemo(
    () => ({ type, value, name, size, className }),
    [type, value, name, size, className],
  );

  const renderContent = () => {
    // Fallback
    if (!value || value.trim() === '' || !['color', 'image'].includes(type)) {
      return (
        <div
          data-slot='chip'
          className={cn(chipVariants({ size, className }), 'bg-white')}
          aria-label={name}
          role='img'
          {...props}
        />
      );
    }

    if (type === 'color') {
      return (
        <div
          data-slot='chip'
          className={cn(chipVariants({ size, className }))}
          style={{ backgroundColor: value }}
          aria-label={name}
          role='img'
          {...props}
        />
      );
    }

    if (type === 'image') {
      return (
        <div
          data-slot='chip'
          className={cn(chipVariants({ size, className }))}
          aria-label={name}
          role='img'
          {...props}>
          <img
            src={value}
            alt={name}
            className='w-full h-full object-cover'
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('bg-gray-200');
            }}
          />
        </div>
      );
    }
  };

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      {renderContent()}
    </RenderPropsWrapper>
  );
}
