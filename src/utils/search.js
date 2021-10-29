export function getObjectByKey(objects, key) {
    for (let object of objects) {
        if (object.key === key) {
            return object;
        }
    }

    return null;
}

export function getNextObjectByKey(objects, key) {
    let nextObject = objects[0];

    for (let i = objects.length - 1; i >= 0; i--) {
        const object = objects[i];

        if (object.key === key) {
            break;
        }

        nextObject = object;
    }

    return nextObject;
}

export function getPrevObjectByKey(objects, key) {
    let prevObject = objects[objects.length - 1];

    for (let i = 0; i < objects.length; i++) {
        const object = objects[i];

        if (object.key === key) {
            break;
        }

        prevObject = object;
    }

    return prevObject;
}
