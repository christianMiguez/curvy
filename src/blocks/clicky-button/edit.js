import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Edit(props) {
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<RichText
				placeholder="your text here..."
				value={props.attributes.labelText}
				allowedFormats={[]}
				multiline={false}
				onSplit={() => {}}
				onReplace={() => {}}
				onChange={(newValue) => {
					props.setAttributes({ labelText: newValue });
				}}
			/>
		</div>
	);
}
