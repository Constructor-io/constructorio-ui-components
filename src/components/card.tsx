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

// Helper function to create the Card root
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
            'cio-components cio:bg-card cio:text-card-foreground cio:flex cio:flex-col cio:gap-2 cio:rounded-2xl cio:border cio:p-2 cio:sm:p-4 cio:shadow-md cio:overflow-hidden',
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
          // eslint-disable-next-line no-useless-escape
          'cio:@container/card-header cio:grid cio:auto-rows-min cio:grid-rows-[auto_auto] cio:items-start cio:gap-2 cio:has-[data-slot=card-action]:grid-cols-[1fr_auto] cio:[.cio\:border-b]:pb-6',
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
        className={cn('cio:leading-none cio:font-semibold', className)}
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
        className={cn('cio:text-muted-foreground cio:text-sm', className)}
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
        className={cn(
          'cio:col-start-2 cio:row-span-2 cio:row-start-1 cio:self-start cio:justify-self-end',
          className,
        )}
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
      <div
        data-slot='card-content'
        className={cn('cio:flex cio:flex-col cio:gap-1', className)}
        {...props}>
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
        // eslint-disable-next-line no-useless-escape
        className={cn('cio:flex cio:items-center cio:[.cio\:border-t]:pt-6', className)}
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
