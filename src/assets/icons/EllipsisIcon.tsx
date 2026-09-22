import * as React from 'react';
import { SVGProps } from 'react';

const EllipsisIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={14}
    height={4}
    viewBox='0 0 14 4'
    fill='currentColor'
    aria-hidden='true'
    {...props}>
    <circle cx={1.5} cy={2} r={1.5} />
    <circle cx={7} cy={2} r={1.5} />
    <circle cx={12.5} cy={2} r={1.5} />
  </svg>
);

export default EllipsisIcon;
