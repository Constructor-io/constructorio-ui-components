import React, { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { ButtonVariants, buttonVariants } from './ButtonVariants';
import RenderPropsWrapper from '../RenderPropsWrapper';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';

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
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    </RenderPropsWrapper>
  );
}
