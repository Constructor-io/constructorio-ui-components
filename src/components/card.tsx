import React, { ReactNode, createContext, useContext } from 'react';

import { cn, RenderPropsWrapper } from '@/utils';
import { ComponentOverrideProps, IncludeComponentOverrides } from '@/types';

export type CardOverrides = ComponentOverrideProps<CardProps> & {
  header?: CardHeaderOverrides;
  title?: CardTitleOverrides;
  description?: CardDescriptionOverrides;
  action?: CardActionOverrides;
  content?: CardContentOverrides;
  footer?: CardFooterOverrides;
};
export type CardHeaderOverrides = ComponentOverrideProps<CardHeaderProps>;
export type CardTitleOverrides = ComponentOverrideProps<CardTitleProps>;
export type CardDescriptionOverrides = ComponentOverrideProps<CardDescriptionProps>;
export type CardActionOverrides = ComponentOverrideProps<CardActionProps>;
export type CardContentOverrides = ComponentOverrideProps<CardContentProps>;
export type CardFooterOverrides = ComponentOverrideProps<CardFooterProps>;

export interface CardProps
  extends React.ComponentProps<'div'>,
    IncludeComponentOverrides<CardOverrides> {
  children?: ReactNode;
}

export interface CardHeaderProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export interface CardTitleProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export interface CardDescriptionProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export interface CardActionProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export interface CardContentProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

export interface CardFooterProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}

// Card Context
interface CardContextType {
  renderProps: Omit<CardProps, 'children' | 'componentOverrides' | 'className'>;
  componentOverrides?: CardOverrides;
}

const CardContext = createContext<CardContextType | null>(null);

const useCardContext = (): CardContextType => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card compound components must be used within a Card component');
  }
  return context;
};

function Card({ children, componentOverrides, className, ...props }: CardProps) {
  const contextValue: CardContextType = React.useMemo(
    () => ({
      renderProps: props, // Use merged props in context
      componentOverrides, // Individual component overrides can be passed through props or context
    }),
    [props, componentOverrides],
  );

  return (
    <CardContext.Provider value={contextValue}>
      <RenderPropsWrapper props={props} override={componentOverrides?.reactNode}>
        <div
          data-slot='card'
          className={cn(
            'cio-components bg-card text-card-foreground flex flex-col gap-2 rounded-2xl border p-2 sm:p-4 shadow-md overflow-hidden',
            className,
          )}
          {...props}>
          {children}
        </div>
      </RenderPropsWrapper>
    </CardContext.Provider>
  );
}

function CardHeader({ children, className, ...props }: CardHeaderProps) {
  const { renderProps, componentOverrides } = useCardContext();

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <div
        data-slot='card-header'
        className={cn(
          '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
          className,
        )}
        {...props}>
        {children}
      </div>
    </RenderPropsWrapper>
  );
}

function CardTitle({ children, className, ...props }: CardTitleProps) {
  const { renderProps, componentOverrides } = useCardContext();

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <div
        data-slot='card-title'
        className={cn('leading-none font-semibold', className)}
        {...props}>
        {children}
      </div>
    </RenderPropsWrapper>
  );
}

function CardDescription({ children, className, ...props }: CardDescriptionProps) {
  const { renderProps, componentOverrides } = useCardContext();

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <div
        data-slot='card-description'
        className={cn('text-muted-foreground text-sm', className)}
        {...props}>
        {children}
      </div>
    </RenderPropsWrapper>
  );
}

function CardAction({ children, className, ...props }: CardActionProps) {
  const { renderProps, componentOverrides } = useCardContext();

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <div
        data-slot='card-action'
        className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
        {...props}>
        {children}
      </div>
    </RenderPropsWrapper>
  );
}

function CardContent({ children, className, ...props }: CardContentProps) {
  const { renderProps, componentOverrides } = useCardContext();

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <div data-slot='card-content' className={cn('flex flex-col gap-1', className)} {...props}>
        {children}
      </div>
    </RenderPropsWrapper>
  );
}

function CardFooter({ children, className, ...props }: CardFooterProps) {
  const { renderProps, componentOverrides } = useCardContext();

  return (
    <RenderPropsWrapper props={renderProps} override={componentOverrides?.reactNode}>
      <div
        data-slot='card-footer'
        className={cn('flex items-center [.border-t]:pt-6', className)}
        {...props}>
        {children}
      </div>
    </RenderPropsWrapper>
  );
}

// Attach compound components to Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Action = CardAction;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
