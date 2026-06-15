import React, { ReactNode } from 'react';
import { cn, RenderPropsWrapper, Slot } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  "cio-components cio-badge cio:inline-flex cio:items-center cio:gap-1.5 cio:whitespace-nowrap cio:font-medium cio:transition-all cio:[&_svg]:pointer-events-none cio:[&_svg:not([class*='cio:size-'])]:size-3 cio:shrink-0 cio:[&_svg]:shrink-0 cio:outline-none cio:focus-visible:border-ring cio:focus-visible:ring-ring/50 cio:focus-visible:ring-[3px] cio:aria-invalid:ring-destructive/20 cio:dark:aria-invalid:ring-destructive/40 cio:aria-invalid:border-destructive cio:overflow-hidden cio:tracking-tighter",
  {
    variants: {
      variant: {
        default:
          'cio:border-transparent cio:bg-primary cio:text-primary-foreground cio:shadow-xs cio:hover:bg-primary/90',
        secondary:
          'cio:border-transparent cio:bg-secondary cio:shadow-xs cio:hover:bg-secondary/90',
        outline:
          'cio:border cio:bg-background cio:shadow-xs cio:hover:bg-accent cio:hover:text-accent-foreground cio:dark:bg-input/30 cio:dark:border-input cio:dark:hover:bg-input/50',
        destructive:
          'cio:border-transparent cio:bg-destructive cio:text-white cio:shadow-xs cio:hover:bg-destructive/90 cio:focus-visible:ring-destructive/20 cio:dark:focus-visible:ring-destructive/40 cio:dark:bg-destructive/60',
      },
      size: {
        sm: 'cio:h-4 cio:px-1 cio:text-xs cio:leading-3',
        md: 'cio:h-5 cio:py-1 cio:px-2 cio:text-[13px] cio:leading-4',
        lg: 'cio:h-6 cio:py-1 cio:px-2 cio:text-sm cio:leading-4',
      },
      shape: {
        beveled: 'cio:rounded-sm',
        rounded: 'cio:rounded-full',
        text: 'cio:bg-transparent',
        sharp: 'cio:rounded-none',
      },
      state: {
        default: '',
        disabled: 'cio:text-[#0A0F2940] cio:bg-secondary cio:pointer-events-none',
      },
      isNumber: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        isNumber: true,
        size: 'sm',
        class: 'cio:px-0 cio:min-w-4 cio:justify-center',
      },
      {
        isNumber: true,
        size: 'md',
        class: 'cio:p-0.5 cio:min-w-5 cio:justify-center',
      },
      {
        isNumber: true,
        size: 'lg',
        class: 'cio:p-0.5 cio:min-w-6 cio:justify-center',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'beveled',
      state: 'default',
      isNumber: false,
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type BadgeOverrides = ComponentOverrideProps<BadgeProps>;

export interface BadgeProps
  extends React.ComponentProps<'span'>,
    BadgeVariants,
    IncludeComponentOverrides<BadgeOverrides> {
  children: ReactNode;
  /**
   * True to render `children` as is. Defaults to False, rendering `children` under <span>
   */
  asChild?: boolean;
}

export default function Badge({
  className,
  variant,
  size,
  shape,
  state,
  isNumber,
  asChild = false,
  componentOverrides,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : 'span';
  const renderProps = React.useMemo(() => props, [props]);

  return (
    // Don't pass `override={children}` since we don't want RenderProps for this component
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <Comp
        data-slot='badge'
        className={cn(badgeVariants({ variant, size, shape, state, isNumber, className }))}
        {...props}
      />
    </RenderPropsWrapper>
  );
}
