import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import { Panel, PanelBody, TextareaControl } from '@wordpress/components';
import { createRef, useEffect, useState } from '@wordpress/element';
import { TextDef } from './types';

export function threeJsBootStrap( script: string ): string {
	return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><style>body{margin: 0}</style></head>
<body>
<script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
<script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three/build/three.module.js",
      "three/addons/": "https://unpkg.com/three/examples/jsm/"
    }
  }
</script>
<script type="module">
  import * as THREE from 'three';
	${ script }
</script>
</body>
</html>`;
}

/**
 * The edit function describes the structure of your block in the context of the editor.
 *
 * @param props
 * @param props.attributes    - the block attributes
 * @param props.setAttributes - the setState function
 *
 * @param props.isSelected
 */
export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
}: BlockEditProps< TextDef > ): JSX.Element {
	const { userScript, width, height, className } = attributes;
	const [ loaded, setLoaded ] = useState( false );
	const [ code, setCode ] = useState( '' );
	const iframe = createRef< HTMLIFrameElement >();
	let iframeDoc: Document | undefined;

	const runCode = () => {
		const currentIframe = iframe.current!;
		iframeDoc = currentIframe.contentWindow?.document;

		if ( iframeDoc ) {
			iframeDoc.open();
			setCode( threeJsBootStrap( userScript ) );
			iframeDoc.close();
		}
	};

	useEffect( () => {
		runCode();
	}, [ userScript ] );

	useEffect( () => {
		if ( ! loaded && iframeDoc ) {
			runCode();
			setLoaded( true );
		}
	}, [ iframeDoc ] );

	const blockProps = useBlockProps( className );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<Panel>
					<PanelBody title="ThreeJs">
						<TextareaControl
							label={ 'Three js script' }
							value={ userScript }
							onChange={ ( newValue ) =>
								setAttributes( {
									userScript: newValue,
								} )
							}
						></TextareaControl>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div>
				<iframe
					title={ 'three-js' }
					className={ 'threejs-block' }
					ref={ iframe }
					style={ { width: '100%' } }
					srcDoc={ code }
				></iframe>
			</div>
		</div>
	);
}
