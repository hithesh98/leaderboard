import { ReactNode } from "react";

type ButtonProps = {
  variant: "default" | "highlight" | "secondary" | "ghost";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export default function Button({
  variant,
  className,
  onClick,
  children,
}: ButtonProps) {
  let variantClassName;
  switch (variant) {
    case "highlight":
      variantClassName = "text-white bg-primaryRed";
      break;
    case "secondary":
      variantClassName = "text-white bg-gray-500 hover:bg-primaryRed";
      break;
    case "ghost":
      variantClassName = "text-black";
      break;
    default:
      variantClassName = "text-black";
  }
  return (
    <button
      className={`${variantClassName} ${className} px-4 py-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
