import NoData from '../../Extra/NoData'
import { useIntl } from 'react-intl'
import React from 'react'
import './students.scss'
import AddStudent from './Student/Add/AddStudent'
import { useGetAllStudents } from './students.hooks'
import { Table, Radio } from 'antd'
import { withSize } from 'react-sizeme'
import AddItem from '../Layout/Add/AddItem'

const StudentsList = ({ size, setIsGrid, options, isGrid }) => {
	const intl = useIntl()
	const { data, loading } = useGetAllStudents()
	function onChange(pagination, filters, sorter, extra) {
		console.log('params', pagination, filters, sorter, extra)
	}

	const uniqueP = new Set(data.student.map(s => s.pathway.name))

	console.log(JSON.stringify([...uniqueP].map(s => ({ text: s, value: s }))))

	const columns = [
		{
			title: 'Photo',
			dataIndex: 'image',
			render: (picture, record) =>
				picture ? (
					<img src={picture} alt={`${record.id} student image`} />
				) : (
					<img
						src={`https://api.adorable.io/avatars/285/${record.id}_${record.pathway.id}.png`}
						alt="placeholder"
					/>
				),
		},
		{
			title: 'First name',
			dataIndex: 'firstName',
		},
		{
			title: 'Last name',
			dataIndex: 'lastName',
		},
		{
			title: 'Pathway',
			dataIndex: 'pathway',
			render: pathway => pathway.name,
			filters: [...uniqueP].map(s => ({ text: s, value: s })),
			onFilter: (value, record) => record.pathway.name === value,
		},
	]

	if (loading) return <div>Loading....</div>

	if (!data)
		return (
			<NoData
				Add={AddStudent}
				cta={intl.formatMessage({ id: 'add.student' })}
				description={intl.formatMessage({ id: 'no.data.student' })}
				title={intl.formatMessage({ id: 'add.student' })}
			/>
		)
	return (
		<>
			<div className="refinement">
				<Radio.Group
					options={options}
					onChange={() => setIsGrid(!isGrid)}
					value={isGrid ? 'Grille' : 'List'}
					optionType="button"
					buttonStyle="solid"
				/>
				<AddItem title={intl.formatMessage({ id: 'add.student' })}>
					<AddStudent />
				</AddItem>
			</div>
			<div className="students">
				<Table
					tableLayout="fixed"
					scroll={{ y: size.height - 110 }}
					pagination={false}
					rowKey={record => record.id}
					columns={columns}
					dataSource={data?.student}
					onChange={onChange}
				/>
			</div>
		</>
	)
}

export default withSize({ monitorHeight: true, monitorWidth: false })(
	StudentsList,
)