import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import useQueryToggler from "./useQueryHandler";

function useAuthChecker() {
    const { pathname } = useQueryToggler()
    // const [authenticated, setAuthenticated] = useState(false);
    const refresh_token = Cookies.get("refresh_token")
    const access_token = Cookies.get("access_token")
    console.log(`Checking authentication: ${access_token} refresh token: ${refresh_token}`)
    // useEffect(() => {
    // const timer = setTimeout(() => {},  500);
    if (pathname && !refresh_token || !access_token) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        console.log("access and refresh tokens cleared and user logged out")
        window.location.href = "/auth/login";
    }
    // return () => {
    //     //   clearTimeout(timer);
    // };
    // }, [refresh_token, access_token]);

    // return authenticated
};

export default useAuthChecker;
