import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

import { useSelect } from "@wordpress/data";
import { Icon } from "@wordpress/components";
import "./editor.scss";

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useSelect(
		(select) => {
			const data = select("core").getEntityRecord(
				"postType",
				"attachment",
				props.attributes.imageId
			);
			return data;
		},
		[props.attributes.imageId]
	);

	const isImageSelected = !!props.attributes.imageId && !!image?.source_url;

	return (
		<div {...blockProps}>
			{isImageSelected && (
				<img
					src={image.source_url}
					style={{
						height: 150,
						width: "100%",
						objectFit: "cover",
						display: "block",
					}}
				/>
			)}

			{!isImageSelected && (
				<div
					className="no-image"
					style={{
						height: 150,
						width: "100%",
						backgroundColor: "#fff",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "#666",
					}}
				>
					<Icon icon="format-image" size={50} />
				</div>
			)}
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={["image"]}
					render={({ open }) => {
						return (
							<button className="media-select" onClick={open}>
								{isImageSelected
									? __("Change Image", metadata.textdomain)
									: __("Select Image", metadata.textdomain)}
							</button>
						);
					}}
					value={props.attributes.imageId}
					onSelect={(image) => {
						props.setAttributes({
							imageId: image.id,
						});
					}}
				/>
			</MediaUploadCheck>
		</div>
	);
}
