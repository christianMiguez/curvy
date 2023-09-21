import {
	HorizontalRule,
	RangeControl,
	ToggleControl,
} from "@wordpress/components";
import { ColorPalette } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import metadata from "./../block.json";

export const TopCurveSettings = (props) => {
	return (
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
			<HorizontalRule />
			<label>{__("Curve Color", metadata.textdomain)}</label>
			<ColorPalette
				disableCustomColors={true}
				colors={[
					{ name: "Imperial Red", color: "#f03a47" },
					{ name: "Redwood", color: "#af5b5b" },
					{ name: "White smoke", color: "#f6f4f3" },
					{ name: "Celtic blue", color: "#276fbf" },
					{ name: "Delft Blue", color: "#183059" },
					{ name: "white", color: "#ffffff" },
				]}
				value={props.attributes.topColor}
				onChange={(color) => {
					props.setAttributes({
						topColor: color,
					});
				}}
			/>
		</>
	);
};
