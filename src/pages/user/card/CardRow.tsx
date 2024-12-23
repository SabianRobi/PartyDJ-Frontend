import type { ReactNode } from "react";

type CardRowProps = {
  name: string;
  value?: ReactNode;
  icon?: ReactNode;
  onIconClick?: () => void;
};

const CardRow = (props: CardRowProps) => (
  <div>
    <div className="flex flex-row justify-between pb-2">
      <p>{props.name}</p>
      <div>
        {props.value ? <span>{props.value}</span> : null}
        {props.icon ? (
          <button type="button" className="pl-2 p-1.5 hover:cursor-pointer" onClick={props.onIconClick}>
            {props.icon}
          </button>
        ) : null}
      </div>
    </div>
  </div>
);

export default CardRow;
