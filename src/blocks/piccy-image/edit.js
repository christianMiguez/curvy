import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";

import { Icon } from "@wordpress/components";
import "./editor.scss";
import { ImageThumbnail } from "../../components/imageThumbnail";
import { useImage } from "../../hooks/useImage";

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useImage(props.attributes.imageId);

	const isImageSelected = !!props.attributes.imageId && !!image?.source_url;

	return (
		<div {...blockProps}>
			{!!isImageSelected && (
				<ImageThumbnail imageId={props.attributes.imageId} />
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
