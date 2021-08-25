import Link from 'next/link';
import api from "../lib/api";
import {useAuth} from "./auth.provider";
import {useRouter} from "next/router";
import {FaGithub} from "react-icons/fa";
import {useEffect, useState} from "react";
import {toPrettyDate} from "../utils";

export default function Header() {

  const auth = useAuth();
  const router = useRouter();

  const logout = async () => {
    try {
      await auth.mutateUser(undefined, false);
      await api.delete('/auth/session');
    } catch (e) {
      console.warn(e);
    } finally {
      localStorage.removeItem('sessionId');
      await auth.mutateUser();
      await router.push('/');
    }
  }

  const [home, setHome] = useState('/')

  useEffect(() => {
    setHome(auth.user ? '/dashboard/repos' : '/');
  }, [auth.user])


  return (
    <header>
      <div className="flex flex-col sm:flex-row justify-between items-start py-4">
        <div className="text-3xl font-bold">
          <Link href={home}>
            <a className="text-black">GH Manager</a>
          </Link>
        </div>
        <div>
          {
            auth.user ?
              <div className="flex flex-col items-start">
                <div className="flex flex-row gap-2">
                  <div>Logged in as {auth.user.username}</div>
                  <button className="font-bold text-black" onClick={logout}>(Logout)</button>
                </div>
                <div className="text-gray-300 font-light text-sm">Last sync: {auth.user.lastSyncOn ? toPrettyDate(auth.user.lastSyncOn) : 'Never'}</div>
              </div> :
              <a className="text-black flex flex-row items-center gap-2"
                 href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=repo`}
              >
                Log in with Github <span className="text-2xl"><FaGithub/></span>
              </a>
          }
        </div>
      </div>
    </header>
  );
}
