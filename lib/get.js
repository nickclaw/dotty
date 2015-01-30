
//
// These arguments are the same as those for `exists`.
//
// The return value, however, is the property you're trying to access, or
// `undefined` if it can't be found. This means you won't be able to tell
// the difference between an unresolved path and an undefined property, so you
// should not use `get` to check for the existence of a property. Use `exists`
// instead.
//

module.exports.get = function get(object, path) {
    if (typeof path === "string") {
        path = path.split(".");
    }

    if (!(path instanceof Array) || path.length === 0) {
        return;
    }

    path = path.slice();

    var key = path.shift();

    if (typeof object !== "object" || object === null) {
        return;
    }

    if (path.length === 0) {
        return object[key];
    }

    if (path.length) {
        return get(object[key], path);
    }
};
