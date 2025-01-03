import { Bounce, toast } from "react-toastify";

export const successToast = (text: string) => {
  toast.success(text, {
    position: "bottom-right",
    autoClose: 3000,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    className: "!bg-success !text-lightText"
  });
};

export const errorToast = (text: string) => {
  toast.error(text, {
    position: "bottom-right",
    autoClose: 3000,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    className: "!bg-error !text-lightText"
  });
};
