import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Rooms from '../Rooms/Rooms'
import '../application.scss'
import { useIntl } from 'react-intl'
import {
	AppstoreOutlined,
	UnorderedListOutlined,
	EditOutlined,
    ShopOutlined
} from '@ant-design/icons'
import DetailRoom from '../Rooms/Room/Detail/DetailRoom'
import RoomsList from '../Rooms/RoomsList'
import { useAddRoom, useEdit } from '../Rooms/rooms.hooks'
import Refinement from '../../Components/Refinement/refinement'
import Search from '../../Components/Search/search'
import AddRoom from '../Rooms/Room/Add/AddRoom'
import { useEditConstraints } from '../Settings/Constraints/Hook/roomConstraints.hook'
import EditConstraint from '../Rooms/Room/Edit/EditConstraint'

export const Room = () => {
	const options = [
		{ label: <AppstoreOutlined />, value: 'Grille' },
		{ label: <UnorderedListOutlined />, value: 'List' },
	]

	const [addRoom, { loading: addingRoom }] = useAddRoom()
	const [edit, { loading: editingRoom }] = useEdit()
    const [editConstraints, {loading: editingRoomConstraints}] = useEditConstraints()

	const intl = useIntl()

	const [isGrid, setIsGrid] = useState(true)

	const onRoomSearch = (value) => {
		setRoomSearch(value)
	}

	const [roomSearch, setRoomSearch] = useState()
	
	return (
		<div>
            <Switch>
                <Route path="/rooms/:id">
                    <Refinement
                        backTo="rooms"
                        FirstActionIcon={ShopOutlined}
                        firstActionText={intl.formatMessage({ id: 'edit.room' })}
                        FirstForm={AddRoom}
                        onFirstAction={edit}
                        firstActioning={editingRoom}
                        SecondActionIcon={EditOutlined}
                        secondActionText={intl.formatMessage({
                            id: 'edit.constraints',
                        })}
                        SecondForm={EditConstraint}
                        onSecondAction={editConstraints}
                        secondActioning={editingRoomConstraints}
                        mainActionButton={intl.formatMessage({ id: 'edit' })}
                    />
                    <DetailRoom />
                </Route>
                <Route path="/rooms/">
                    <div className="header">
                        <Search
                            placeholder="Rechercher une salle"
                            onSearch={onRoomSearch}
                        />
                        <Refinement
                            options={options}
                            setIsGrid={setIsGrid}
                            isGrid={isGrid}
                            FirstActionIcon={ShopOutlined}
                            firstActionText={intl.formatMessage({ id: 'add.room' })}
                            FirstForm={AddRoom}
                            onFirstAction={addRoom}
                            firstActioning={addingRoom}
                        />
                    </div>
                    {!isGrid ? (
                        <RoomsList roomSearch={roomSearch} />
                    ) : (
                        <Rooms roomSearch={roomSearch} />
                    )}
                </Route>
            </Switch>
		</div>
	)
}
