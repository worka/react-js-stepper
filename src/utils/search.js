export function getObjectByKey(objects, key) {
    for (let object of objects) {
        if (object.key === key) {
            return object;
        }
    }

    return null;
}

export function getNextObjectByKey(objects, key) {
    let objectsCount = objects.length;
    let nextObject = objects[0];

    for (let i = objectsCount - 1; i >= 0; i--) {
        const object = objects[i];

        if (object.key === key) {
            break;
        }

        nextObject = object;
    }

    return nextObject;
}

export function getPrevObjectByKey(objects, key) {
    let objectsCount = objects.length;
    let prevObject = objects[objectsCount - 1];

    for (let i = 0; i < objectsCount; i++) {
        const object = objects[i];

        if (object.key === key) {
            break;
        }

        prevObject = object;
    }

    return prevObject;
}
