import DashboardLayout from "../../components/dashboard-layout";
import useSWR from "swr";
import api from "../../lib/api";

export default function Repos() {

  const Content = ({repos, isLoading, error}) => {
    if (isLoading) {
      return <div>Is Loading</div>
    }
    if (error) {
      return <div>Could not load repos ({error.message})</div>
    }
    return (
      <ul className="mt-6">
        {
          repos.map((repo, index) => (
            <li key={`repo-${index}`} className="flex flex-row justify-between my-2">
              <h2>{repo.fullName}</h2>
              <button className="border rounded bg-purple-500 text-white px-4 py-1">{repo.RepoUser.isFollowed ? 'Unfollow' : 'Follow'}</button>
            </li>
          ))
        }
      </ul>
    )
  }

  const { data: repos, error, mutate } = useSWR('/repos', api.get);

  const isLoading = !repos && !error;

  return (
    <DashboardLayout title="Manage Repos">
      <h1 className="mt-0">Manage repos</h1>
      <Content repos={repos} isLoading={isLoading} error={error}/>
    </DashboardLayout>
  )
}
