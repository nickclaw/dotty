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
        return Object.hasOwnProperty.apply(object, [key]);
    } else {
        return exists(object[key], path);
    }
};
