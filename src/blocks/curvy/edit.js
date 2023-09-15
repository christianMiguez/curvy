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
import { ToggleControl, PanelBody } from "@wordpress/components";

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
import { Curve, TopCurveSettings, BottomCurveSettings } from "./components";
export default function Edit(props) {
	/**
	 * Define the attributes.
	 */
	const { className, ...blockProps } = useBlockProps();

	/**
	 * Return the UI for the block editor.
	 */
	return (
		<>
			<section className={`${className} alignfull`} {...blockProps}>
				{props.attributes.enableTopCurve && (
					<Curve
						height={props.attributes.topHeight}
						width={props.attributes.topWidth}
						flipHorizontally={props.attributes.flipHorizontally}
						flipVertically={props.attributes.flipVertically}
						color={props.attributes.topColor}
					/>
				)}
				{props.attributes.enableBottomCurve && (
					<Curve
						height={props.attributes.bottomHeight}
						width={props.attributes.bottomWidth}
						flipHorizontally={props.attributes.bottomFlipHorizontally}
						flipVertically={props.attributes.bottomFlipVertically}
						color={props.attributes.bottomColor}
						isBottom={true}
					/>
				)}
			</section>

			<p>
				{props.attributes.enableTopCurve
					? "Top curve is enabled"
					: "Top curve is disabled"}
			</p>
			<InspectorControls>
				<PanelBody title={__("Top Curve", metadata.textdomain)}>
					<div style={{ display: "flex" }}>
						<ToggleControl
							onChange={(isChecked) => {
								props.setAttributes({ enableTopCurve: isChecked });
							}}
							checked={props.attributes.enableTopCurve}
						/>
						<span>{__("Show Top Curve", metadata.textdomain)}</span>
					</div>
					{props.attributes.enableTopCurve && (
						<TopCurveSettings
							attributes={props.attributes}
							setAttributes={props.setAttributes}
						/>
					)}
				</PanelBody>

				<PanelBody title={__("Bottom Curve", metadata.textdomain)}>
					<div style={{ display: "flex" }}>
						<ToggleControl
							onChange={(isChecked) => {
								props.setAttributes({ enableBottomCurve: isChecked });
							}}
							checked={props.attributes.enableBottomCurve}
						/>
						<span>{__("Show Bottom Curve", metadata.textdomain)}</span>
					</div>
					{props.attributes.enableBottomCurve && (
						<BottomCurveSettings
							attributes={props.attributes}
							setAttributes={props.setAttributes}
						/>
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
}