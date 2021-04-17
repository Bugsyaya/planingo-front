import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Companies from '../Companies/Companies'
import '../application.scss'
import { useIntl } from 'react-intl'
import {
	AppstoreOutlined,
	UnorderedListOutlined,
	WifiOutlined,
	EditOutlined,
} from '@ant-design/icons'
import CompaniesList from '../Companies/CompaniesList'
import { useAddCompany, useEditCompany } from '../Companies/companies.hooks'
import Refinement from '../../Components/Refinement/refinement'
import Search from '../../Components/Search/search'

export const Company = () => {
	const options = [
		{ label: <AppstoreOutlined />, value: 'Grille' },
		{ label: <UnorderedListOutlined />, value: 'List' },
	]

	const [addCompany, { loading: addingCompany }] = useAddCompany()
	const [editCompany, { loading: editingCompany }] = useEditCompany()

	const intl = useIntl()

	const [isGrid, setIsGrid] = useState(true)

	const onCompanySearch = (value) => {
		setCompanySearch(value)
	}

	const [companySearch, setCompanySearch] = useState()
	
	return (
		<div>
            <Switch>
                <Route path="/companies/:id">
                    <Refinement
                        backTo="companies"
                        FirstActionIcon={WifiOutlined}
                        firstActionText={intl.formatMessage({ id: 'edit.company' })}
                        // FirstForm={AddCompany}
                        onFirstAction={editCompany}
                        firstActioning={editingCompany}
                        SecondActionIcon={EditOutlined}
                        secondActionText={intl.formatMessage({
                            id: 'edit.constraints',
                        })}
                        // SecondForm={AddCompany}
                        onSecondAction={addCompany}
                        secondActioning={addingCompany}
                        mainActionButton={intl.formatMessage({ id: 'edit' })}
                    />
                    <p>Coucou</p>
                </Route>
                <Route path="/companies/">
                    <div className="header">
                        <Search
                            placeholder="Rechercher une entreprise"
                            onSearch={onCompanySearch}
                        />
                        <Refinement
                            options={options}
                            setIsGrid={setIsGrid}
                            isGrid={isGrid}
                            FirstActionIcon={WifiOutlined}
                            firstActionText={intl.formatMessage({ id: 'add.company' })}
                            // FirstForm={AddCompany}
                            onFirstAction={addCompany}
                            firstActioning={addingCompany}
                        />
                    </div>
                    {!isGrid ? (
                        <CompaniesList companySearch={companySearch} />
                    ) : (
                        <Companies companySearch={companySearch} />
                    )}
                </Route>
            </Switch>
		</div>
	)
}