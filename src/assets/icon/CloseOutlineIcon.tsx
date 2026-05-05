import React from "react";

interface CloseOutlineIconProps extends React.SVGProps<SVGSVGElement> {}

export const CloseOutlineIcon: React.FC<CloseOutlineIconProps> = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <line x1="368" y1="368" x2="144" y2="144" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32px" />
      <line x1="368" y1="144" x2="144" y2="368" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32px" />
    </svg>);
};
