import '../styles/globals.css'
import AuthProvider from "../components/auth.provider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
