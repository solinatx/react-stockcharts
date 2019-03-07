import React, { Component } from "react";
import PropTypes from "prop-types";

import { isDefined, isNotDefined, noop, strokeDashTypes } from "../utils";

import {
	getValueFromOverride,
	terminate,
	saveNodeType,
	isHoverForInteractiveType,
} from "./utils";

import EachLineDrawing from "./wrapper/EachLineDrawing";
import Line from "./components/Line";
import MouseLocationIndicator from "./components/MouseLocationIndicator";
import HoverTextNearMouse from "./components/HoverTextNearMouse";

class LineDrawing extends Component {
	constructor(props) {
		super(props);

		this.handleStart = this.handleStart.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
		this.handleDrawLine = this.handleDrawLine.bind(this);
		// this.handleDragLine = this.handleDragLine.bind(this);
		// this.handleDragLineComplete = this.handleDragLineComplete.bind(this);

		this.terminate = terminate.bind(this);
		this.saveNodeType = saveNodeType.bind(this);

		this.getSelectionState = isHoverForInteractiveType("LineDrawings")
			.bind(this);

    const { drawings } = this.props || []
		this.state = {
      drawings
		};
		this.nodes = [];
	}
	// handleDragLine(index, newPath) {
	// 	this.setState({
	// 		override: {
	// 			index,
	// 			...newPath
	// 		}
	// 	});
	// }
	// handleDragLineComplete(moreProps) {
	// 	const { override } = this.state;
	// 	if (isDefined(override)) {
	// 		const { drawings } = this.props;
	// 		const newDrawings = drawings
	// 			.map((each, idx) => idx === override.index
	// 				? {
	// 					...each,
	// 					path: override.path,
	// 					selected: true,
	// 				}
	// 				: {
	// 					...each,
	// 					selected: false,
	// 				});
  //
	// 		this.setState({
	// 			override: null,
	// 		}, () => {
	// 			this.props.onComplete(newDrawings, moreProps);
	// 		});
	// 	}
	// }
	handleDrawLine(xyValue, e, xy) {
		const { current } = this.state;
		if (isDefined(current) && isDefined(current.path)) {
			this.mouseMoved = true;
			this.setState({
				current: {
					path: current.path.concat([xyValue]),
				}
			});
		}
	}
	handleStart(xyValue, moreProps, e, xy) {
		const { current } = this.state;

    console.log('this is path', xy)
		if (isNotDefined(current) || isNotDefined(current.path)) {
			this.mouseMoved = false;

			this.setState({
				current: {
					path: [xyValue],
				},
			}, () => {
				this.props.onStart(moreProps, e);
			});
		}
	}
	handleEnd(xyValue, moreProps, e, xy) {
		const { current } = this.state;
		const { drawings, appearance } = this.props;

		if (this.mouseMoved
			&& isDefined(current)
			&& isDefined(current.path)
		) {
			const newDrawings = [
				...drawings.map(d => ({ ...d, selected: false })),
				{
					path: current.path.concat([xyValue]),
					selected: true,
					appearance,
				}
			];
			this.setState({
				current: null,
				drawings: newDrawings
			}, () => {
				this.props.onComplete(newDrawings, moreProps, e);
			});
		}
	}
	render() {
		const { appearance } = this.props;
		const { enabled, snap, shouldDisableSnap, snapTo } = this.props;
		const { currentPositionRadius, currentPositionStroke } = this.props;
		const { currentPositionstrokeOpacity, currentPositionStrokeWidth } = this.props;
		const { hoverText } = this.props;
		const { current, override, drawings } = this.state;

		const tempLine = isDefined(current) && isDefined(current.end)
			? <Line
				noHover
				y2Value={current.end[1]}
				stroke={appearance.stroke}
				strokeWidth={appearance.strokeWidth}
				strokeOpacity={appearance.strokeOpacity} />
			: null;

		return <g>
			{drawings.map((each, idx) => {
				const eachAppearance = isDefined(each.appearance)
					? { ...appearance, ...each.appearance }
					: appearance;

				const hoverTextWithDefault = {
					...LineDrawing.defaultProps.hoverText,
					...hoverText
				};

				return <EachLineDrawing key={idx}
					ref={this.saveNodeType(idx)}
					index={idx}
					selected={each.selected}
					path={getValueFromOverride(override, idx, "path", each.path)}
					stroke={eachAppearance.stroke}
					strokeWidth={eachAppearance.strokeWidth}
					strokeOpacity={eachAppearance.strokeOpacity}
					strokeDasharray={eachAppearance.strokeDasharray}
					edgeStroke={eachAppearance.edgeStroke}
					edgeFill={eachAppearance.edgeFill}
					edgeStrokeWidth={eachAppearance.edgeStrokeWidth}
					r={eachAppearance.r}
					hoverText={hoverTextWithDefault}
					onDrag={this.handleDragLine}
					onDragComplete={this.handleDragLineComplete}
					edgeInteractiveCursor="react-stockcharts-move-cursor"
					lineInteractiveCursor="react-stockcharts-move-cursor"
				/>;
			})}
			{tempLine}
			<MouseLocationIndicator
				enabled={enabled}
				snap={snap}
				shouldDisableSnap={shouldDisableSnap}
				snapTo={snapTo}
				r={currentPositionRadius}
				stroke={currentPositionStroke}
				strokeOpacity={currentPositionstrokeOpacity}
				strokeWidth={currentPositionStrokeWidth}
				onMouseDown={this.handleStart}
				onClick={this.handleEnd}
				onMouseMove={this.handleDrawLine}
        returnXY={true}
			/>
		</g>;
	}
}


LineDrawing.propTypes = {
	snap: PropTypes.bool.isRequired,
	enabled: PropTypes.bool.isRequired,
	snapTo: PropTypes.func,
	shouldDisableSnap: PropTypes.func.isRequired,

	onStart: PropTypes.func.isRequired,
	onComplete: PropTypes.func.isRequired,
	onSelect: PropTypes.func,

	currentPositionStroke: PropTypes.string,
	currentPositionStrokeWidth: PropTypes.number,
	currentPositionstrokeOpacity: PropTypes.number,
	currentPositionRadius: PropTypes.number,
	hoverText: PropTypes.object.isRequired,

	drawings: PropTypes.array.isRequired,

	appearance: PropTypes.shape({
		stroke: PropTypes.string.isRequired,
		strokeOpacity: PropTypes.number.isRequired,
		strokeWidth: PropTypes.number.isRequired,
		strokeDasharray: PropTypes.oneOf(strokeDashTypes),
		edgeStrokeWidth: PropTypes.number.isRequired,
		edgeFill: PropTypes.string.isRequired,
		edgeStroke: PropTypes.string.isRequired,
	}).isRequired
};

LineDrawing.defaultProps = {
	onStart: noop,
	onComplete: noop,
	onSelect: noop,

	currentPositionStroke: "#000000",
	currentPositionstrokeOpacity: 1,
	currentPositionStrokeWidth: 3,
	currentPositionRadius: 0,

	shouldDisableSnap: e => (e.button === 2 || e.shiftKey),
	hoverText: {
		...HoverTextNearMouse.defaultProps,
		enable: true,
		bgHeight: "auto",
		bgWidth: "auto",
		text: "Click to select object",
		selectedText: "",
	},
	drawings: [],

	appearance: {
		stroke: "#000000",
		strokeOpacity: 1,
		strokeWidth: 1,
		strokeDasharray: "Solid",
		edgeStrokeWidth: 1,
		edgeFill: "#FFFFFF",
		edgeStroke: "#000000",
		r: 6,
	}
};

export default LineDrawing;
