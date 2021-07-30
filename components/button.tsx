import classnames from "classnames";

interface IProps {
  className?: string;
  text: string;
  type: string;
}

const defaultProps = {
  type: "primary",
};

export const Button = ({
  className,
  type,
  text,
}: IProps & typeof defaultProps) => {
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

Button.defaultProps = defaultProps;
