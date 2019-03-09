"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getNewXY = getNewXY;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Array = require("d3-array");

var _utils = require("../../utils");

var _utils2 = require("../utils");

var _ChartDataUtil = require("../../utils/ChartDataUtil");

var _Line = require("../components/Line");

var _Line2 = _interopRequireDefault(_Line);

var _HoverTextNearMouse = require("../components/HoverTextNearMouse");

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ClickableCircle from "../components/ClickableCircle";


var EachLineDrawing = function (_Component) {
	_inherits(EachLineDrawing, _Component);

	function EachLineDrawing(props) {
		_classCallCheck(this, EachLineDrawing);

		// this.handleEdge1Drag = this.handleEdge1Drag.bind(this);
		// this.handleEdge2Drag = this.handleEdge2Drag.bind(this);
		// this.handleLineDragStart = this.handleLineDragStart.bind(this);
		// this.handleLineDrag = this.handleLineDrag.bind(this);
		//
		// this.handleEdge1DragStart = this.handleEdge1DragStart.bind(this);
		// this.handleEdge2DragStart = this.handleEdge2DragStart.bind(this);
		// this.handleDragComplete = this.handleDragComplete.bind(this);

		var _this = _possibleConstructorReturn(this, (EachLineDrawing.__proto__ || Object.getPrototypeOf(EachLineDrawing)).call(this, props));

		_this.handleHover = _this.handleHover.bind(_this);

		_this.isHover = _utils2.isHover.bind(_this);
		_this.saveNodeType = _utils2.saveNodeType.bind(_this);
		_this.nodes = {};

		_this.state = {
			hover: false
		};
		return _this;
	}
	// handleLineDragStart() {
	// 	const {
	// 		x1Value, y1Value,
	// 		x2Value, y2Value,
	// 	} = this.props;
	//
	// 	this.dragStart = {
	// 		x1Value, y1Value,
	// 		x2Value, y2Value,
	// 	};
	// }
	// handleLineDrag(moreProps) {
	// 	const { index, onDrag } = this.props;
	//
	// 	const {
	// 		x1Value, y1Value,
	// 		x2Value, y2Value,
	// 	} = this.dragStart;
	//
	// 	const { xScale, chartConfig: { yScale }, xAccessor, fullData } = moreProps;
	// 	const { startPos, mouseXY } = moreProps;
	//
	// 	const x1 = xScale(x1Value);
	// 	const y1 = yScale(y1Value);
	// 	const x2 = xScale(x2Value);
	// 	const y2 = yScale(y2Value);
	//
	// 	const dx = startPos[0] - mouseXY[0];
	// 	const dy = startPos[1] - mouseXY[1];
	//
	// 	const newX1Value = getXValue(xScale, xAccessor, [x1 - dx, y1 - dy], fullData);
	// 	const newY1Value = yScale.invert(y1 - dy);
	// 	const newX2Value = getXValue(xScale, xAccessor, [x2 - dx, y2 - dy], fullData);
	// 	const newY2Value = yScale.invert(y2 - dy);
	//
	// 	onDrag(index, {
	// 		x1Value: newX1Value,
	// 		y1Value: newY1Value,
	// 		x2Value: newX2Value,
	// 		y2Value: newY2Value,
	// 	});
	// }
	// handleEdge1DragStart() {
	// 	this.setState({
	// 		anchor: "edge2"
	// 	});
	// }
	// handleEdge2DragStart() {
	// 	this.setState({
	// 		anchor: "edge1"
	// 	});
	// }
	// handleDragComplete(...rest) {
	// 	this.setState({
	// 		anchor: undefined
	// 	});
	// 	this.props.onDragComplete(...rest);
	// }
	// handleEdge1Drag(moreProps) {
	// 	const { index, onDrag } = this.props;
	// 	const {
	// 		x2Value, y2Value,
	// 	} = this.props;
	//
	// 	const [x1Value, y1Value] = getNewXY(moreProps);
	//
	// 	onDrag(index, {
	// 		x1Value,
	// 		y1Value,
	// 		x2Value,
	// 		y2Value,
	// 	});
	// }
	// handleEdge2Drag(moreProps) {
	// 	const { index, onDrag } = this.props;
	// 	const {
	// 		x1Value, y1Value,
	// 	} = this.props;
	//
	// 	const [x2Value, y2Value] = getNewXY(moreProps);
	//
	// 	onDrag(index, {
	// 		x1Value,
	// 		y1Value,
	// 		x2Value,
	// 		y2Value,
	// 	});
	// }


	_createClass(EachLineDrawing, [{
		key: "handleHover",
		value: function handleHover(moreProps) {
			if (this.state.hover !== moreProps.hovering) {
				this.setState({
					hover: moreProps.hovering
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    path = _props.path,
			    stroke = _props.stroke,
			    strokeWidth = _props.strokeWidth,
			    strokeOpacity = _props.strokeOpacity,
			    strokeDasharray = _props.strokeDasharray,
			    lineInteractiveCursor = _props.lineInteractiveCursor,
			    hoverText = _props.hoverText,
			    selected = _props.selected;

			var hoverTextEnabled = hoverText.enable,
			    hoverTextSelected = hoverText.selectedText,
			    hoverTextUnselected = hoverText.text,
			    restHoverTextProps = _objectWithoutProperties(hoverText, ["enable", "selectedText", "text"]);

			var hover = this.state.hover;


			console.log("rendering path", path);
			return _react2.default.createElement(
				"g",
				null,
				_react2.default.createElement(_Line2.default, {
					ref: this.saveNodeType("drawing"),
					selected: selected || hover,
					onHover: this.handleHover,
					onUnHover: this.handleHover,
					path: path,
					stroke: stroke,
					strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
					strokeOpacity: strokeOpacity,
					strokeDasharray: strokeDasharray,
					interactiveCursorClass: lineInteractiveCursor
				}),
				_react2.default.createElement(_HoverTextNearMouse2.default, _extends({
					show: hoverTextEnabled && hover
				}, restHoverTextProps, {
					text: selected ? hoverTextSelected : hoverTextUnselected
				}))
			);
		}
	}]);

	return EachLineDrawing;
}(_react.Component);

function getNewXY(moreProps) {
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale,
	    xAccessor = moreProps.xAccessor,
	    plotData = moreProps.plotData,
	    mouseXY = moreProps.mouseXY;

	var mouseY = mouseXY[1];

	var x = (0, _ChartDataUtil.getXValue)(xScale, xAccessor, mouseXY, plotData);

	var _yScale$domain$slice$ = yScale.domain().slice().sort(_d3Array.ascending),
	    _yScale$domain$slice$2 = _slicedToArray(_yScale$domain$slice$, 2),
	    small = _yScale$domain$slice$2[0],
	    big = _yScale$domain$slice$2[1];

	var y = yScale.invert(mouseY);
	var newY = Math.min(Math.max(y, small), big);

	return [x, newY];
}

EachLineDrawing.propTypes = {
	path: _propTypes2.default.any.isRequired,

	index: _propTypes2.default.number,

	onDrag: _propTypes2.default.func.isRequired,
	onEdge1Drag: _propTypes2.default.func.isRequired,
	onEdge2Drag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	onSelect: _propTypes2.default.func.isRequired,
	onUnSelect: _propTypes2.default.func.isRequired,

	r: _propTypes2.default.number.isRequired,
	strokeOpacity: _propTypes2.default.number.isRequired,
	defaultClassName: _propTypes2.default.string,

	selected: _propTypes2.default.bool,

	stroke: _propTypes2.default.string.isRequired,
	strokeWidth: _propTypes2.default.number.isRequired,
	strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),

	edgeStrokeWidth: _propTypes2.default.number.isRequired,
	edgeStroke: _propTypes2.default.string.isRequired,
	edgeInteractiveCursor: _propTypes2.default.string.isRequired,
	lineInteractiveCursor: _propTypes2.default.string.isRequired,
	edgeFill: _propTypes2.default.string.isRequired,
	hoverText: _propTypes2.default.object.isRequired
};

EachLineDrawing.defaultProps = {
	onDrag: _utils.noop,
	onEdge1Drag: _utils.noop,
	onEdge2Drag: _utils.noop,
	onDragComplete: _utils.noop,
	onSelect: _utils.noop,
	onUnSelect: _utils.noop,

	selected: false,

	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	edgeStrokeWidth: 2,
	r: 5,
	strokeWidth: 1,
	strokeOpacity: 1,
	strokeDasharray: "Solid",
	hoverText: {
		enable: false
	}
};

exports.default = EachLineDrawing;
//# sourceMappingURL=EachLineDrawing.js.map