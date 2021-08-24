import Layout from "../components/layout";
import {useAuth} from "../components/auth.provider";
import WelcomeBanner from "../components/welcome-banner";
import {useRouter} from "next/router";

export default function Home() {

  const router = useRouter();
  const auth = useAuth();

  if (auth.user) {
    router.push('/dashboard');
  }

  return (
    <Layout title="Home">
      <WelcomeBanner/>
    </Layout>
  )
}
