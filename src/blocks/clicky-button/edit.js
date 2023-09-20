import {
	useBlockProps,
	RichText,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

export default function Edit(props) {
	const postTypes = useSelect((select) => {
		const data = select("core").getEntityRecords("root", "postType", {
			per_page: -1,
		});
		return data?.filter(
			(item) => item.visibility.show_in_nav_menus && item.visibility.show_ui
		);
	});
	const posts = useSelect(
		(select) => {
			const data = select("core").getEntityRecords(
				"postType",
				props.attributes.postType,
				{
					per_page: -1,
				}
			);
			return data;
		},
		[props.attributes.postType]
	);
	console.log({ posts });
	const blockProps = useBlockProps();
	return (
		<>
			<InspectorControls>
				<PanelBody title="destinations">
					<SelectControl
						label="Type"
						value={props.attributes.postType}
						onChange={(newValue) => {
							props.setAttributes({ postType: newValue });
						}}
						options={[
							{
								label: "Select Post Type...",
								value: "",
							},
							...(postTypes || []).map((item) => ({
								label: item.labels.singular_name,
								value: item.slug,
							})),
						]}
					/>
					<SelectControl
						label={`Select ${props.attributes.postType}`}
						value={props.attributes.linkedPost}
						onChange={(newValue) => {
							props.setAttributes({
								linkedPost: newValue ? parseInt(newValue) : null,
							});
						}}
						options={[
							{
								label: `Select a ${props.attributes.postType}`,
								value: "",
							},
							...(posts || []).map((post) => ({
								label: post.title.rendered,
								value: post.id,
							})),
						]}
					/>
				</PanelBody>
			</InspectorControls>
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
		</>
	);
}
