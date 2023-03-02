/* adds the frontend styles to bundle */
import './style/style.scss';

import { useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';

import { threeJsBootStrap } from './edit';
import { TextDef } from './types';

/**
 * The save function defines the way in which the different attributes should be combined into the final markup, which is then serialized into post_content.
 *
 * @param    props
 * @param    props.attributes - the block attributes
 * @function Object() { [native code] }
 */
function Save( { attributes }: BlockSaveProps< TextDef > ): JSX.Element {
	const blockProps = useBlockProps.save();
	return (
		<div { ...blockProps }>
			<iframe
				title={ 'three-js' }
				className={ 'threejs-block' }
				style={ { width: '100%' } }
				dangerouslySetInnerHTML={ {
					__html: attributes.userScript,
				} }
			/>
		</div>
	);
}

export default Save;
