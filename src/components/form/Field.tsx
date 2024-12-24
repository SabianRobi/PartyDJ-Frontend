import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";

type FieldProps<FromType extends FieldValues> = {
  type: string;
  name: Path<FromType>;
  label: string;
  required?: boolean;
  validation?: { [key: string]: object };
  inputClassNames?: string;
  inputPlaceholder?: string;
};

const Field = <FromType extends FieldValues>({
  type,
  name,
  label,
  required,
  validation,
  inputClassNames,
  inputPlaceholder
}: FieldProps<FromType>) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const {
    register,
    formState: { errors }
  } = useFormContext<FromType>();

  const handleToggleHidden = () => setHidden(!hidden);

  return (
    <div className="pb-2">
      <label htmlFor={name}>
        {label}
        {required ? <span className="text-error">*</span> : ""}
      </label>
      <div className="relative">
        <input
          {...register(name, validation)}
          type={type === "password" ? (hidden ? "password" : "text") : type}
          id={name}
          name={name}
          className={`${
            errors[name] ? "rounded-br-none" : ""
          } ${inputClassNames} transition-all duration-150 bg-secondary w-full border-0 rounded-2xl rounded-tl-none h-full focus:border-tertiary focus:border-1`}
          placeholder={inputPlaceholder}
        />
        {type === "password" && (
          <button type="button" className="absolute top-2 right-2" onClick={handleToggleHidden}>
            {hidden ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </button>
        )}
        {errors[name] && typeof errors[name]?.message === "string" && (
          <p className="text-error text-sm text-end">{errors[name]?.message}</p>
        )}
      </div>
    </div>
  );
};

export default Field;
