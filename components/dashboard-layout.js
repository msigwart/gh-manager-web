import Layout from "../components/layout";
import {useRouter} from "next/router";
import Link from 'next/link';

export default function DashboardLayout({children, title}) {

  const router = useRouter();

  const menuItems = [
    { href: '/dashboard/repos', label: 'Manage Repos' },
    { href: '/dashboard/activity-stream', label: 'Activity Stream' },
    { href: '/dashboard/pull-requests', label: 'Pull Requests' }
  ];

  return (
    <Layout title={title}>
      <div className="flex flex-col md:flex-row gap-12 md:gap-28">
        <div className="flex flex-row md:flex-col">
          {
            menuItems.map((item, index) => (
              <Link key={`menu-${index}`} href={item.href}>
                <a className={`py-2 px-4 rounded text-black${item.href === router.pathname ? ' bg-purple-500 text-white' : ''}`}>{item.label}</a>
              </Link>
            ))
          }
        </div>
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </Layout>
  )
}
