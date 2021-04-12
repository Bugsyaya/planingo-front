import React, { useState } from 'react'
import './addStudent.scss'
import { Form, Input, Select, Switch } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import { useGetAllPathways } from '../../../Pathways/pathways.hooks'
import { useGetStudentById } from '../../students.hooks'
import { useParams } from 'react-router'
import { useGetAllCompanies } from '../../../Companies/companies.hooks'

const AddStudent = ({ setItem }) => {
	const { id } = useParams()

	const [apprentice, setApprentice] = useState(false)
	const { Option } = Select

	const { loading: studentLoading, student } = useGetStudentById(id)
	const { data, loading } = useGetAllPathways()
	const companies = useGetAllCompanies()
	
	function onChange(e) {
		console.log(`checked = ${e.target.checked}`);
	}

	if (studentLoading || companies.loading) return null

	return (
		<div className="addStudent">
			<Form
				initialValues={student}
				onValuesChange={(values) => {
					setItem((item) => ({ ...item, ...values }))
				}}
				layout="vertical"
				hideRequiredMark
			>
				<Form.Item
					name="lastName"
					label="Nom"
					rules={[{ required: true, message: 'Please enter user name' }]}
				>
					<Input placeholder="Please enter user name" />
				</Form.Item>
				<Form.Item
					name="firstName"
					label="Prénom"
					rules={[{ required: true, message: 'Please enter user name' }]}
				>
					<Input placeholder="Please enter user name" />
				</Form.Item>
				<Form.Item
					name="pathwayId"
					label="Formation"
					rules={[{ required: true, message: 'Please choose a pathway' }]}
				>
					<Select>
						{!loading &&
							data.pathway.map((path) => (
								<Option key={path.id}>{path.name}</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item
					name="apprentice"
					label="Apprentissage"
				>
					<Switch
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
							checked={apprentice}
							onChange={() => setApprentice(!apprentice)}
						/>
				</Form.Item>
				{apprentice && 
					<Form.Item
						name="compagnies"
						label="Entreprise"
						rules={[{ required: true, message: 'Please choose a pathway' }]}
					>
						<Select>
							{!companies.loading &&
								companies.data.company.map((company) => (
									<Option key={company.id}>{company.name}</Option>
								))}
						</Select>
					</Form.Item>
				}
			</Form>
		</div>
	)
}

export default AddStudent
