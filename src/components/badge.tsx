import React, { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  "cio-components cio-badge inline-flex items-center gap-1.5 whitespace-nowrap font-medium transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden tracking-tighter",
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        secondary: 'border-transparent bg-secondary shadow-xs hover:bg-secondary/90',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        destructive:
          'border-transparent bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      },
      size: {
        sm: 'h-4 px-1 text-xs leading-3',
        md: 'h-5 py-1 px-2 text-[13px] leading-4',
        lg: 'h-6 py-1 px-2 text-sm leading-4',
      },
      shape: {
        beveled: 'rounded-sm',
        rounded: 'rounded-full',
        text: 'bg-transparent',
        sharp: 'rounded-none',
      },
      state: {
        default: '',
        disabled: 'text-[#0A0F2940] bg-secondary pointer-events-none',
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
        class: 'px-0 min-w-4 justify-center',
      },
      {
        isNumber: true,
        size: 'md',
        class: 'p-0.5 min-w-5 justify-center',
      },
      {
        isNumber: true,
        size: 'lg',
        class: 'p-0.5 min-w-6 justify-center',
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
