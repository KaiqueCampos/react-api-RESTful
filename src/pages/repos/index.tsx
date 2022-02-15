import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { api } from "../../services/api"
import { Repository } from "../../types/repos"

import styles from './styles.module.scss'

export function Repos() {

  const { data, isFetching } = useQuery<Repository[]>('repos', async () => {
    const response = await api.get('users/KaiqueCampos/repos')

    return response.data
  }, {
    staleTime: 1000 * 60 // 1 minute
  })

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Repositories</h1>

      <div style={{
        marginTop: '2rem'
      }}>
        {isFetching && <p>Loading...</p>}

        {data?.map(repo => {
          return (
            <div className={styles.repositoryContainer} key={repo.full_name}>
              <Link className={styles.repoLink} to={`repos/${repo.full_name}`}>{repo.full_name}</Link>
              <p>{repo.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

