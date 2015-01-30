//
// Arguments are similar to `exists` and `get`, with the exception that path
// components are regexes with some special cases. If a path component is `"*"`
// on its own, it'll be converted to `/.*/`.
//
// The return value is an array of values where the key path matches the
// specified criterion. If none match, an empty array will be returned.
//

module.exports = function search(object, path) {
    if (typeof path === "string") {
        path = path.split(".");
    } else if ( !(path instanceof Array)) {
        return;
    }

    if (path.length === 0) {
        return;
    }

    return _search(object, path);
};

function _search(object, path) {
    path = path.slice();
    var key = path.shift();

    if (typeof object !== "object" || object === null) {
        return;
    }

    if (key === "*") {
        key = /.*/;
    } else if (typeof key === 'string') {
        key = new RegExp(key);
    }


    if (path.length === 0) {
        return Object.keys(object)
            .filter(key.test.bind(key))
            .map(function(k) { return object[k]; });
    } else {
        return Array.prototype.concat.apply([], Object.keys(object).filter(key.test.bind(key)).map(function(k) { return _search(object[k], path); }));
    }
}
