import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
}
const Card = ({ title, children, ...rest }: CardProps) => {
  return (
    <div className={"flex flex-col items-center"} {...rest}>
      <div>
        {title && <h3 className={"text-xl"}>{title}</h3>}
        <div
          className={`${
            title ? "rounded-tl-none" : ""
          } bg-primary rounded-2xl min-w-[300px] max-w-[500px] p-3`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
