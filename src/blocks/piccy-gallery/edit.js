import {
	useBlockProps,
	BlockControls,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import "./editor.scss";
import { ImageThumbnail } from "../../components/imageThumbnail";

export default function Edit(props) {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: "piccy-gallery-inner-blocks",
		},
		{ allowedBlocks: ["cosmicblocks/piccy-image"] }
	);
	const [editMode, setEditMode] = useState(true);
	const innerBlocks = useSelect(
		(select) => {
			const { getBlocksByClientId } = select("core/block-editor");
			const block = getBlocksByClientId(props.clientId)?.[0];
			return block?.innerBlocks;
		},
		[props.clientId]
	);

	const [previewMode, setPreviewMode] = useState({
		imageId: innerBlocks?.[0]?.attributes?.imageId,
		blockId: innerBlocks?.[0]?.clientId,
	});

	return (
		<>
			<div {...blockProps}>
				{!!editMode && (
					<div className="edit-mode">
						<span className="piccy-label">
							{__("Edit Mode", metadata.textdomain)}
						</span>
						<div {...innerBlocksProps} />
					</div>
				)}
				{!editMode && (
					<>
						<div className="preview-mode">
							{(innerBlocks || []).map((innerBlock) => (
								<ImageThumbnail
									key={innerBlock.clientId}
									imageId={innerBlock.attributes.imageId}
									height={75}
									onClick={() => {
										setPreviewMode({
											imageId: innerBlock.attributes.imageId,
											blockId: innerBlock.clientId,
										});
									}}
									className={`thumb ${
										innerBlock.clientId === previewMode.blockId
											? "selected"
											: ""
									}`}
								/>
							))}
						</div>
						<div>
							<ImageThumbnail height="initial" imageId={previewMode.imageId} />
						</div>
					</>
				)}
			</div>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						// icon={<span>Icon</span>}
						icon={editMode ? "welcome-view-site" : "edit"}
						label={__(
							`${editMode ? "Preview Gallery" : "Edit Mode"}`,
							metadata.textdomain
						)}
						onClick={() => {
							setEditMode((prevState) => !prevState);
						}}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
