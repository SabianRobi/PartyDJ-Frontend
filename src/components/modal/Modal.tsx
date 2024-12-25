import { Modal as FlowbiteModal } from "flowbite-react";
import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";

type EditModalProps = {
  title: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  initialFocus?: RefObject<HTMLInputElement>;
};

const Modal = (props: EditModalProps) => (
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
);

export default Modal;
