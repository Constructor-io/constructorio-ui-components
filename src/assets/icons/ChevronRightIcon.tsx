import * as React from 'react';
import { SVGProps } from 'react';

const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={8}
    height={8}
    viewBox='0 0 8 8'
    fill='none'
    aria-hidden='true'
    {...props}>
    <path
      d='m3.033.85 2.993 2.993a.223.223 0 0 1 0 .315L3.034 7.15'
      stroke='currentColor'
      strokeWidth={1.2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default ChevronRightIcon;
