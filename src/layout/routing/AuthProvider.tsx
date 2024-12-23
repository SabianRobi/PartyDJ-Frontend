import { useGetMeQuery } from "#/redux/auth/authApiSlice";
import { setUser } from "#/redux/auth/authSlice";
import { selectCurrentUser, useAppDispatch, useAppSelector } from "#/redux/hooks";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const AuthProvider = () => {
  const { isLoading, isSuccess, isError, isUninitialized, data } = useGetMeQuery();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  if (isLoading || isUninitialized) {
    //  TODO: Replace with loading spinner
    return <div>Loading...</div>;
  } else if (user || isSuccess || isError || !isUninitialized) {
    return <Outlet />;
  }

  return <div>Something unexpected happened :(</div>;
};

export default AuthProvider;
