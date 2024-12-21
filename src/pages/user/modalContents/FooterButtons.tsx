import { Button } from "flowbite-react";

type FooterButtonsProps = {
  handleCloseModal: () => void;
};
const FooterButtons = (props: FooterButtonsProps) => {
  return (
    <div className={"flex flex-row justify-between pt-3 text-sm"}>
      <Button
        className={"bg-error hover:!bg-error/80"}
        onClick={() => props.handleCloseModal()}
      >
        Cancel
      </Button>
      <Button type={"submit"} className={"bg-success hover:!bg-success/50"}>
        Update
      </Button>
    </div>
  );
};

export default FooterButtons;
