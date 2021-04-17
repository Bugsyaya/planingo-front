import React from 'react'
import './editConstraintLesson.scss'
import { Form, Select } from 'antd'
import { useSelector } from 'react-redux'
import { selectors } from '../../../../Account/store'
import { useGetLessonConstraints, useLessonConstraintsSetting } from '../../../Settings/Constraints/Hook/lessonConstraints.hook'
import { useParams } from 'react-router'
import { Switch } from '@planingo/ditto'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const EditConstraintLesson = ({ setItem }) => {
    const accountId = useSelector(selectors.accountId)
	const { id } = useParams()
    const { data: lessonConstraintsSetting, loading: loadingLessonConstraintsSetting} = useLessonConstraintsSetting(accountId)
	const { data: lessonConstraints, loading: loadingLessonConstraints } = useGetLessonConstraints(id)

	if (loadingLessonConstraintsSetting || loadingLessonConstraints) return null

	return (
		<div className="editLesson">
			<Form
				initialValues={lessonConstraints?.constraints}
				onValuesChange={(values) => {
					setItem((item) => ({ ...item, ...values }))
				}}
				layout="vertical"
				hideRequiredMark
			>
				{lessonConstraintsSetting?.breakable && 
					<Form.Item 
						name="breakable" 
						label="Cours sécable"
					>
						<Switch
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
						/>
					</Form.Item>
				}
			</Form>
		</div>
	)
}

export default EditConstraintLesson
