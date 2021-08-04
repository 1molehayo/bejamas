import classnames from "classnames";
import { MouseEventHandler } from "react";

interface IProps {
  className?: string;
  text: string;
  type: "primary" | "outline";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const defaultProps = {
  type: "primary",
};

export const Button = ({
  className,
  disabled,
  type,
  text,
  onClick,
}: IProps & typeof defaultProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classnames("button", className, {
        "button--outline": type === "outline",
        "button--primary": type !== "outline",
      })}
    >
      <span>{text}</span>
    </button>
  );
};

Button.defaultProps = defaultProps;
