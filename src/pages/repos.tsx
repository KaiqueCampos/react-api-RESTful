import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { api } from "../services/api"
import { Repository } from "../types/repos"

export function Repos() {

  const { data, isFetching } = useQuery<Repository[]>('repos', async () => {
    const response = await api.get('users/KaiqueCampos/repos')

    return response.data
  }, {
    staleTime: 1000 * 60 // 1 minute
  })

  return (
    <ul>
      {isFetching && <p>Loading...</p>}

      {data?.map(repo => {
        return (
          <li key={repo.full_name}>
            <Link to={`repos/${repo.full_name}`}>{repo.full_name}</Link>
            <p>{repo.description}</p>
          </li>
        )
      })}
    </ul>
  )
}

