import * as React from 'react';
import { SVGProps } from 'react';
import { cn } from '@/lib/utils';
import ArrowRightIcon from './ArrowRightIcon';

const ArrowLeftIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <ArrowRightIcon className={cn('rotate-180', className)} {...props} />
);
export default ArrowLeftIcon;
