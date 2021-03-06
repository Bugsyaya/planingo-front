import React from 'react'
import './modules.scss'
import Module from './Module/Module'
import { useGetAllModules } from './modules.hooks'
import Gallery from '../Layout/Gallery'
import NoData from '../../Extra/NoData'
import { useIntl } from 'react-intl'
import AddModule from './Module/Add/AddModule'
import { Spin } from '@planingo/ditto'

const Modules = ({ moduleSearch }) => {
	const intl = useIntl()
	const { data, loading } = useGetAllModules()

	if (loading)
		return (
			<div>
				<Spin size="large" />
			</div>
		)

	if (!data)
		return (
			<NoData
				Add={AddModule}
				cta={intl.formatMessage({ id: 'add.module' })}
				description={intl.formatMessage({ id: 'no.data.module' })}
				title={intl.formatMessage({ id: 'add.module' })}
			/>
		)

	const modules = moduleSearch
		? data.module.filter((c) =>
				c.name.toLowerCase().includes(moduleSearch.toLowerCase()),
		  )
		: data.module

	return (
		<div className="modules">
			<Gallery
				datas={modules}
				loading={loading}
				Item={Module}
				Add={AddModule}
				title={intl.formatMessage({ id: 'add.module' })}
			/>
		</div>
	)
}

export default Modules
