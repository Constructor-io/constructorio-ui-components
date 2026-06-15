import React from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';

const chipVariants = cva(
  'cio-components cio-chip cio:inline-flex cio:items-center cio:justify-center cio:rounded-full cio:overflow-hidden cio:border cio:border-gray-200 cio:flex-shrink-0',
  {
    variants: {
      size: {
        sm: 'cio:w-4 cio:h-4',
        md: 'cio:w-6 cio:h-6',
        lg: 'cio:w-8 cio:h-8',
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
    () => ({ ...props, type, value, name, size, className }),
    [props, type, value, name, size, className],
  );

  const renderContent = () => {
    // Fallback
    if (!value || value.trim() === '' || !['color', 'image'].includes(type)) {
      return (
        <div
          data-slot='chip'
          className={cn(chipVariants({ size, className }), 'cio:bg-white')}
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
            className='cio:w-full cio:h-full cio:object-cover'
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              // Class is added to the safelist in src/styles.css via @source inline(...)
              // because Tailwind's static scanner can't detect classes added at runtime.
              e.currentTarget.parentElement?.classList.add('cio:bg-gray-200');
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
