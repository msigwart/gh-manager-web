export default function Badge({color, background, children, className}) {
  return (
    <div className={`rounded-full whitespace-nowrap mx-2 align-middle text-xs py-1 px-3 inline bg-${background} text-${color} ${className}`}>
      {children}
    </div>
  )
}
