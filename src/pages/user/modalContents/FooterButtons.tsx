import { Button } from "flowbite-react";
import { FormInputEnum } from "./utils";

type FooterButtonsProps = {
  handleCloseModal: () => void;
  type?: FormInputEnum;
};

const FooterButtons = ({ handleCloseModal, type }: FooterButtonsProps) => (
  <div className="flex flex-row justify-between pt-3 text-sm">
    <Button className="bg-error hover:!bg-error/80" onClick={handleCloseModal}>
      Cancel
    </Button>
    <Button type="submit" className="bg-success hover:!bg-success/50">
      {type === FormInputEnum.DeleteAccountInput ? "Delete" : "Update"}
    </Button>
  </div>
);

export default FooterButtons;
