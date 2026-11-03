import React from 'react';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';
import SpinnerIcon from '@/assets/icons/SpinnerIcon';

const spinnerVariants = cva(
  'cio-components cio-spinner cio:block cio:shrink-0 cio:animate-spin cio:motion-reduce:animate-none',
  {
    variants: {
      size: {
        sm: 'cio:size-4',
        md: 'cio:size-8',
        lg: 'cio:size-16',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
export type SpinnerOverrides = ComponentOverrideProps<SpinnerProps>;

export interface SpinnerProps
  extends React.ComponentProps<'svg'>,
    SpinnerVariants,
    IncludeComponentOverrides<SpinnerOverrides> {
  /**
   * Accessible name announced by screen readers. Defaults to 'Loading…'
   */
  label?: string;
}

export default function Spinner({
  className,
  size,
  label = 'Loading…',
  componentOverrides,
  ...props
}: SpinnerProps) {
  const renderProps = React.useMemo(
    () => ({ ...props, size, label, className }),
    [props, size, label, className],
  );

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <SpinnerIcon
        data-slot='spinner'
        role='status'
        aria-label={label}
        className={cn(spinnerVariants({ size, className }))}
        {...props}
      />
    </RenderPropsWrapper>
  );
}
