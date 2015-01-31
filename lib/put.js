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

module.exports = function put(object, path, value) {
    if (typeof path === "string") {
        path = path.split(".");
    } else if (!(path instanceof Array)) {
        return false;
    } else {
        path = path.slice();
    }

    if (path.length === 0) {
        return false;
    }

    return _put(object, path, value);
};

function _put(object, path, value) {
    if (object instanceof Array) {
        object.forEach(function(item) {
            _put(item, path.slice(), value);
        });
        return true;
    }

    var key = path.shift();

    if (path.length === 0) {
        object[key] = value;
        return true;
    } else {

        if (typeof object[key] !== "object" || object[key] === null) {
            object[key] = {};
        }

        return _put(object[key], path, value);
    }
}
