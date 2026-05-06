import React from "react";

interface AngleRightIconProps extends React.SVGProps<SVGSVGElement> {}

export const AngleRightIcon: React.FC<AngleRightIconProps> = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
    </svg>);
};
