import DashboardLayout from "../../components/dashboard-layout";
import useSWR from "swr";
import api from "../../lib/api";
import Loader from "../../components/loader";
import {GoGitPullRequest, GoIssueOpened} from "react-icons/go";
import {toPrettyDate} from "../../utils";
import authenticatedRoute from "../../components/authenticated-route";
import Badge from "../../components/badge";

function ActivityStream() {

  const { data: issues, error, mutate } = useSWR('/repos/issues', api.get);
  const isLoading = !issues && !error;

  const Content = ({issues, isLoading, error}) => {
    if (isLoading) {
      return (
        <div className="mt-12">
          <Loader type="issue"/>
          <Loader type="issue"/>
          <Loader type="issue"/>
          <Loader type="issue"/>
          <Loader type="issue"/>
        </div>
      )
    }
    if (error) {
      return <div>Could not load activity stream ({error.message})</div>
    }
    if (!issues.length) {
      return <p className="mt-3">No activities available. Have you selected a repo?</p>
    }
    return (
      <ul className="mt-6">
        {
          issues.map((issue, index) => {
            const isPullRequest = issue.data.pull_request !== undefined
            const isOpen = issue.data.state === 'open'
            return (
              <li key={`issue-${index}`} className="my-8">
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-gray-500">{issue.repo.fullName}</p>
                  {
                    isOpen ?
                    <Badge color="text-green-800" background="bg-green-200">Open</Badge> :
                    <Badge color="text-red-800" background="bg-red-200">Closed</Badge>
                  }
                </div>
                <a href={issue.data.html_url} target="_blank" rel="noreferrer" className="flex flex-row items-center gap-2">
                  { isPullRequest ? <GoGitPullRequest/> : <GoIssueOpened/>}
                  <h2 className="my-0">{issue.data.title} (#{issue.data.number})</h2>
                </a>
                <p className="">{isPullRequest ? 'Pull Request' : 'Issue'} created by {issue.data.user.login} on {toPrettyDate(issue.createdOn)}</p>
              </li>
            );
          })
        }
      </ul>
    )
  }

  return (
    <DashboardLayout title="Activity Stream">
      <h1 className="mt-0">Activity Stream</h1>
      <Content issues={issues} isLoading={isLoading} error={error}/>
    </DashboardLayout>
  )
}

export default authenticatedRoute(ActivityStream)
