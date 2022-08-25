import React, { MouseEventHandler } from 'react';
interface InputCrossSVGTypes {
  className: string;
  onClick: MouseEventHandler<SVGSVGElement> | undefined;
}

export const InputCrossSVG = ({
  className,
  onClick,
}: InputCrossSVGTypes) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 36 36"
    >
      <path
        d="M6.2,3.5L3.5,6.2c-0.7,0.7-0.7,1.9,0,2.7l9.2,9.2l-9.2,9.2c-0.7,0.7-0.7,1.9,0,2.7l2.6,2.6   c0.7,0.7,1.9,0.7,2.7,0l9.2-9.2l9.2,9.2c0.7,0.7,1.9,0.7,2.7,0l2.6-2.6c0.7-0.7,0.7-1.9,0-2.7L23.3,18l9.2-9.2   c0.7-0.7,0.7-1.9,0-2.7l-2.6-2.6c-0.7-0.7-1.9-0.7-2.7,0L18,12.7L8.8,3.5C8.1,2.8,6.9,2.8,6.2,3.5z"
        id="close_1_"
      />
    </svg>
  );
};
