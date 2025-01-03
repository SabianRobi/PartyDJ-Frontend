import Modal from "#/components/modal/Modal";
import { errorToast, successToast } from "#/components/utils";
import { useDisconnectGoogleMutation, useLazyGetGoogleAuthUrlQuery } from "#/redux/google/googleApiSlice";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";
import { useDisconnectSpotifyMutation, useLazyGetSpotifyAuthUrlQuery } from "#/redux/spotify/spotifyApiSlice";
import { faLink, faLinkSlash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "flowbite-react";
import { type ReactNode, useState } from "react";
import Card from "./card/Card";
import CardRow from "./card/CardRow";
import DeleteAccountModalContent from "./modalContents/DeleteAccountModalContent";
import EditEmailModalContent from "./modalContents/EditEmailModalContent";
import EditPasswordModalContent from "./modalContents/EditPasswordModalContent";
import EditUsernameModalContent from "./modalContents/EditUsernameModalContent";
import ModalContent from "./modalContents/ModalContent";
import { FormInputEnum } from "./modalContents/utils";

type TModalContent = {
  title: string;
  body: ReactNode;
};

const UserSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<TModalContent>({
    title: "Initial title",
    body: <></>
  });
  const user = useAppSelector(selectCurrentUser);

  // Spotify
  const [doGetSpotifyAuthUrl] = useLazyGetSpotifyAuthUrlQuery();
  const [doDisconnectSpotify] = useDisconnectSpotifyMutation();

  // Google
  const [doGetGoogleAuthUrl] = useLazyGetGoogleAuthUrlQuery();
  const [doDisconnectGoogle] = useDisconnectGoogleMutation();

  const handleOpenEditUsernameModal = () => {
    setModalContent({
      title: "Editing username",
      body: (
        <ModalContent handleCloseModal={handleCloseModal} type={FormInputEnum.EditUsernameInput}>
          <EditUsernameModalContent />
        </ModalContent>
      )
    });
    setShowModal(true);
  };

  const handleOpenEditEmailModal = () => {
    setModalContent({
      title: "Editing email",
      body: (
        <ModalContent handleCloseModal={handleCloseModal} type={FormInputEnum.EditEmailInput}>
          <EditEmailModalContent />
        </ModalContent>
      )
    });
    setShowModal(true);
  };

  const handleOpenEditPasswordModal = () => {
    setModalContent({
      title: "Editing password",
      body: (
        <ModalContent handleCloseModal={handleCloseModal} type={FormInputEnum.EditPasswordInput}>
          <EditPasswordModalContent />
        </ModalContent>
      )
    });
    setShowModal(true);
  };

  const handleOpenDeleteAccountModal = () => {
    setModalContent({
      title: "Deleting account",
      body: (
        <ModalContent handleCloseModal={handleCloseModal} type={FormInputEnum.DeleteAccountInput}>
          <DeleteAccountModalContent />
        </ModalContent>
      )
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGetSpotifyAuthUrl = () => {
    console.info("Requesting Spotify login url...");

    doGetSpotifyAuthUrl()
      .unwrap()
      .then((data) => {
        console.info("Successfully got the Spotify login url!");
        console.info("Redirecting to Spotify login page...");
        window.location.href = data.uri;
      })
      .catch((error) => {
        console.info("Failed to get Spotify login url: ", error);
        errorToast("Failed to get Spotify login url!");
      });
  };

  const handleDisconnectSpotify = () => {
    console.info("Requesting to log out from Spotify...");

    doDisconnectSpotify()
      .unwrap()
      .then(() => {
        console.info("Successfully disconnected Spotify!");
        successToast("Successfully disconnected Spotify!");
      })
      .catch((error) => {
        console.info("Failed to disconnect Spotify: ", error);
        errorToast("Failed to disconnect Spotify!");
      });
  };

  const handleGetGoogleAuthUrl = () => {
    console.info("Requesting Google login url...");

    doGetGoogleAuthUrl()
      .unwrap()
      .then((data) => {
        console.info("Successfully got the Google login url!");
        console.info("Redirecting to Google login page...");
        window.location.href = data.uri;
      })
      .catch((error) => {
        console.info("Failed to get Google login url: ", error);
        errorToast("Failed to get Google login url!");
      });
  };

  const handleDisconnectGoogle = () => {
    console.info("Requesting to log out from Google...");

    doDisconnectGoogle()
      .unwrap()
      .then(() => {
        console.info("Successfully disconnected Google!");
        successToast("Successfully disconnected Google!");
      })
      .catch((error) => {
        console.info("Failed to disconnect Google: ", error);
        errorToast("Failed to disconnect Google!");
      });
  };

  return (
    <div className="flex flex-col gap-6 justify-between items-center h-full">
      <Modal title={modalContent.title} showModal={showModal} setShowModal={setShowModal}>
        {modalContent.body}
      </Modal>

      <div className="flex flex-col items-center gap-6">
        <h3 className="text-center text-2xl">Settings</h3>
        <Card title="Account">
          <CardRow
            name="Username"
            value={<>{user?.username}</>}
            icon={<FontAwesomeIcon icon={faPen} className="text-orange" />}
            onIconClick={handleOpenEditUsernameModal}
          />
          <CardRow
            name="Email"
            value={<>{user?.email}</>}
            icon={<FontAwesomeIcon icon={faPen} className="text-orange" />}
            onIconClick={handleOpenEditEmailModal}
          />
          <CardRow
            name="Password"
            icon={<FontAwesomeIcon icon={faPen} className="text-orange" />}
            onIconClick={handleOpenEditPasswordModal}
          />
        </Card>

        <Card title="Platforms">
          <CardRow
            name="Spotify"
            value={<>{user?.spotifyConnected ? "connected" : "disconnected"}</>}
            icon={
              user?.spotifyConnected ? (
                <FontAwesomeIcon icon={faLinkSlash} className="text-error" title="Disconnect" />
              ) : (
                <FontAwesomeIcon icon={faLink} className="text-success" title="Connect" />
              )
            }
            onIconClick={user?.spotifyConnected ? handleDisconnectSpotify : handleGetSpotifyAuthUrl}
          />
          <CardRow
            name="Google"
            value={<>{user?.googleConnected ? "connected" : "disconnected"}</>}
            icon={
              user?.googleConnected ? (
                <FontAwesomeIcon icon={faLinkSlash} className="text-error" title="Disconnect" />
              ) : (
                <FontAwesomeIcon icon={faLink} className="text-success" title="Connect" />
              )
            }
            onIconClick={user?.googleConnected ? handleDisconnectGoogle : handleGetGoogleAuthUrl}
          />
        </Card>
      </div>
      <div>
        <Button className="bg-primary text-error min-w-[300px]" onClick={handleOpenDeleteAccountModal}>
          Delete account
        </Button>
      </div>
    </div>
  );
};

export default UserSettings;
