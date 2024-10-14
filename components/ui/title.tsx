import { cn } from "@/lib/utils";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text?: string;
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const defaultProps: TitleProps = {
  size: "3xl",
  text: undefined,
  children: undefined,
  as: "h1",
  className: "",
};

export const Title = (props: TitleProps = defaultProps) => {
  const { text, className, children, as, size, ...rest } = props || defaultProps;
  const Tag = as || "h1";
  const sizeClass = size ? `text-${size}` : "text-3xl";

  if (text != null) {
    return (
      <Tag className={cn("font-bold mb-4", sizeClass, className)} {...rest}>
        {text}
      </Tag>
    );
  }

  if (children != null) {
    return (
      <Tag className={cn("font-bold mb-4", sizeClass, className)} {...rest}>
        {children}
      </Tag>
    );
  }

  return null;
};
