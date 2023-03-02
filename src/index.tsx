import { registerBlockType } from '@wordpress/blocks';

/* adds styles to bundle */
import './style/style-admin.scss';

import blockConfig from '../block.json';

import { defaultScript } from './constants';
import Edit from './edit';
import Save from './save';

const icon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		strokeLinecap="square"
		strokeMiterlimit="10"
		viewBox="0 0 226.77 226.77"
	>
		<g
			fillRule="evenodd"
			stroke="#000"
			strokeLinecap="butt"
			strokeLinejoin="round"
			strokeWidth="4"
		>
			<path d="M71.984 204.863 28.771 29.923l173.23 49.874z" />
		</g>
	</svg>
);

const jsonData = blockConfig;

/** Registering the block with the name of the block and the attributes of the block. */
registerBlockType( jsonData.name, {
	...jsonData,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save: Save,
	icon,
	supports: {
		align: true,
		className: true,
		spacing: {
			margin: true, // Enable margin UI control.
			padding: true, // Enable padding UI control.
			blockGap: true, // Enables block spacing UI control.
		},
	},
	attributes: {
		height: {
			type: 'number',
			default: 500,
		},
		width: {
			type: 'number',
			default: 600,
		},
		userScript: {
			type: 'string',
			source: 'text',
			default: defaultScript,
		},
	},
} );
