import Layout from "../components/layout";
import {useEffect, useState} from "react";
import {useAuth} from "../components/auth.provider";
import {useRouter} from "next/router";
import api from "../lib/api";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const auth = useAuth();
  const router = useRouter();

  const login = async (token, signal) => {
    try {
      setLoading(true);
      const {sessionId} = await api.post('/auth/session', {token}, {signal});
      localStorage.setItem('sessionId', sessionId);
      await auth.mutateUser();
      await router.push('/dashboard');
    } catch (e) {
      console.warn(e);
      setError(e.message);
      await router.push('/login', undefined, { shallow: true });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (auth.isLoading) {
      return;
    }
    if (auth.user) {
      return router.push('/dashboard');
    }
    if (!router.isReady) {
      return;
    }
    const token = router.query.token;
    if (token) {
      const ac = new AbortController();
      login(token, ac.signal);
      return () => ac.abort();
    }
  }, [router.isReady, auth]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setError(undefined);
      setLoading(true)
      await api.post('/auth/login', { email });
      setSuccess(true);
    } catch (e) {
      console.warn(e);
      setError(e);
    } finally {
      setLoading(false)
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  return (
    <Layout logoOnly title="Login">
      <div className={"flex flex-col justify-center gap-4 max-w-md mx-auto"}>
      { error &&
        <div>
          <p className="text-red-500">{error}</p>
        </div>
      }
      {!isSuccess ?
        <form className="flex flex-col justify-center gap-4" onSubmit={handleSubmit}>
          <input className=""
                 placeholder="Enter your email"
                 type="email"
                 value={email}
                 disabled={isLoading}
                 onChange={handleEmailChange}/>
          <input type="submit"
                 className=""
                 disabled={isLoading}
                 value="Next"/>
        </form> :
        <div>
          <p>Check your inbox. We just sent you a login link via email.</p>
          <p>Just click on the link in the email to log into your account.</p>
        </div>
      }
      </div>
    </Layout>
  )
}
