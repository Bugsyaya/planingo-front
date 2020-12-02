import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const getPathwaysQuerie = gql`
	query getAllPathways {
		pathway(order_by: { name: asc }) {
			description
			id
			name
		}
	}
`

export const useGetAllPathways = () => {
	const result = useQuery(getPathwaysQuerie)
	return result
}

export const useGetPathwayById = (id) => {
	const { loading, data } = useQuery(
		gql`
			query getPathwaysById($id: uuid!) {
				pathway_by_pk(id: $id) {
					created_at
					description
					id
					name
					updated_at
					modules {
						module {
							created_at
							description
							id
							name
							updated_at
						}
						id
					}
				}
			}
		`,
		{ variables: { id: id } },
	)
	return { loading, pathway: data?.pathway_by_pk }
}

export const useAddPathway = () => {
	const [addPathway, result] = useMutation(
		gql`
			mutation addPathway($pathway: pathway_insert_input!) {
				insert_pathway_one(object: $pathway) {
					description
					id
					name
				}
			}
		`,
		{
			refetchQueries: [
				{
					query: getPathwaysQuerie,
				},
			],
		},
	)

	return [(pathway) => addPathway({ variables: { pathway } }), result]
}

export const useEditPathway = () => {
	const [editPathway, result] = useMutation(
		gql`
			mutation editPathway($id: uuid!, $pathway: pathway_set_input) {
				update_pathway_by_pk(pk_columns: { id: $id }, _set: $pathway) {
					description
					id
					name
				}
			}
		`,
	)

	return [(pathway, id) => editPathway({ variables: { id, pathway } }), result]
}

export const useDeletePathwayById = () => {
	const [deletePathwayById, { loading, data }] = useMutation(
		gql`
			mutation deletePathwayById($id: uuid!) {
				delete_pathway_by_pk(id: $id) {
					id
				}
			}
		`,
		{
			refetchQueries: [
				{
					query: getPathwaysQuerie,
				},
			],
		},
	)

	return [
		(id) => deletePathwayById({ variables: { id } }),
		{ loading, company: data?.delete_pathway_by_pk },
	]
}
