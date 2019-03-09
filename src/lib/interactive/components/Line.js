import React, { Component } from "react";
import PropTypes from "prop-types";
import { line as d3Line, curveBasis as d3CurveBasis } from "d3-shape";


import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";

import {
	// isDefined,
	noop,
	// hexToRGBA,
	getStrokeDasharray,
	strokeDashTypes,
} from "../../utils";

class Line extends Component {
	constructor(props) {
		super(props);

		this.renderSVG = this.renderSVG.bind(this);
		// this.drawOnCanvas = this.drawOnCanvas.bind(this);
		this.isHover = this.isHover.bind(this);
	}
	// isHover(moreProps) {
	// 	const { tolerance, onHover } = this.props;

	// if (isDefined(onHover)) {
	// 	const { x1Value, x2Value, y1Value, y2Value, type } = this.props;
	// 	const { mouseXY, xScale } = moreProps;
	// 	const { chartConfig: { yScale } } = moreProps;
	//
	// 	const hovering = isHovering({
	// 		x1Value, y1Value,
	// 		x2Value, y2Value,
	// 		mouseXY,
	// 		type,
	// 		tolerance,
	// 		xScale,
	// 		yScale,
	// 	});
	//
	// 	// console.log("hovering ->", hovering);
	//
	// 	return hovering;
	// }
	// 	return false;
	// }
	// drawOnCanvas(ctx, moreProps) {
	// 	const { stroke, strokeWidth, strokeOpacity, strokeDasharray } = this.props;
	// 	const { x1, y1, x2, y2 } = helper(this.props, moreProps);
	//
	// 	ctx.lineWidth = strokeWidth;
	// 	ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
	// 	ctx.setLineDash(getStrokeDasharray(strokeDasharray).split(","));
	//
	// 	ctx.beginPath();
	// 	ctx.moveTo(x1, y1);
	// 	ctx.lineTo(x2, y2);
	// 	ctx.stroke();
	// }
	renderSVG(moreProps) {
		const { stroke, strokeWidth, strokeOpacity, strokeDasharray } = this.props;
		const { xScale, chartConfig: { yScale } } = moreProps;
		const lineWidth = strokeWidth;

		const { path } = this.props;
		const line = d3Line()
			.x(d => xScale(d[0]))
			.y(d => yScale(d[1]))
			.curve(d3CurveBasis);
		const d = line(path);

		return (
			<path
				d={d}
				stroke={stroke} strokeWidth={lineWidth}
				strokeDasharray={getStrokeDasharray(strokeDasharray)}
				strokeOpacity={strokeOpacity}
				fill="none"/>
		);
	}
	render() {
		const { selected, interactiveCursorClass } = this.props;
		const { onDragStart, onDrag, onDragComplete, onHover, onUnHover } = this.props;

		return <GenericChartComponent
			isHover={this.isHover}

			svgDraw={this.renderSVG}
			canvasToDraw={getMouseCanvas}
			canvasDraw={this.drawOnCanvas}

			interactiveCursorClass={interactiveCursorClass}
			selected={selected}

			onDragStart={onDragStart}
			onDrag={onDrag}
			onDragComplete={onDragComplete}
			onHover={onHover}
			onUnHover={onUnHover}

			drawOn={["mousemove", "pan", "drag"]}
		/>;
	}
}

// export function isHovering2(start, end, [mouseX, mouseY], tolerance) {
// 	const m = getSlope(start, end);
//
// 	if (isDefined(m)) {
// 		const b = getYIntercept(m, end);
// 		const y = m * mouseX + b;
// 		return (mouseY < y + tolerance)
// 			&& mouseY > (y - tolerance)
// 			&& mouseX > Math.min(start[0], end[0]) - tolerance
// 			&& mouseX < Math.max(start[0], end[0]) + tolerance;
// 	} else {
// 		return mouseY >= Math.min(start[1], end[1])
// 			&& mouseY <= Math.max(start[1], end[1])
// 			&& mouseX < start[0] + tolerance
// 			&& mouseX > start[0] - tolerance;
// 	}
// }

// export function isHovering({
// 	x1Value, y1Value,
// 	x2Value, y2Value,
// 	mouseXY,
// 	type,
// 	tolerance,
// 	xScale,
// 	yScale,
// }) {
//
// 	const line = generateLine({
// 		type,
// 		start: [x1Value, y1Value],
// 		end: [x2Value, y2Value],
// 		xScale,
// 		yScale,
// 	});
//
// 	const start = [xScale(line.x1), yScale(line.y1)];
// 	const end = [xScale(line.x2), yScale(line.y2)];
//
// 	const m = getSlope(start, end);
// 	const [mouseX, mouseY] = mouseXY;
//
// 	if (isDefined(m)) {
// 		const b = getYIntercept(m, end);
// 		const y = m * mouseX + b;
//
// 		return mouseY < (y + tolerance)
// 			&& mouseY > (y - tolerance)
// 			&& mouseX > Math.min(start[0], end[0]) - tolerance
// 			&& mouseX < Math.max(start[0], end[0]) + tolerance;
// 	} else {
// 		return mouseY >= Math.min(start[1], end[1])
// 			&& mouseY <= Math.max(start[1], end[1])
// 			&& mouseX < start[0] + tolerance
// 			&& mouseX > start[0] - tolerance;
// 	}
// }

Line.propTypes = {
	path: PropTypes.array.isRequired,

	interactiveCursorClass: PropTypes.string,
	stroke: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	strokeOpacity: PropTypes.number.isRequired,
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),

	onDragStart: PropTypes.func.isRequired,
	onDrag: PropTypes.func.isRequired,
	onDragComplete: PropTypes.func.isRequired,
	onHover: PropTypes.func,
	onUnHover: PropTypes.func,

	defaultClassName: PropTypes.string,

	r: PropTypes.number.isRequired,
	edgeFill: PropTypes.string.isRequired,
	edgeStroke: PropTypes.string.isRequired,
	edgeStrokeWidth: PropTypes.number.isRequired,
	withEdge: PropTypes.bool.isRequired,
	children: PropTypes.func.isRequired,
	tolerance: PropTypes.number.isRequired,
	selected: PropTypes.bool.isRequired,
};

Line.defaultProps = {
	onDragStart: noop,
	onDrag: noop,
	onDragComplete: noop,

	edgeStrokeWidth: 3,
	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	r: 10,
	withEdge: false,
	strokeWidth: 1,
	strokeDasharray: "Solid",
	children: noop,
	tolerance: 7,
	selected: false,
};

export default Line;
