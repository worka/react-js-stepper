import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
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

function Step() {
  return null;
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

function withStep(Component, activeStepKey, prevStepKey, nextStepKey) {
  return function (props) {
    var history = useHistory();
    var location = useLocation();
    var allData = getData();
    var stepData = allData[activeStepKey] || null;

    var goToStepByKey = function goToStepByKey(key) {
      initializeStorage();
      history.push(_objectSpread2(_objectSpread2({}, location), {}, {
        state: _objectSpread2(_objectSpread2({}, location.state), {}, _defineProperty({}, HISTORY_STATE_KEY, key))
      }));
    };

    var goToPrevStep = function goToPrevStep() {
      history.goBack();
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

    return /*#__PURE__*/React.createElement(Component, _extends({}, props, {
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
  var nextObject = objects[0];

  for (var i = objects.length - 1; i >= 0; i--) {
    var object = objects[i];

    if (object.key === key) {
      break;
    }

    nextObject = object;
  }

  return nextObject;
}
function getPrevObjectByKey(objects, key) {
  var prevObject = objects[objects.length - 1];

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];

    if (object.key === key) {
      break;
    }

    prevObject = object;
  }

  return prevObject;
}

var _excluded = ["children"],
    _excluded2 = ["component"];
var Stepper = (function (_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  var history = useHistory();

  if (!history) {
    // help to correctly determine the presence <BrowserRouter/> in the tree components :)
    throw new Error('<Stepper/> component must child the <BrowserRouter/> component');
  }

  var steps = [];
  var i = 1;
  React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child) && child.type === Step) {
      if (!('component' in child.props)) {
        throw new Error('Not all <Step/> have the "component" prop');
      }

      var _child$props = child.props,
          component = _child$props.component,
          _props = _objectWithoutProperties(_child$props, _excluded2);

      var key = child.key || "step".concat(i);
      steps.push({
        component: component,
        key: key,
        props: _props
      });
      i++;
    }
  });

  if (steps.length === 0) {
    throw new Error('No one <Step/> found in <Stepper/>');
  }

  return /*#__PURE__*/React.createElement(Stepper$1, _extends({
    steps: steps
  }, props));
});

function Stepper$1(_ref2) {
  var steps = _ref2.steps,
      _ref2$clearDataOnUnmo = _ref2.clearDataOnUnmount,
      clearDataOnUnmount = _ref2$clearDataOnUnmo === void 0 ? true : _ref2$clearDataOnUnmo;

  var _useLocation = useLocation(),
      state = _useLocation.state;

  useEffect(function () {
    return function () {
      return clearDataOnUnmount && clearStorage();
    };
  }, []);
  var firstStep = steps[0];
  var firstStepKey = firstStep.key;

  if (!state) {
    state = _defineProperty({}, HISTORY_STATE_KEY, firstStepKey);
  }

  if (state[HISTORY_STATE_KEY] !== firstStepKey && !issetStorage()) {
    state = _defineProperty({}, HISTORY_STATE_KEY, firstStepKey);
  }

  var activeStepKey = state[HISTORY_STATE_KEY];
  var prevStep = getPrevObjectByKey(steps, activeStepKey);
  var nextStep = getNextObjectByKey(steps, activeStepKey);
  var activeStep = getObjectByKey(steps, activeStepKey);

  if (!activeStep) {
    return false;
  }

  var ActiveStepComponent = withStep(activeStep.component, activeStep.key, prevStep.key, nextStep.key);
  return /*#__PURE__*/React.createElement(ActiveStepComponent, activeStep.props);
}

export { Step, Stepper };
//# sourceMappingURL=index.es.js.map
