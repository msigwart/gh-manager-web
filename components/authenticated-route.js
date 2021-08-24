import {useAuth} from "./auth.provider";
import {useRouter} from "next/router";
import {useEffect} from "react";

const authenticatedRoute = (Component = null, options = {}) => {
  return function AuthenticatedRoute(props) {
    const auth = useAuth();
    const router = useRouter()

    useEffect(() => {
      if (!auth.isLoading && !auth.user || auth.error) {
        return router.push('/');
      }
    }, [auth]);

    return <Component {...props}/>
  }
};

export default authenticatedRoute;
