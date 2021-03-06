import DashboardLayout from "../../components/dashboard-layout";
import useSWR from "swr";
import api from "../../lib/api";
import dynamic from "next/dynamic";
import authenticatedRoute from "../../components/authenticated-route";
import Loader from "../../components/loader";

function Repos() {

  const { data: repos, error, mutate } = useSWR('/repos', api.get);
  const isLoading = !repos && !error;

  const toggleFollow = async (repo) => {
    try {
      await api.patch(`/repos/${repo.id}`, { isFollowed: !repo.RepoUser.isFollowed })
      await mutate();
    } catch (e) {
      console.warn('Something went wrong while trying to follow/unfollow repo', e);
    }
  }

  const Content = ({repos, isLoading, error}) => {
    if (isLoading) {
      return (
        <div className="mt-12">
          <Loader/>
          <Loader/>
          <Loader/>
          <Loader/>
          <Loader/>
          <Loader/>
          <Loader/>
          <Loader/>
          <Loader/>
          <Loader/>
        </div>
      )
    }
    if (error) {
      return <div>Could not load repos ({error.message})</div>
    }
    return (
      <ul className="mt-6">
        {
          repos.map((repo, index) => {
            const isFollowed = repo.RepoUser.isFollowed;
            return (
              <li key={`repo-${index}`} className="flex flex-row justify-between my-2">
                <h2>{repo.fullName}</h2>
                <button className={`border rounded ${isFollowed ? 'bg-purple-500 text-white' : 'bg-gray-200'} px-4 py-1`}
                        onClick={() => toggleFollow(repo)}>
                  {isFollowed ? 'Following' : 'Follow'}
                </button>
              </li>
            );
          })
        }
      </ul>
    )
  }


  return (
    <DashboardLayout title="Manage Repos">
      <h1 className="mt-0">Manage repos</h1>
      <Content repos={repos} isLoading={isLoading} error={error}/>
    </DashboardLayout>
  )
}

export default authenticatedRoute(Repos)
