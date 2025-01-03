import { faMagnifyingGlass, faSliders, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import type { SearchFormInput } from "../Party";

type SearchBarProps = {
  setIsSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const SearchBar = ({ setIsSettingsModalOpen }: SearchBarProps) => {
  const {
    register,
    formState: { errors },
    resetField,
    setFocus
  } = useFormContext<SearchFormInput>(); // Retrieve all hook methods

  const handleClearInput = () => {
    resetField("query");
    setFocus("query");
  };

  return (
    <div className="pb-2">
      {/* Label */}
      <label htmlFor="query">Search</label>

      <div className="flex flex-row w-full bg-secondary rounded-2xl rounded-tl-none">
        {/* Settings */}
        <button
          className="flex items-center p-2 bg-tertiary rounded-bl-2xl w-[40px]"
          type="button"
          onClick={() => setIsSettingsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faSliders} className="h-4 w-4 rotate-90 mx-auto" />
        </button>

        {/* Input */}
        <div className="w-full relative">
          {/* Input field */}
          <input
            {...register("query", {
              required: { value: true, message: "Should not be empty." },
              minLength: {
                value: 3,
                message: "Should be at least 3 characters long."
              }
            })}
            type="text"
            className="w-full h-min-max border-0 bg-secondary focus:border-tertiary focus:border-1 placeholder-lightText/40"
            placeholder="Monday left me broken"
          />

          {/* Reset button */}
          <div className="absolute top-0 right-0 mr-4 h-full flex items-center">
            <button className="flex items-center" onClick={handleClearInput} type="reset">
              <FontAwesomeIcon icon={faXmark} className="p-2" />
            </button>
          </div>
        </div>

        {/* Search logo */}
        <button
          className={`${
            errors["query"] ? "rounded-br-none" : ""
          } mx-auto p-2 bg-tertiary rounded-e-2xl w-[40px] transition-all duration-150`}
          type="submit"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4 mx-auto" />
        </button>
      </div>

      {/* Error message */}
      {errors["query"] && typeof errors["query"]?.message === "string" && (
        <p className="text-error text-sm text-end">{errors["query"]?.message}</p>
      )}
    </div>
  );
};

export default SearchBar;
