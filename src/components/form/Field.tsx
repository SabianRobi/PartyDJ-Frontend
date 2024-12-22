import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type FieldProps = {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  register: UseFormRegister<any>;
  validation?: { [key: string]: any };
  errors: FieldErrors<any>;
  inputClassNames?: string;
  inputPlaceholder?: string;
};

const Field = (props: FieldProps) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const handleToggleHidden = () => {
    setHidden(!hidden);
  };

  return (
    <div className={"pb-2"}>
      <label htmlFor={props.name}>
        {props.label}
        {props.required ? <span className={"text-error"}>*</span> : ""}
      </label>
      <div className={"relative"}>
        <input
          {...props.register(props.name, props.validation)}
          type={
            props.type === "password"
              ? hidden
                ? "password"
                : "text"
              : props.type
          }
          id={props.name}
          name={props.name}
          className={`${props.errors[props.name] ? "rounded-br-none" : ""} ${
            props.inputClassNames
          } transition-all duration-150 bg-secondary w-full border-0 rounded-2xl rounded-tl-none h-full focus:border-tertiary focus:border-1`}
          placeholder={props.inputPlaceholder}
        />
        {props.type === "password" && (
          <span
            className={"absolute top-2 right-2"}
            onClick={handleToggleHidden}
          >
            {hidden ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        )}
        {props.errors[props.name] && (
          <p className={"text-error text-sm text-end"}>
            {"" + props?.errors[props.name]?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Field;
