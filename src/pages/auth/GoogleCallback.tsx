import { errorToast, successToast } from "#/components/utils";
import { useSetGoogleTokensMutation } from "#/redux/google/googleApiSlice";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get("code") ?? "";
  const state = urlParams.get("state") ?? "";
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  const [doSetGoogleTokens, { isError, isLoading, isSuccess, isUninitialized }] = useSetGoogleTokensMutation();

  useEffect(() => {
    doSetGoogleTokens({ code, state })
      .unwrap()
      .then(() => {
        console.info("Successfully connected Google!");
        successToast("Successfully connected Google!");
        void navigate(`/user/${user?.username}`);
      })
      .catch((error) => {
        console.info("Failed to connect Google: ", error);
        errorToast("Failed to connect Google!");
      });
  }, [code, state, doSetGoogleTokens, navigate, user?.username]);

  return (
    <p>
      {isSuccess && "Successfully connected with Google!"}
      {isError && "Failed to connect Google!"}
      {isUninitialized || isLoading || (isLoading && "Connecting Google...")}
    </p>
  );
};

export default GoogleCallback;
