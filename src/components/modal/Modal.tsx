import { Flowbite, Modal as FlowbiteModal } from "flowbite-react";
import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { customTheme } from "./utils";

type EditModalProps = {
  title: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  initialFocus?: RefObject<HTMLInputElement>;
};

const Modal = (props: EditModalProps) => (
  <Flowbite theme={{ theme: customTheme }}>
    <FlowbiteModal
      show={props.showModal}
      size="sm"
      onClose={() => props.setShowModal(false)}
      dismissible={true}
      initialFocus={props.initialFocus}
    >
      <FlowbiteModal.Header>{props.title}</FlowbiteModal.Header>
      <FlowbiteModal.Body>{props.children}</FlowbiteModal.Body>
    </FlowbiteModal>
  </Flowbite>
);

export default Modal;
