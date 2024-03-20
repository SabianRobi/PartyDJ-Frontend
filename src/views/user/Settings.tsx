import React from "react";
import { useParams } from "react-router-dom";
import Card from "./card/Card";
import CardRow from "./card/CardRow";
import { faLink, faLinkSlash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../generalComponents/modal/Modal";
import EditUsernameModalContent from "./modalContents/EditUsernameModalContent";
import EditEmailModalContent from "./modalContents/EditEmailModalContent";
import EditPasswordModalContent from "./modalContents/EditPasswordModalContent";

type ModalContent = {
  title: string;
  body: React.ReactNode;
};

const Settings = () => {
  let { username } = useParams();
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<ModalContent>({
    title: "Initial title",
    body: <></>,
  });

  const handleOpenEditUsernameModal = () => {
    setModalContent({
      title: "Editing username",
      body: <EditUsernameModalContent />,
    });
    setShowModal(true);
  };

  const handleOpenEditEmailModal = () => {
    setModalContent({
      title: "Editing email",
      body: <EditEmailModalContent handleCloseModal={handleCloseModal} />,
    });
    setShowModal(true);
  };

  const handleOpenEditPasswordModal = () => {
    setModalContent({
      title: "Editing password",
      body: <EditPasswordModalContent />,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={"flex flex-col gap-6"}>
      <Modal
        title={modalContent?.title}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {modalContent?.body}
      </Modal>

      <h3 className={"text-center text-2xl"}>Settings</h3>
      <Card title={"Account"}>
        <CardRow
          name={"Username"}
          value={<>{username}</>}
          icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          onIconClick={handleOpenEditUsernameModal}
        />
        <CardRow
          name={"Email"}
          value={<>user@ema.il</>}
          icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          onIconClick={handleOpenEditEmailModal}
        />
        <CardRow
          name={"Password"}
          icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          onIconClick={handleOpenEditPasswordModal}
        />
      </Card>

      <Card title={"Platforms"}>
        <CardRow
          name={"Spotify"}
          value={<>disconnected</>}
          icon={<FontAwesomeIcon icon={faLink} className={"text-success"} />}
        />
        <CardRow
          name={"Google"}
          value={<>connected</>}
          icon={<FontAwesomeIcon icon={faLinkSlash} className={"text-error"} />}
        />
      </Card>
    </div>
  );
};

export default Settings;
