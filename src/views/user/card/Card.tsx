import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}
const Card = (props: CardProps) => {
  return (
    <div className={"flex flex-col items-center"}>
      <div>
        <h3 className={"text-xl"}>{props.title}</h3>
        <div
          className={
            "bg-primary rounded-2xl rounded-tl-none min-w-[300px] max-w-[500px] p-3"
          }
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Card;
