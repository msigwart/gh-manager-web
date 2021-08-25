import Image from 'next/image'

export default function Footer() {
  return (
    <footer className={`absolute bottom-0 py-3`}>
      <a
        href="https://datawrapper.de"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center gap-2 text-black relative"
      >
        Powered by
        <div className="relative -bottom-1">
          <Image src="/datawrapper.png" alt="Datawrapper Logo" width={118} height={32} />
        </div>
      </a>
    </footer>
  )
}
