import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  children: ReactNode;
};

const Card = ({ title, children, ...rest }: CardProps) => (
  <div className="flex flex-col items-center" {...rest}>
    <div>
      {title && <h3 className="text-xl">{title}</h3>}
      <div className={`${title ? "rounded-tl-none" : ""} bg-primary rounded-2xl min-w-[300px] max-w-[500px] p-3 pb-0`}>
        {children}
      </div>
    </div>
  </div>
);

export default Card;
