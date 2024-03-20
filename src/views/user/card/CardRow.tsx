import React from "react";

type CardRowProps = {
  name: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
  onIconClick?: () => void;
};
const CardRow = (props: CardRowProps) => {
  return (
    <div>
      <div className={"flex flex-row justify-between pb-2"}>
        <p>{props.name}</p>
        <div>
          {props.value ? <span>{props.value}</span> : null}
          {props.icon ? (
            <span
              className={"pl-2 p-1.5 hover:cursor-pointer"}
              onClick={props.onIconClick}
            >
              {props.icon}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardRow;
