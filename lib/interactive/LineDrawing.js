"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../utils");

var _utils2 = require("./utils");

var _EachLineDrawing = require("./wrapper/EachLineDrawing");

var _EachLineDrawing2 = _interopRequireDefault(_EachLineDrawing);

var _Line = require("./components/Line");

var _Line2 = _interopRequireDefault(_Line);

var _MouseLocationIndicator = require("./components/MouseLocationIndicator");

var _MouseLocationIndicator2 = _interopRequireDefault(_MouseLocationIndicator);

var _HoverTextNearMouse = require("./components/HoverTextNearMouse");

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineDrawing = function (_Component) {
	_inherits(LineDrawing, _Component);

	function LineDrawing(props) {
		_classCallCheck(this, LineDrawing);

		var _this = _possibleConstructorReturn(this, (LineDrawing.__proto__ || Object.getPrototypeOf(LineDrawing)).call(this, props));

		_this.handleStart = _this.handleStart.bind(_this);
		_this.handleEnd = _this.handleEnd.bind(_this);
		_this.handleDrawLine = _this.handleDrawLine.bind(_this);
		// this.handleDragLine = this.handleDragLine.bind(this);
		// this.handleDragLineComplete = this.handleDragLineComplete.bind(this);

		_this.terminate = _utils2.terminate.bind(_this);
		_this.saveNodeType = _utils2.saveNodeType.bind(_this);

		_this.getSelectionState = (0, _utils2.isHoverForInteractiveType)("LineDrawings").bind(_this);

		var _ref = _this.props || [],
		    drawings = _ref.drawings;

		_this.state = {
			drawings: drawings
		};
		_this.nodes = [];
		return _this;
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


	_createClass(LineDrawing, [{
		key: "handleDrawLine",
		value: function handleDrawLine(xyValue) {
			var current = this.state.current;

			if ((0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.path)) {
				this.mouseMoved = true;
				this.setState({
					current: {
						path: current.path.concat([xyValue])
					}
				});
			}
		}
	}, {
		key: "handleStart",
		value: function handleStart(xyValue, moreProps, e) {
			var _this2 = this;

			var current = this.state.current;


			if ((0, _utils.isNotDefined)(current) || (0, _utils.isNotDefined)(current.path)) {
				this.mouseMoved = false;

				this.setState({
					current: {
						path: [xyValue]
					}
				}, function () {
					_this2.props.onStart(moreProps, e);
				});
			}
		}
	}, {
		key: "handleEnd",
		value: function handleEnd(xyValue, moreProps, e) {
			var _this3 = this;

			var current = this.state.current;
			var _props = this.props,
			    drawings = _props.drawings,
			    appearance = _props.appearance;


			if (this.mouseMoved && (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.path)) {
				var newDrawings = [].concat(_toConsumableArray(drawings.map(function (d) {
					return _extends({}, d, { selected: false });
				})), [{
					path: current.path.concat([xyValue]),
					selected: true,
					appearance: appearance
				}]);
				this.setState({
					current: null,
					drawings: newDrawings
				}, function () {
					_this3.props.onComplete(newDrawings, moreProps, e);
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			var appearance = this.props.appearance;
			var _props2 = this.props,
			    enabled = _props2.enabled,
			    snap = _props2.snap,
			    shouldDisableSnap = _props2.shouldDisableSnap,
			    snapTo = _props2.snapTo;
			var _props3 = this.props,
			    currentPositionRadius = _props3.currentPositionRadius,
			    currentPositionStroke = _props3.currentPositionStroke;
			var _props4 = this.props,
			    currentPositionstrokeOpacity = _props4.currentPositionstrokeOpacity,
			    currentPositionStrokeWidth = _props4.currentPositionStrokeWidth;
			var _props5 = this.props,
			    hoverText = _props5.hoverText,
			    drawings = _props5.drawings;
			var _state = this.state,
			    current = _state.current,
			    override = _state.override;


			var tempLine = (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.path) ? _react2.default.createElement(_Line2.default, {
				noHover: true,
				path: current.path,
				stroke: appearance.stroke,
				strokeWidth: appearance.strokeWidth,
				strokeOpacity: appearance.strokeOpacity }) : null;

			return _react2.default.createElement(
				"g",
				null,
				drawings.map(function (each, idx) {
					var eachAppearance = (0, _utils.isDefined)(each.appearance) ? _extends({}, appearance, each.appearance) : appearance;

					var hoverTextWithDefault = _extends({}, LineDrawing.defaultProps.hoverText, hoverText);

					return _react2.default.createElement(_EachLineDrawing2.default, { key: idx,
						ref: _this4.saveNodeType(idx),
						index: idx,
						selected: each.selected,
						path: (0, _utils2.getValueFromOverride)(override, idx, "path", each.path),
						stroke: eachAppearance.stroke,
						strokeWidth: eachAppearance.strokeWidth,
						strokeOpacity: eachAppearance.strokeOpacity,
						strokeDasharray: eachAppearance.strokeDasharray,
						edgeStroke: eachAppearance.edgeStroke,
						edgeFill: eachAppearance.edgeFill,
						edgeStrokeWidth: eachAppearance.edgeStrokeWidth,
						r: eachAppearance.r,
						hoverText: hoverTextWithDefault,
						onDrag: _this4.handleDragLine,
						onDragComplete: _this4.handleDragLineComplete,
						edgeInteractiveCursor: "react-stockcharts-move-cursor",
						lineInteractiveCursor: "react-stockcharts-move-cursor"
					});
				}),
				tempLine,
				_react2.default.createElement(_MouseLocationIndicator2.default, {
					enabled: enabled,
					snap: snap,
					shouldDisableSnap: shouldDisableSnap,
					snapTo: snapTo,
					r: currentPositionRadius,
					stroke: currentPositionStroke,
					strokeOpacity: currentPositionstrokeOpacity,
					strokeWidth: currentPositionStrokeWidth,
					onMouseDown: this.handleStart,
					onClick: this.handleEnd,
					onMouseMove: this.handleDrawLine,
					returnXY: true
				})
			);
		}
	}]);

	return LineDrawing;
}(_react.Component);

LineDrawing.propTypes = {
	snap: _propTypes2.default.bool.isRequired,
	enabled: _propTypes2.default.bool.isRequired,
	snapTo: _propTypes2.default.func,
	shouldDisableSnap: _propTypes2.default.func.isRequired,

	onStart: _propTypes2.default.func.isRequired,
	onComplete: _propTypes2.default.func.isRequired,
	onSelect: _propTypes2.default.func,

	currentPositionStroke: _propTypes2.default.string,
	currentPositionStrokeWidth: _propTypes2.default.number,
	currentPositionstrokeOpacity: _propTypes2.default.number,
	currentPositionRadius: _propTypes2.default.number,
	hoverText: _propTypes2.default.object.isRequired,

	drawings: _propTypes2.default.array.isRequired,

	appearance: _propTypes2.default.shape({
		stroke: _propTypes2.default.string.isRequired,
		strokeOpacity: _propTypes2.default.number.isRequired,
		strokeWidth: _propTypes2.default.number.isRequired,
		strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),
		edgeStrokeWidth: _propTypes2.default.number.isRequired,
		edgeFill: _propTypes2.default.string.isRequired,
		edgeStroke: _propTypes2.default.string.isRequired
	}).isRequired
};

LineDrawing.defaultProps = {
	onStart: _utils.noop,
	onComplete: _utils.noop,
	onSelect: _utils.noop,

	currentPositionStroke: "#000000",
	currentPositionstrokeOpacity: 1,
	currentPositionStrokeWidth: 3,
	currentPositionRadius: 0,

	shouldDisableSnap: function shouldDisableSnap(e) {
		return e.button === 2 || e.shiftKey;
	},
	hoverText: _extends({}, _HoverTextNearMouse2.default.defaultProps, {
		enable: true,
		bgHeight: "auto",
		bgWidth: "auto",
		text: "Click to select object",
		selectedText: ""
	}),
	drawings: [],

	appearance: {
		stroke: "#000000",
		strokeOpacity: 1,
		strokeWidth: 1,
		strokeDasharray: "Solid",
		edgeStrokeWidth: 1,
		edgeFill: "#FFFFFF",
		edgeStroke: "#000000",
		r: 6
	}
};

exports.default = LineDrawing;
//# sourceMappingURL=LineDrawing.js.map