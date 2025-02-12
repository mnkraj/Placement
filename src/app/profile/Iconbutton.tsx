import React from "react";

interface IconBtnProps {
  text: string;
  onClick: () => void;
  children: React.ReactNode;
}

const IconBtn: React.FC<IconBtnProps> = ({ text, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
    >
      {children}
      <span>{text}</span>
    </button>
  );
};

export default IconBtn;
