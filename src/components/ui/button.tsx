import React, { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import RenderPropsWrapper from '@/components/RenderPropsWrapper';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "cio-button cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      },
      size: {
        sm: 'h-6 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        md: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        xl: 'h-12 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
      shape: {
        beveled: 'rounded-sm',
        rounded: 'rounded-full',
        sharp: 'rounded-none',
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
}

export default function Button({
  className,
  variant,
  size,
  shape,
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
        {...props}
      />
    </RenderPropsWrapper>
  );
}
