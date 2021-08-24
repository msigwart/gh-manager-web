import Header from "./header";
import Footer from "./footer";
import Head from "next/head";

export default function Layout({ children, title }) {
  return (
  <>
    <Head>
      <title>GH Manager | {title}</title>
      <meta name="description" content="The easiest way to keep track of your GitHub projects." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="container mx-auto px-4 min-h-screen relative">
      <Header/>
      <main className={"py-7"}>
        {children}
      </main>
      <Footer/>
    </div>
  </>
  )
}
