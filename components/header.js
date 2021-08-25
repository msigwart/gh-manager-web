import Link from 'next/link';
import api from "../lib/api";
import {useAuth} from "./auth.provider";
import {useRouter} from "next/router";
import {FaGithub} from "react-icons/fa";
import {useEffect, useState} from "react";

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
      <div className="flex flex-col sm:flex-row justify-between items-center py-4">
        <div className="text-3xl font-bold">
          <Link href={home}>
            <a className="text-black">GH Manager</a>
          </Link>
        </div>
        <div>
          {
            auth.user ?
              <div className="flex flex-row items-center">
                Logged in as {auth.user.username} (<button className="font-bold text-black" onClick={logout}>Logout</button>)
              </div> :
              <a className="text-black flex flex-row items-center gap-2"
                 href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
              >
                Log in with Github <span className="text-2xl"><FaGithub/></span>
              </a>
          }
        </div>
      </div>
    </header>
  );
}
