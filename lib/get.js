
//
// These arguments are the same as those for `exists`.
//
// The return value, however, is the property you're trying to access, or
// `undefined` if it can't be found. This means you won't be able to tell
// the difference between an unresolved path and an undefined property, so you
// should not use `get` to check for the existence of a property. Use `exists`
// instead.
//

module.exports = function get(object, path) {
    if (typeof path === "string") {
        path = path.split(".");
    } else if (!(path instanceof Array)) {
        return;
    } else {
        path = path.slice();
    }

    if (path.length === 0) {
        return object;
    }

    return _get(object, path);
};

function _get(object, path) {
    var key = path.shift();

    if (typeof object !== "object" || object === null) {
        return;
    }

    if (path.length === 0) {
        return object[key];
    }

    return _get(object[key], path);
}
