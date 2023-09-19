import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import "./editor.scss";

export default function Edit() {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		template: [["cosmicblocks/clicky-button", {}]],
		allowedBlocks: ["cosmicblocks/clicky-button"],
	});
	return <div {...innerBlockProps} />;
}
