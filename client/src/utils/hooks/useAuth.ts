import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useGlobalState from "utils/dataStore";
import { isAuthenticated } from "utils/api";

export function useAuth() {
  const [auth, setAuth] = useState(false);
  const history = useHistory();
  const { token } = useGlobalState();

  // TODO: How to make sure token is actually valid for frontend validation.
  // -> fetch new token with each new request

  useEffect(() => {
    const redirect = async () => {
      const isAuth = await isAuthenticated(token);
      if (!isAuth) {
        console.log("authentication failed");
        history.push("/login");
      }
      console.log("authentication successful");
      setAuth(true);
    };

    redirect();
  }, [token]);

  return auth;
}
