import {GoGitPullRequest} from "react-icons/go";
import Badge from "./badge";

export default function PullRequestListItem({pullRequest, mode }) {

  const StatusBadge = () => {
    if (pullRequest.data.state === 'closed' && pullRequest.data.merged_at) {
      return <Badge color='text-purple-800' background="bg-purple-300">Merged</Badge>
    }
    if (pullRequest.data.state === 'closed') {
      return <Badge color='text-red-800' background="bg-red-200">Closed</Badge>
    }
    if (!pullRequest.reviews.length) {
      return <Badge color='text-yellow-600' background="bg-yellow-200">Needs Review</Badge>
    }
    if (pullRequest.reviews.find(el => el.data.state === 'APPROVED')) {
      return <Badge color='text-green-800' background="bg-green-200">Approved</Badge>
    }
    if (pullRequest.reviews.find(el => el.data.state === 'CHANGES_REQUESTED')) {
      return <Badge color='text-yellow-600' background="bg-yellow-200">Changes Requested</Badge>
    }
    return <Badge>In Review</Badge>
  }

  return (
    <li className="">
      <a href={pullRequest.data.html_url} target="_blank" rel="noreferrer" className="flex flex-row items-center gap-2">
        <GoGitPullRequest/>
        <h3 className="">
          {
            mode === 'repo' ?
              `${pullRequest.repo.fullName} #${pullRequest.data.number}` :
              `${pullRequest.data.title} (#${pullRequest.data.number})`
          }
          <StatusBadge/>
        </h3>
      </a>
    </li>
  )
}
