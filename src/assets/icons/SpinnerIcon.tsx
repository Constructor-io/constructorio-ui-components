import * as React from 'react';
import { SVGProps } from 'react';

const SpinnerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={24}
    height={24}
    fill='none'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    {...props}>
    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
  </svg>
);
export default SpinnerIcon;
