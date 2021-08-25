export default function Badge({color = 'text-black', background = 'bg-gray-200', children, className}) {
  return (
    <div className={`rounded-full whitespace-nowrap mx-2 align-middle text-xs py-1 px-3 inline ${background} ${color} ${className ? className : ''}`}>
      {children}
    </div>
  )
}
