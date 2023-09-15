/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	ToggleControl,
	PanelBody,
	HorizontalRule,
	RangeControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
import metadata from "./block.json";
import { Curve } from "./components/curve";
export default function Edit(props) {
	/**
	 * Define the attributes.
	 */
	const { enableTopCurve } = props.attributes;
	const { className, ...blockProps } = useBlockProps();

	/**
	 * Return the UI for the block editor.
	 */
	return (
		<>
			<section className={`${className} alignfull`} {...blockProps}>
				{enableTopCurve && (
					<Curve
						height={props.attributes.topHeight}
						width={props.attributes.topWidth}
						flipHorizontally={props.attributes.flipHorizontally}
						flipVertically={props.attributes.flipVertically}
					/>
				)}
			</section>

			<p>{enableTopCurve ? "Top curve is enabled" : "Top curve is disabled"}</p>
			<InspectorControls>
				<PanelBody title={__("Top Curve", metadata.textdomain)}>
					<div style={{ display: "flex" }}>
						<ToggleControl
							onChange={(isChecked) => {
								props.setAttributes({ enableTopCurve: isChecked });
							}}
							checked={enableTopCurve}
						/>
						<span>{__("Show Top Curve", metadata.textdomain)}</span>
					</div>
					{props.attributes.enableTopCurve && (
						<>
							<HorizontalRule />
							<RangeControl
								min={100}
								max={300}
								label={__("Curve Width", metadata.textdomain)}
								value={props.attributes.topWidth || 100}
								onChange={(value) => {
									props.setAttributes({
										topWidth: value,
									});
								}}
							/>
							<RangeControl
								min={0}
								max={200}
								label={__("Curve Height", metadata.textdomain)}
								value={props.attributes.topHeight}
								onChange={(value) => {
									props.setAttributes({
										topHeight: value,
									});
								}}
							/>
							<HorizontalRule />
							<div style={{ display: "flex" }}>
								<ToggleControl
									onChange={(isChecked) => {
										props.setAttributes({ flipHorizontally: isChecked });
									}}
									checked={props.attributes.flipHorizontally}
								/>
								<span>{__("Flip Horizontally", metadata.textdomain)}</span>
							</div>

							<div style={{ display: "flex" }}>
								<ToggleControl
									onChange={(isChecked) => {
										props.setAttributes({ flipVertically: isChecked });
									}}
									checked={props.attributes.flipVertically}
								/>
								<span>{__("Flip Vertically", metadata.textdomain)}</span>
							</div>
						</>
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
}
