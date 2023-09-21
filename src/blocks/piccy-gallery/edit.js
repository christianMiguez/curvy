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
					<div>
						{(innerBlocks || []).map((innerBlock) => (
							<ImageThumbnail
								key={innerBlock.clientId}
								imageId={innerBlock.attributes.imageId}
							/>
						))}
					</div>
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
