import * as React from 'react';
import { SVGProps } from 'react';
import { cn } from '@/utils';
import ArrowRightIcon from '@/assets/icons/arrow-right-icon';

const ArrowLeftIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <ArrowRightIcon className={cn('rotate-180', className)} {...props} />
);
export default ArrowLeftIcon;
