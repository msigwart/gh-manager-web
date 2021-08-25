import Layout from "../../components/layout";
import {useEffect} from "react";
import {useRouter} from "next/router";
import api from "../../lib/api";
import {useAuth} from "../../components/auth.provider";

export default function CallbackPage() {
  const router = useRouter();
  const auth = useAuth()

  useEffect(() => {
    const authorize = async (code) => {
      const { sessionId } = await api.post('/auth/session', { code });
      localStorage.setItem('sessionId', sessionId);
      await auth.mutateUser();
      await router.push('/dashboard/repos');
    }
    if (!router.isReady) {
      return;
    }
    const { code } = router.query;
    authorize(code)
      .then(() => console.log('Successfully authorized with GitHub'))
      .catch(err => console.warn('Something went wrong while authorizing with GitHub', err));
  }, [router.isReady])

  return (
    <Layout title="Authenticating...">
      <p>Authenticating with Github...</p>
    </Layout>
  )
}
