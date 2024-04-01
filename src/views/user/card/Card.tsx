import React from "react";
import classNames from "classnames";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}
const Card = (props: CardProps) => {
  return (
    <div className={"flex flex-col items-center"}>
      <div>
        {props.title && <h3 className={"text-xl pt-8"}>{props.title}</h3>}
        <div
          className={classNames(
            "bg-primary rounded-2xl min-w-[300px] max-w-[500px] p-3",
            props.title ? "rounded-tl-none" : ""
          )}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Card;
