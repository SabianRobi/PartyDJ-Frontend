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
  }
};
