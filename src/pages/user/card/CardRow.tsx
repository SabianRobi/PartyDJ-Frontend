import type { ReactNode } from "react";

type CardRowProps = {
  name: string;
  value?: ReactNode;
  icon?: ReactNode;
  onIconClick?: () => void;
};

const CardRow = ({ name, value, icon, onIconClick }: CardRowProps) => (
  <div className="flex flex-row justify-between pb-2 items-center">
    <p>{name}</p>
    <div>
      {value ? value : null}
      {icon ? (
        <button type="button" className="pl-2 p-1.5 hover:cursor-pointer" onClick={onIconClick}>
          {icon}
        </button>
      ) : null}
    </div>
  </div>
);

export default CardRow;
