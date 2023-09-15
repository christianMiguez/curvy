import {
	HorizontalRule,
	RangeControl,
	ToggleControl,
} from "@wordpress/components";
import { ColorPalette } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import metadata from "../block.json";

export const BottomCurveSettings = (props) => {
	return (
		<>
			<HorizontalRule />
			<RangeControl
				min={100}
				max={300}
				label={__("Curve Width", metadata.textdomain)}
				value={props.attributes.bottomWidth || 100}
				onChange={(value) => {
					props.setAttributes({
						bottomWidth: value,
					});
				}}
			/>
			<RangeControl
				min={0}
				max={200}
				label={__("Curve Height", metadata.textdomain)}
				value={props.attributes.bottomHeight}
				onChange={(value) => {
					props.setAttributes({
						bottomHeight: value,
					});
				}}
			/>
			<HorizontalRule />
			<div style={{ display: "flex" }}>
				<ToggleControl
					onChange={(isChecked) => {
						props.setAttributes({ bottomFlipHorizontally: isChecked });
					}}
					checked={props.attributes.bottomFlipHorizontally}
				/>
				<span>{__("Bottom Flip Horizontally", metadata.textdomain)}</span>
			</div>

			<div style={{ display: "flex" }}>
				<ToggleControl
					onChange={(isChecked) => {
						props.setAttributes({ bottomFlipVertically: isChecked });
					}}
					checked={props.attributes.bottomFlipVertically}
				/>
				<span>{__("Bottom Flip Vertically", metadata.textdomain)}</span>
			</div>
			<HorizontalRule />
			<label>{__("Bottom Curve Color", metadata.textdomain)}</label>
			<ColorPalette
				disableCustomColors={true}
				colors={[
					{ name: "Imperial Red", color: "#f03a47" },
					{ name: "Redwood", color: "#af5b5b" },
					{ name: "White smoke", color: "#f6f4f3" },
					{ name: "Celtic blue", color: "#276fbf" },
					{ name: "Delft Blue", color: "#183059" },
				]}
				value={props.attributes.bottomColor}
				onChange={(color) => {
					props.setAttributes({
						bottomColor: color,
					});
				}}
			/>
		</>
	);
};
