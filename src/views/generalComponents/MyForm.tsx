// @flow
import * as React from "react";
import classNames from "classnames";
import { Button } from "flowbite-react";
import { SubmitHandler } from "react-hook-form";

type MyFromProps = {
  title?: string;
  children: JSX.Element;
  className?: string;
  submitText: string;
  helper?: React.ReactNode;
  handleSubmit: SubmitHandler<any>;
};

export default function MyForm(props: MyFromProps) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div
        className={classNames(
          "bg-primary rounded-3xl min-w-[300px] max-w-[500px] p-3",
          props.className
        )}
      >
        <h3 className={"text-2xl text-center pb-8"}>{props.title}</h3>

        {props.children}

        <div className={"flex flex-row justify-between pt-3 text-sm"}>
          {props.helper}
          <Button type={"submit"} className={"bg-tertiary"}>
            {props.submitText}
          </Button>
        </div>
      </div>
    </form>
  );
}
