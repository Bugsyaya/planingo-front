import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Lessons from '../Lessons/Lessons'
import '../application.scss'
import { useIntl } from 'react-intl'
import {
	AppstoreOutlined,
	UnorderedListOutlined,
	EditOutlined,
    TagsOutlined
} from '@ant-design/icons'
import DetailLesson from '../Lessons/Lesson/Detail/DetailLesson'
import LessonsList from '../Lessons/LessonsList'
import { useAddLesson, useEdit } from '../Lessons/lessons.hooks'
import Refinement from '../../Components/Refinement/refinement'
import Search from '../../Components/Search/search'
import AddLesson from '../Lessons/Lesson/Add/AddLesson'
import { useEditConstraints } from '../Settings/Constraints/Hook/lessonConstraints.hook'
import EditConstraint from '../Lessons/Lesson/Edit/EditConstraint'

export const Lesson = () => {
	const options = [
		{ label: <AppstoreOutlined />, value: 'Grille' },
		{ label: <UnorderedListOutlined />, value: 'List' },
	]

	const [addLesson, { loading: addingLesson }] = useAddLesson()
	const [edit, { loading: editingLesson }] = useEdit()
    const [editConstraints, {loading: editingConstraints}] = useEditConstraints()

	const intl = useIntl()

	const [isGrid, setIsGrid] = useState(true)

	const onLessonSearch = (value) => {
		setLessonSearch(value)
	}

	const [lessonSearch, setLessonSearch] = useState()
	
	return (
		<div>
            <Switch>
                <Route path="/lessons/:id">
                    <Refinement
                        backTo="lessons"
                        FirstActionIcon={TagsOutlined}
                        firstActionText={intl.formatMessage({ id: 'edit.lesson' })}
                        FirstForm={AddLesson}
                        onFirstAction={edit}
                        firstActioning={editingLesson}
                        SecondActionIcon={EditOutlined}
                        secondActionText={intl.formatMessage({
                            id: 'edit.constraints',
                        })}
                        SecondForm={EditConstraint}
                        onSecondAction={editConstraints}
                        secondActioning={editingConstraints}
                        mainActionButton={intl.formatMessage({ id: 'edit' })}
                    />
                    <DetailLesson />
                </Route>
                <Route path="/lessons/">
                    <div className="header">
                        <Search
                            placeholder="Rechercher un cours"
                            onSearch={onLessonSearch}
                        />
                        <Refinement
                            options={options}
                            setIsGrid={setIsGrid}
                            isGrid={isGrid}
                            FirstActionIcon={TagsOutlined}
                            firstActionText={intl.formatMessage({ id: 'add.lesson' })}
                            FirstForm={AddLesson}
                            onFirstAction={addLesson}
                            firstActioning={addingLesson}
                        />
                    </div>
                    {!isGrid ? (
                        <LessonsList lessonSearch={lessonSearch} />
                    ) : (
                        <Lessons lessonSearch={lessonSearch} />
                    )}
                </Route>
            </Switch>
		</div>
	)
}
