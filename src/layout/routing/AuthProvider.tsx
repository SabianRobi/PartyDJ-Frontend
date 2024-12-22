import { useGetMeQuery } from "#/redux/auth/authApiSlice";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";
import { Outlet } from "react-router-dom";

const AuthProvider = () => {
  const { isLoading, isSuccess, isError, isUninitialized } = useGetMeQuery();
  const user = useAppSelector(selectCurrentUser);

  if (isLoading || isUninitialized) {
    //  TODO: Replace with loading spinner
    return <div>Loading...</div>;
  } else if (user || isSuccess || isError || !isUninitialized) {
    return <Outlet />;
  }

  return <div>Something unexpected happened :(</div>;
};

export default AuthProvider;
