import classnames from "classnames";

interface ButtonProps {
  className: string;
  text: string;
  type: string;
}

export const Button = ({ className, type, text }: ButtonProps) => {
  return (
    <button
      className={classnames("button", className, {
        "button--outline": type === "outline",
        "button--primary": type !== "outline",
      })}
    >
      <span>{text}</span>
    </button>
  );
};
