import type { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme = {
  modal: {
    content: {
      base: "relative h-full w-full p-4 md:h-auto",
      inner: "relative rounded-2xl text-lightText p-2 bg-secondary shadow flex flex-col max-h-[90dvh]"
    },
    header: {
      base: "flex items-start justify-between rounded-t dark:border-gray-600 border-b p-3",
      title: "text-xl ",
      close: {
        base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-lightText/75 hover:bg-tertiary hover:text-lightText"
      }
    },
    body: {
      base: "p-5 flex-1 overflow-auto"
    }
  },
  toggleSwitch: {
    root: {
      active: {
        off: "cursor-not-allowed opacity-50"
      },
      label: "ms-3 mt-0.5 text-start text-sm font-medium text-textLight"
    },
    toggle: {
      checked: {
        off: "border-error bg-gray-200 bg-error",
        color: {
          green: "border-success bg-success"
        }
      },
      sizes: {
        sm: "h-5 w-9 min-w-9 after:left-px after:top-px after:h-4 after:w-4 rtl:after:right-px",
        md: "h-6 w-11 min-w-11 after:left-px after:top-px after:h-5 after:w-5 rtl:after:right-px",
        lg: "h-7 w-14 min-w-14 after:left-1 after:top-0.5 after:h-6 after:w-6 rtl:after:right-1"
      }
    }
  },
  dropdown: {
    content: "py-1 focus:outline-none bg-secondary rounded",
    floating: {
      divider: "my-1 h-px bg-tertiary",
      header: "px-4 py-2 text-sm text-lightText",
      item: {
        base: "flex items-center justify-start py-2 px-4 text-sm text-lightText cursor-pointer w-full hover:bg-tertiary focus:outline-none"
      },
      style: {
        auto: ""
      }
    }
  }
};
