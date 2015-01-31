//
// `remove` is like `put` in reverse!
//
// The return value is `true` in the case that the value existed and was removed
// successfully, or `false` otherwise.
//

module.exports = function remove(object, path, value) {
    if (typeof path === "string") {
        path = path.split(".");
    } else if ( !(path instanceof Array)) {
        return false;
    } else {
        path = path.slice();
    }

    if (path.length === 0) {
        return false;
    }

    return _remove(object, path);
};

function _remove(object, path) {
    if (object instanceof Array) {
        object.forEach(function(item) {
            _remove(item, path.slice());
        });
        return true;
    }

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
        return _remove(object[key], path);
    }
}
