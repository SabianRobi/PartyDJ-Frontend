import { type FieldValues, type Path, useFormContext } from "react-hook-form";

type CheckboxProps<FormType> = {
  name: Path<FormType>;
  label: string;
  required?: boolean;
  validation?: { [key: string]: object };
  inputClassNames?: string;
};

const Checkbox = <FormType extends FieldValues>({
  name,
  label,
  required,
  validation,
  inputClassNames
}: CheckboxProps<FormType>) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<FormType>();

  return (
    <div className="pb-2 flex flex-row gap-2">
      <input
        {...register(name, validation)}
        type="checkbox"
        id={name}
        name={name}
        className={`${inputClassNames} my-auto !bg-primary w-4 h-4 border-0 rounded-sm focus:border-tertiary focus:border-1`}
      />
      <div>
        <label htmlFor={name}>
          {label}
          {required ? <span className="text-error">*</span> : ""}
        </label>

        {errors[name] && typeof errors[name]?.message === "string" && (
          <p className="text-error text-sm text-end">{errors[name]?.message}</p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
