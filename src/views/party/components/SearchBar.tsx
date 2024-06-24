import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSliders,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type SearchBarProps = {
  register: UseFormRegister<any>;
  validation?: { [key: string]: any };
  errors: FieldErrors<any>;
  label: string;
  name: string;
  inputPlaceholder?: string;
};

const SearchBar = (props: SearchBarProps) => {
  // const { setValue, setFocus, resetField, reset } = useForm<ISearchFormInput>();

  const handleClearInput = () => {
    // TODO: this not works
    // resetField("query");
    // setValue("query", "");
    // reset({ query: "query" });
    // setFocus("query");
  };

  return (
    <div className={"pb-2"}>
      {/* Label */}
      <label htmlFor={props.name}>{props.label}</label>

      <div
        className={
          "flex flex-row w-full bg-secondary rounded-2xl rounded-tl-none"
        }
      >
        {/* TODO: Add settings modal */}
        {/* Settings */}
        <button
          className={
            "flex items-center p-2 bg-tertiary rounded-bl-2xl w-[40px]"
          }
        >
          <FontAwesomeIcon
            icon={faSliders}
            className={"h-4 w-4 rotate-90 mx-auto"}
          />
        </button>

        {/* Input */}
        <div className={"w-full relative"}>
          {/* Input field */}
          <input
            {...props.register(props.name, props.validation)}
            type={"text"}
            id={props.name}
            className={classNames(
              "transition-all duration-150 w-full h-min-max border-0 bg-secondary focus:border-tertiary focus:border-1 placeholder-lightText/40",
              props.errors[props.name] ? "rounded-br-none" : ""
            )}
            placeholder={props.inputPlaceholder}
          />

          {/* Reset button */}
          <div
            className={"absolute top-0 right-0 mr-4 h-full flex items-center"}
          >
            <button
              className={"flex items-center"}
              onClick={handleClearInput}
              // type={"reset"}
            >
              <FontAwesomeIcon icon={faXmark} className={"p-2"} />
            </button>
          </div>
        </div>

        {/* Search logo */}
        <button
          className={"mx-auto p-2 bg-tertiary rounded-e-2xl w-[40px]"}
          type={"submit"}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={"h-4 w-4 mx-auto"}
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
