import dynamic from "next/dynamic";

const ContentLoader = dynamic(
  () => import('react-content-loader'),
  { ssr: false }
);

export default function Loader({ type = 'repo' }) {
  if (type === 'pull') {
    return (
      <ContentLoader viewBox="0 0 200 42">
        {/* Only SVG shapes */}
        <rect x="0" y="0" rx="2" ry="2" width="80" height="10" />
        <rect x="0" y="15" rx="2" ry="2" width="120" height="4" />
        <rect x="0" y="22" rx="2" ry="2" width="120" height="4" />
        <rect x="0" y="29" rx="2" ry="2" width="120" height="4" />
      </ContentLoader>
    )
  }
  if (type === 'issue') {
    return (
      <ContentLoader viewBox="0 0 200 30">
        {/* Only SVG shapes */}
        <rect x="0" y="0" rx="2" ry="2" width="80" height="4" />
        <rect x="0" y="7" rx="2" ry="2" width="120" height="8" />
        <rect x="0" y="18" rx="2" ry="2" width="100" height="4" />
      </ContentLoader>
    )
  }
  return (
    <ContentLoader viewBox="0 0 200 15">
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="2" ry="2" width="120" height="8" />
      <rect x="180" y="0" rx="2" ry="2" width="20" height="8" />
    </ContentLoader>
  )

}
