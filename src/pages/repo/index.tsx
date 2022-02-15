import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "../../types/repos";
import styles from './styles.module.scss';

export function Repo() {

    const params = useParams()
    const currentRepository = params['*'] as string;

    const queryClient = useQueryClient()

    async function handleChangeRepositoryDescription() {

        // invalidateQueries function will invalidated all the requisition,  ignoring the staleTime. Making one more HTTP request.
        // await queryClient.invalidateQueries(['repos'])

        const previousRepos = queryClient.getQueryData<Repository[]>('repos')

        // refresh the data using cache information, without the need for a new HTTP request.
        if (previousRepos) {
            const nextRepos = previousRepos.map(repo => {
                if (repo.full_name === currentRepository) {
                    return { ...repo, description: 'new description' }

                } else {
                    return repo;
                }
            })

            queryClient.setQueryData('repos', nextRepos)
        }
    }

    return (
        <div className={styles.container}>
            <p>{currentRepository}</p>
            <button onClick={handleChangeRepositoryDescription}>Change Repository Description</button>
        </div>
    )
}