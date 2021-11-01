import { STORAGE_KEY } from '../constants';

const initialStorage = { data: [], init: false };

function getStorage() {
    const rawData = sessionStorage.getItem(STORAGE_KEY);

    return rawData ? JSON.parse(rawData) : initialStorage;
}

export function issetStorage() {
    return sessionStorage.getItem(STORAGE_KEY) !== null;
}

export function initializeStorage() {
    const storage = getStorage();

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...storage, init: true }));
}

export function getData() {
    const storage = getStorage();

    return storage.data;
}

export function addData(data) {
    const storage = getStorage();

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...storage, data: { ...storage.data, ...data } }));
}

export function clearStorage() {
    sessionStorage.removeItem(STORAGE_KEY);
}
