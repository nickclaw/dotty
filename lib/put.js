//
// The first two arguments for `put` are the same as `exists` and `get`.
//
// The third argument is a value to `put` at the `path` of the `object`.
// Objects in the middle will be created if they don't exist, or added to if
// they do. If a value is encountered in the middle of the path that is *not*
// an object, it will not be overwritten.
//
// The return value is `true` in the case that the value was `put`
// successfully, or `false` otherwise.
//

module.exports.put = function put(object, path, value) {
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
        object[key] = value;
    } else {
        if (typeof object[key] === "undefined") {
            object[key] = {};
        }

        if (typeof object[key] !== "object" || object[key] === null) {
            return false;
        }

        return put(object[key], path, value);
    }
};
