export default function WelcomeBanner() {
  return (
    <section className={`min-h-screen/3 flex flex-col justify-center`}>
      <h1 className={`text-6xl font-light`}>
        Welcome to <span className={`font-bold`}>GH Manager.</span>
      </h1>
      <p className={`text-xl`}>The easiest way to keep track of your GitHub Repositories.</p>
    </section>
  )
}
