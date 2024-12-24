import { Button } from "flowbite-react";
import type { ReactNode } from "react";
import { type FieldValues, useFormContext } from "react-hook-form";

type MyFromProps<FormType extends FieldValues> = {
  title?: string;
  children: JSX.Element;
  className?: string;
  submitText: string;
  helper?: ReactNode;
  onSubmit: (data: FormType) => void;
};

const MyForm = <FormType extends FieldValues>({
  title,
  children,
  className,
  submitText,
  helper,
  onSubmit
}: MyFromProps<FormType>) => {
  const { handleSubmit } = useFormContext<FormType>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`${className} bg-primary rounded-3xl min-w-[300px] max-w-[500px] p-3`}>
        <h3 className="text-2xl text-center pb-8">{title}</h3>

        {children}

        <div className="flex flex-row justify-between pt-3 text-sm">
          {helper}
          <Button type="submit" className="bg-tertiary">
            {submitText}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MyForm;
