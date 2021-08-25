import DashboardLayout from "../../components/dashboard-layout";
import useSWR from "swr";
import api from "../../lib/api";
import ListLoader from "../../components/list-loader";
import {useEffect, useState} from "react";
import {GoGitPullRequest} from "react-icons/go";

export default function PullRequests() {

  const { data: pullRequests, error, mutate } = useSWR('/repos/pulls', api.get);
  const isLoading = !pullRequests && !error;

  const [selectedGroup, setSelectedGroup] = useState('repo');
  const [groupedPRs, setGroupedPRs] = useState();
  const radioOptions = [
    { label: 'Repository', value: 'repo' },
    { label: 'Branch', value: 'branch' },
  ]

  const handleGroupByChange = (event) => {
    setSelectedGroup(event.target.value);
  }

  useEffect(() => {
    const branchReducer = (acc, value) => {
      if (!acc[value.data.base.ref]) {
        acc[value.data.base.ref] = [value];
        return acc;
      }
      acc[value.data.base.ref].push(value);
      return acc;
    }

    const repoReducer = (acc, value) => {
      console.log(acc, value);
      if (!acc[value.repo.fullName]) {
        acc[value.repo.fullName] = [value];
        return acc;
      }
      acc[value.repo.fullName].push(value);
      return acc;
    }

    const reducerMap = {
      repo: repoReducer,
      branch: branchReducer
    }
    if (!pullRequests) {
      return;
    }
    setGroupedPRs(pullRequests
      .map(pr => pr)
      .reduce(reducerMap[selectedGroup], {}))
  }, [selectedGroup, pullRequests])

  const Content = ({pullRequests, isLoading, error}) => {
    if (isLoading) {
      return (
        <div>
          <ListLoader/>
          <ListLoader/>
          <ListLoader/>
          <ListLoader/>
          <ListLoader/>
        </div>
      )
    }
    if (error) {
      return <div>Could not load pull requests ({error.message})</div>
    }
    return (
      <div className="my-6">
        {
          pullRequests && Object.keys(pullRequests).map((groupKey) => {
            return (
              <div key={groupKey} className="my-4">
                <h2 className="text-3xl text-gray-400 font-light">{groupKey}</h2>
                <ul className="">
                  {
                    pullRequests[groupKey].map((pr, index) => (
                      <li key={`pr-${index}`} className="">
                        {/*<div className="flex flex-row gap-2 items-center">*/}
                        {/*  <p className="text-gray-500">{pullRequest.repo.fullName}</p>*/}
                        {/*  <div className={`rounded-full text-xs py-1 px-3 ${isOpen ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>*/}
                        {/*    {isOpen ? 'Open' : 'Closed'}*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        <a href={pr.data.html_url} target="_blank" rel="noreferrer" className="flex flex-row items-center gap-2">
                          <GoGitPullRequest/>
                          <h2>{pr.data.title} (#{pr.data.number})</h2>
                        </a>
                        {/*<p>Created by {pullRequest.data.user.login} on {toPrettyDate(pullRequest.createdOn)}</p>*/}
                      </li>
                    ))
                  }
                </ul>
              </div>
            );
          })
        }
      </div>
    )
  }

  return (
    <DashboardLayout title="Pull Requests">
      <h1 className="mt-0">Pull Requests</h1>
      <form className="text-lg flex flex-row items-center my-6" onChange={handleGroupByChange}>
        <p className="mr-2">Group by:</p>
        <div className="flex flex-row mx-2">
          {
            radioOptions.map((option, index) => (
              <div key={`option-${index}`} className="flex flex-row items-center gap-2 mx-2">
                <input className="appearance-none border-gray-400 checked:bg-purple-400 checked:shadow-radio checked:border-purple-400 rounded-full p-3"
                       type="radio"
                       defaultChecked={option.value === selectedGroup}
                       id={`option-${index}`}
                       name="groupBy"
                       value={option.value}/>
                <label htmlFor={`option-${index}`}>{option.label}</label>
              </div>
            ))
          }
        </div>
      </form>
      <Content pullRequests={groupedPRs} isLoading={isLoading} error={error}/>
    </DashboardLayout>
  )
}
