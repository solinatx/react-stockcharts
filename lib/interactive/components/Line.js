"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Shape = require("d3-shape");

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Line = function (_Component) {
	_inherits(Line, _Component);

	function Line(props) {
		_classCallCheck(this, Line);

		var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		// this.drawOnCanvas = this.drawOnCanvas.bind(this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
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


	_createClass(Line, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props = this.props,
			    stroke = _props.stroke,
			    strokeWidth = _props.strokeWidth,
			    strokeOpacity = _props.strokeOpacity,
			    strokeDasharray = _props.strokeDasharray;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale;

			var lineWidth = strokeWidth;

			var path = this.props.path;

			var line = (0, _d3Shape.line)().x(function (d) {
				return xScale(d[0]);
			}).y(function (d) {
				return yScale(d[1]);
			}).curve(_d3Shape.curveBasis);
			var d = line(path);

			return _react2.default.createElement("path", {
				d: d,
				stroke: stroke, strokeWidth: lineWidth,
				strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray),
				strokeOpacity: strokeOpacity,
				fill: "none" });
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    selected = _props2.selected,
			    interactiveCursorClass = _props2.interactiveCursorClass;
			var _props3 = this.props,
			    onDragStart = _props3.onDragStart,
			    onDrag = _props3.onDrag,
			    onDragComplete = _props3.onDragComplete,
			    onHover = _props3.onHover,
			    onUnHover = _props3.onUnHover;


			return _react2.default.createElement(_GenericChartComponent2.default, {
				isHover: this.isHover,

				svgDraw: this.renderSVG,
				canvasToDraw: _GenericComponent.getMouseCanvas,
				canvasDraw: this.drawOnCanvas,

				interactiveCursorClass: interactiveCursorClass,
				selected: selected,

				onDragStart: onDragStart,
				onDrag: onDrag,
				onDragComplete: onDragComplete,
				onHover: onHover,
				onUnHover: onUnHover,

				drawOn: ["mousemove", "pan", "drag"]
			});
		}
	}]);

	return Line;
}(_react.Component);

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
	path: _propTypes2.default.array.isRequired,

	interactiveCursorClass: _propTypes2.default.string,
	stroke: _propTypes2.default.string.isRequired,
	strokeWidth: _propTypes2.default.number.isRequired,
	strokeOpacity: _propTypes2.default.number.isRequired,
	strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),

	onDragStart: _propTypes2.default.func.isRequired,
	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	onHover: _propTypes2.default.func,
	onUnHover: _propTypes2.default.func,

	defaultClassName: _propTypes2.default.string,

	r: _propTypes2.default.number.isRequired,
	edgeFill: _propTypes2.default.string.isRequired,
	edgeStroke: _propTypes2.default.string.isRequired,
	edgeStrokeWidth: _propTypes2.default.number.isRequired,
	withEdge: _propTypes2.default.bool.isRequired,
	children: _propTypes2.default.func.isRequired,
	tolerance: _propTypes2.default.number.isRequired,
	selected: _propTypes2.default.bool.isRequired
};

Line.defaultProps = {
	onDragStart: _utils.noop,
	onDrag: _utils.noop,
	onDragComplete: _utils.noop,

	edgeStrokeWidth: 3,
	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	r: 10,
	withEdge: false,
	strokeWidth: 1,
	strokeDasharray: "Solid",
	children: _utils.noop,
	tolerance: 7,
	selected: false
};

exports.default = Line;
//# sourceMappingURL=Line.js.map