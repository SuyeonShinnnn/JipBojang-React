import React from "react";

interface WarningIconProps extends React.SVGProps<SVGSVGElement> {}

export const WarningIcon: React.FC<WarningIconProps> = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
      <g id="web-app" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="warning" fill="#000000" fillRule="nonzero">
          <path d="M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M11,16 L13,16 L13,18 L11,18 L11,16 Z M11,6 L13,6 L13,14 L11,14 L11,6 Z" id="Shape" />
        </g>
      </g>
    </svg>);
};
