const STEPPER_DATA_KEY = 'REACT_JS_STEPPER_DATA';

function getStorage() {
    const rawData = sessionStorage.getItem(STEPPER_DATA_KEY);

    return rawData ? JSON.parse(rawData) : { activeStepKey: null, data: [] };
}

export function issetStorage() {
    return sessionStorage.getItem(STEPPER_DATA_KEY) !== null;
}

export function getActiveStepKey() {
    const storage = getStorage();

    return storage.activeStepKey;
}

export function setActiveStepKey(activeStepKey) {
    const storage = getStorage();

    sessionStorage.setItem(STEPPER_DATA_KEY, JSON.stringify({ ...storage, activeStepKey }));
}

export function getData() {
    const storage = getStorage();

    return storage.data;
}

export function addData(data) {
    const storage = getStorage();

    sessionStorage.setItem(STEPPER_DATA_KEY, JSON.stringify({ ...storage, data: { ...storage.data, ...data } }));
}

export function clearStorage() {
    sessionStorage.removeItem(STEPPER_DATA_KEY);
}
