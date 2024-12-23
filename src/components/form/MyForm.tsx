import { Button } from "flowbite-react";
import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";

type MyFromProps = {
  title?: string;
  children: JSX.Element;
  className?: string;
  submitText: string;
  helper?: ReactNode;
  handleSubmit: SubmitHandler<any>;
};

const MyForm = (props: MyFromProps) => (
  <form onSubmit={props.handleSubmit}>
    <div className={`${props.className} bg-primary rounded-3xl min-w-[300px] max-w-[500px] p-3`}>
      <h3 className="text-2xl text-center pb-8">{props.title}</h3>

      {props.children}

      <div className="flex flex-row justify-between pt-3 text-sm">
        {props.helper}
        <Button type="submit" className="bg-tertiary">
          {props.submitText}
        </Button>
      </div>
    </div>
  </form>
);

export default MyForm;
