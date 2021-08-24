import dynamic from "next/dynamic";

const ContentLoader = dynamic(
  () => import('react-content-loader'),
  { ssr: false }
);

export default function ListLoader() {
  return (
    <ContentLoader viewBox="0 0 200 20">
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="5" ry="5" width="200" height="20" />
    </ContentLoader>
  )
}
