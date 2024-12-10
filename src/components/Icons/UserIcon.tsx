import React from "react";

interface IconProps {
  isLogin: boolean;
  className: string;
  onClick: React.MouseEventHandler<SVGSVGElement>;
}

const UserIcon: React.FC<IconProps> = ({ isLogin, className, onClick }) => {
  const strokeColor = isLogin ? "rgba(106, 152, 60, 1)" : "#151515";

  return (
    <svg
      className={className}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M3.5 21.9999L4.29 19.1199C6.9 9.6199 18.1 9.6199 20.71 19.1199L21.5 21.9999"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 11.98C15.2614 11.98 17.5 9.74139 17.5 6.97997C17.5 4.21854 15.2614 1.97997 12.5 1.97997C9.73858 1.97997 7.5 4.21854 7.5 6.97997C7.5 9.74139 9.73858 11.98 12.5 11.98Z"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="bevel"
      />
    </svg>
  );
};

export default UserIcon;
