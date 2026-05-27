import React, { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "cio-components cio-button cio:cursor-pointer cio:inline-flex cio:items-center cio:justify-center cio:gap-2 cio:whitespace-nowrap cio:rounded-sm cio:text-sm cio:font-medium cio:transition-all cio:disabled:pointer-events-none cio:disabled:opacity-50 cio:[&_svg]:pointer-events-none cio:[&_svg:not([class*='cio:size-'])]:size-4 cio:shrink-0 cio:[&_svg]:shrink-0 cio:outline-none cio:focus-visible:border-ring cio:focus-visible:ring-ring/50 cio:focus-visible:ring-[3px] cio:aria-invalid:ring-destructive/20 cio:dark:aria-invalid:ring-destructive/40 cio:aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'cio:bg-primary cio:text-primary-foreground cio:shadow-xs cio:hover:bg-primary/90',
        secondary:
          'cio:bg-secondary cio:text-secondary-foreground cio:shadow-xs cio:hover:bg-secondary/80',
        outline:
          'cio:border cio:bg-background cio:shadow-xs cio:hover:bg-accent cio:hover:text-accent-foreground cio:dark:bg-input/30 cio:dark:border-input cio:dark:hover:bg-input/50',
        ghost: 'cio:hover:bg-accent cio:hover:text-accent-foreground cio:dark:hover:bg-accent/50',
        link: 'cio:text-primary cio:underline-offset-4 cio:hover:underline',
        destructive:
          'cio:bg-destructive cio:text-white cio:shadow-xs cio:hover:bg-destructive/90 cio:focus-visible:ring-destructive/20 cio:dark:focus-visible:ring-destructive/40 cio:dark:bg-destructive/60',
      },
      size: {
        sm: 'cio:h-6 cio:rounded-md cio:gap-1.5 cio:px-3 cio:has-[>svg]:px-2.5',
        md: 'cio:h-8 cio:rounded-md cio:gap-1.5 cio:px-3 cio:has-[>svg]:px-2.5',
        default: 'cio:h-10 cio:px-4 cio:py-2 cio:has-[>svg]:px-3',
        xl: 'cio:h-12 cio:rounded-md cio:px-6 cio:has-[>svg]:px-4',
        icon: 'cio:size-9',
      },
      shape: {
        beveled: 'cio:rounded-sm',
        rounded: 'cio:rounded-full',
        sharp: 'cio:rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'beveled',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonOverrides = ComponentOverrideProps<ButtonProps>;

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    ButtonVariants,
    IncludeComponentOverrides<ButtonOverrides> {
  children: ReactNode;
  /**
   * True to render `children` as is. Defaults to False, rendering `children` under <button>
   */
  asChild?: boolean;
  conversionType?: string;
}

export default function Button({
  className,
  variant,
  size,
  shape,
  conversionType,
  asChild = false,
  componentOverrides,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const renderProps = React.useMemo(() => props, [props]);

  return (
    // Don't pass `override={children}` since we don't want RenderProps for this component
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <Comp
        data-slot='button'
        className={cn(buttonVariants({ variant, size, shape, className }))}
        data-cnstrc-btn={conversionType}
        {...props}
      />
    </RenderPropsWrapper>
  );
}
