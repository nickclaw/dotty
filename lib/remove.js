//
// `remove` is like `put` in reverse!
//
// The return value is `true` in the case that the value existed and was removed
// successfully, or `false` otherwise.
//

module.exports.remove = function remove(object, path, value) {
    if (typeof path === "string") {
        path = path.split(".");
    }

    if (!(path instanceof Array) || path.length === 0) {
        return false;
    }

    path = path.slice();

    var key = path.shift();

    if (typeof object !== "object" || object === null) {
        return false;
    }

    if (path.length === 0) {
        if (!Object.hasOwnProperty.call(object, key)) {
            return false;
        }

        delete object[key];

        return true;
    } else {
        return remove(object[key], path, value);
    }
};
