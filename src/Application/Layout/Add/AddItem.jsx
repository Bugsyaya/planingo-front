import React, { useState } from 'react'
import './addItem.scss'
import { Drawer } from 'antd'
import { Button } from '@planingo/ditto'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router'

const AddItem = ({
	Form,
	title,
	cta,
	secondary,
	onAdd,
	adding,
	onEdit,
	editing,
	mainActionButton,
}) => {
	const { id } = useParams()
	const intl = useIntl()
	const [visible, setVisible] = useState(false)
	const [item, setItem] = useState()
	return (
		<>
			<div className="addItem">
				<Button
					type="primary"
					label="add"
					ghost={secondary}
					onClick={() => setVisible(true)}
				>
					{cta || title}
				</Button>
			</div>
			<Drawer
				title={title}
				width={720}
				onClose={() => setVisible(false)}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
				footer={
					<div
						style={{
							textAlign: 'right',
						}}
					>
						<Button
							onClick={() => setVisible(false)}
							style={{ marginRight: 8 }}
						>
							{intl.formatMessage({ id: 'cancel' })}
						</Button>
						<Button
							disabled={!item}
							loading={adding || editing}
							onClick={async () => {
								if(onAdd){
									await onAdd(item, id)
									setVisible(false)
								} else if(onEdit){
									await onEdit(item, id)
									setVisible(false)
								}
							}}
							type="primary"
						>
							{mainActionButton
								? mainActionButton
								: intl.formatMessage({ id: 'add' })}
						</Button>
					</div>
				}
			>
				<Form setItem={setItem} />
			</Drawer>
		</>
	)
}

export default AddItem
