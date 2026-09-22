import React from 'react';
import { composeRefs } from './composeRefs';

function mergeProps(slotProps: Record<string, unknown>, childProps: Record<string, unknown>) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      if (typeof slotPropValue === 'function' && typeof childPropValue === 'function') {
        overrideProps[propName] = (...args: unknown[]) => {
          const result = (childPropValue as (...a: unknown[]) => unknown)(...args);
          const event = args[0] as { defaultPrevented?: boolean } | undefined;
          if (!event?.defaultPrevented) {
            (slotPropValue as (...a: unknown[]) => unknown)(...args);
          }
          return result;
        };
      } else if (typeof slotPropValue === 'function') {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = {
        ...(slotPropValue as object),
        ...(childPropValue as object),
      };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

function getElementRef(element: React.ReactElement): React.Ref<unknown> | undefined {
  const props = element.props as Record<string, unknown>;
  const getter = Object.getOwnPropertyDescriptor(props, 'ref')?.get;
  const mayWarn =
    getter && 'isReactWarning' in getter && (getter as { isReactWarning?: boolean }).isReactWarning;
  if (mayWarn) {
    return (element as unknown as { ref?: React.Ref<unknown> }).ref;
  }

  return (
    (props.ref as React.Ref<unknown>) || (element as unknown as { ref?: React.Ref<unknown> }).ref
  );
}

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (React.isValidElement(children)) {
    const childRef = getElementRef(children);
    const mergedProps = mergeProps(slotProps, children.props as Record<string, unknown>);
    mergedProps.ref = composeRefs(forwardedRef, childRef);

    return React.cloneElement(children, mergedProps);
  }

  if (React.Children.count(children) > 1) {
    React.Children.only(null);
  }

  return null;
});

Slot.displayName = 'Slot';

export { Slot };
