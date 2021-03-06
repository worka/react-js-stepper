'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactRouterDom = require('react-router-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var STORAGE_KEY = 'REACT_JS_STEPPER_DATA';
var HISTORY_STATE_KEY = 'ACTIVE_STEP_KEY';

var initialStorage = {
  data: [],
  init: false
};

function getStorage() {
  var rawData = sessionStorage.getItem(STORAGE_KEY);
  return rawData ? JSON.parse(rawData) : initialStorage;
}

function issetStorage() {
  return sessionStorage.getItem(STORAGE_KEY) !== null;
}
function initializeStorage() {
  var storage = getStorage();
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(_objectSpread2(_objectSpread2({}, storage), {}, {
    init: true
  })));
}
function getData() {
  var storage = getStorage();
  return storage.data;
}
function addData(data) {
  var storage = getStorage();
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(_objectSpread2(_objectSpread2({}, storage), {}, {
    data: _objectSpread2(_objectSpread2({}, storage.data), data)
  })));
}
function clearStorage() {
  sessionStorage.removeItem(STORAGE_KEY);
}

function withStep(Component, activeStepKey, nextStepKey) {
  return function (props) {
    var navigate = reactRouterDom.useNavigate();
    var location = reactRouterDom.useLocation();
    var allData = getData();
    var stepData = allData[activeStepKey] || null;

    var goToStepByKey = function goToStepByKey(key) {
      initializeStorage();
      navigate(location.pathname, {
        state: _objectSpread2(_objectSpread2({}, location.state), {}, _defineProperty({}, HISTORY_STATE_KEY, key))
      });
    };

    var goToPrevStep = function goToPrevStep() {
      navigate(-1);
    };

    var goToNextStep = function goToNextStep() {
      goToStepByKey(nextStepKey);
    };

    var saveAndGoToStepByKey = function saveAndGoToStepByKey(data, key) {
      addData(_defineProperty({}, activeStepKey, data));
      goToStepByKey(key);
    };

    var saveAndGoToPrevStep = function saveAndGoToPrevStep(data) {
      addData(_defineProperty({}, activeStepKey, data));
      goToPrevStep();
    };

    var saveAndGoToNextStep = function saveAndGoToNextStep(data) {
      addData(_defineProperty({}, activeStepKey, data));
      goToNextStep();
    };

    return /*#__PURE__*/React__default["default"].createElement(Component, _extends({}, props, {
      stepData: stepData,
      allData: allData,
      goToStepByKey: goToStepByKey,
      saveAndGoToStepByKey: saveAndGoToStepByKey,
      goToPrevStep: goToPrevStep,
      saveAndGoToPrevStep: saveAndGoToPrevStep,
      goToNextStep: goToNextStep,
      saveAndGoToNextStep: saveAndGoToNextStep
    }));
  };
}

function getObjectByKey(objects, key) {
  var _iterator = _createForOfIteratorHelper(objects),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var object = _step.value;

      if (object.key === key) {
        return object;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return null;
}
function getNextObjectByKey(objects, key) {
  var objectsCount = objects.length;
  var nextObject = objects[0];

  for (var i = objectsCount - 1; i >= 0; i--) {
    var object = objects[i];

    if (object.key === key) {
      break;
    }

    nextObject = object;
  }

  return nextObject;
}

function useActiveStepKey(defaultStepKey) {
  var _useLocation = reactRouterDom.useLocation(),
      state = _useLocation.state;

  if (!state) {
    state = _defineProperty({}, HISTORY_STATE_KEY, defaultStepKey);
  }

  if (state[HISTORY_STATE_KEY] !== defaultStepKey && !issetStorage()) {
    state = _defineProperty({}, HISTORY_STATE_KEY, defaultStepKey);
  }

  return state[HISTORY_STATE_KEY];
}

/**
 * @param {Step[]} steps
 * @param {boolean} [clearDataOnUnmount = true]
 * @returns {JSX.Element|boolean}
 * @constructor
 */

function Stepper(_ref) {
  var steps = _ref.steps,
      _ref$clearDataOnUnmou = _ref.clearDataOnUnmount,
      clearDataOnUnmount = _ref$clearDataOnUnmou === void 0 ? true : _ref$clearDataOnUnmou;
  var firstStep = steps[0];
  var firstStepKey = firstStep.key;
  var activeStepKey = useActiveStepKey(firstStepKey);
  React.useEffect(function () {
    return function () {
      return clearDataOnUnmount && clearStorage();
    };
  }, []);
  var nextStep = getNextObjectByKey(steps, activeStepKey);
  var activeStep = getObjectByKey(steps, activeStepKey);

  if (!activeStep) {
    return false;
  }

  var ActiveStepComponent = withStep(activeStep.component, activeStep.key, nextStep.key);
  return /*#__PURE__*/React__default["default"].createElement(ActiveStepComponent, activeStep.props);
}

var _excluded$1 = ["component", "key"];
/**
 * @param {React.Component} component
 * @param {string} [key]
 * @param {any[]} [props]
 * @returns {null}
 * @constructor
 */

function Step(_ref) {
  _ref.component;
      _ref.key;
      _objectWithoutProperties(_ref, _excluded$1);

  return null;
}

function useCheckRouter() {
  var navigate = reactRouterDom.useNavigate();

  if (!navigate) {
    // help to correctly determine the presence <BrowserRouter/> in the tree components :)
    throw new Error('<Stepper/> component must child the <BrowserRouter/> component');
  }
}

function useResetSteps() {
  var navigate = reactRouterDom.useNavigate();
  var location = reactRouterDom.useLocation();
  return function () {
    clearStorage();
    navigate(location.pathname, {
      state: _objectSpread2(_objectSpread2({}, location.state), {}, _defineProperty({}, HISTORY_STATE_KEY, null))
    });
  };
}

function useResetStepsAfter() {
  var navigate = reactRouterDom.useNavigate();
  var location = reactRouterDom.useLocation();
  return function () {
    for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
      keys[_key] = arguments[_key];
    }

    if (keys.length) {
      keys.forEach(function (key) {
        return addData(_defineProperty({}, key, null));
      });
      navigate(location.pathname, {
        state: _objectSpread2(_objectSpread2({}, location.state), {}, _defineProperty({}, HISTORY_STATE_KEY, keys[0]))
      });
    }
  };
}

function useStorageData() {
  return getData();
}

var _excluded = ["children"],
    _excluded2 = ["component"];

var StepperWrapper = function StepperWrapper(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  useCheckRouter();
  var steps = [];
  React__default["default"].Children.map(children, function (child, index) {
    if ( /*#__PURE__*/React__default["default"].isValidElement(child) && child.type === Step) {
      if (!('component' in child.props)) {
        throw new Error('Not all <Step/> have the "component" prop');
      }

      var _child$props = child.props,
          component = _child$props.component,
          _props = _objectWithoutProperties(_child$props, _excluded2);

      var key = child.key || "step".concat(index + 1);
      steps.push({
        component: component,
        key: key,
        props: _props
      });
    }
  });

  if (steps.length === 0) {
    throw new Error('No one <Step/> found in <Stepper/>');
  }

  return /*#__PURE__*/React__default["default"].createElement(Stepper, _extends({
    steps: steps
  }, props));
};

exports.Step = Step;
exports.Stepper = StepperWrapper;
exports.useActiveStepKey = useActiveStepKey;
exports.useResetSteps = useResetSteps;
exports.useResetStepsAfter = useResetStepsAfter;
exports.useStorageData = useStorageData;
//# sourceMappingURL=index.js.map
