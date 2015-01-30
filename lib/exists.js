//
// `object` is an object, `path` is the path to the property you want to check
// for existence of.
//
// `path` can be provided as either a `"string.separated.with.dots"` or as
// `["an", "array"]`.
//
// Returns `true` if the path can be completely resolved, `false` otherwise.
//
module.exports = function exists(object, path) {
    if (typeof path === "string") {
        path = path.split(".");
    } else if (!(path instanceof Array)) {
        return false;
    } else {
        path = path.slice();
    }

    if (path.length === 0) {
        return !!object;
    }

    return _exists(object, path);
};

function _exists(object, path) {
    var key = path.shift();

    if (typeof object !== "object" || object === null) {
        return false;
    }

    if (path.length === 0) {
        return Object.hasOwnProperty.apply(object, [key]);
    } else {
        return _exists(object[key], path);
    }
}
