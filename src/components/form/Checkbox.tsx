import classNames from "classnames";

type CheckboxProps = {
  name: string;
  label: string;
  required?: boolean;
  register: any;
  validation?: { [key: string]: any };
  errors: any;
  inputClassNames?: string;
};

const Checkbox = (props: CheckboxProps) => {
  return (
    <div className={"pb-2 flex flex-row gap-2"}>
      <input
        {...props.register(props.name, props.validation)}
        type={"checkbox"}
        id={props.name}
        name={props.name}
        className={classNames(
          "my-auto !bg-primary w-4 h-4 border-0 rounded-sm focus:border-tertiary focus:border-1",
          props.inputClassNames
        )}
      />
      <div>
        <label htmlFor={props.name}>
          {props.label}
          {props.required ? <span className={"text-error"}>*</span> : ""}
        </label>

        {props.errors[props.name] && (
          <p className={"text-error text-sm text-end"}>
            {"" + props?.errors[props.name]?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
