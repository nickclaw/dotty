//
// `deepKeys` creates a list of all possible key paths for a given object.
//
// The return value is always an array, the members of which are paths in array
// format. If you want them in dot-notation format, do something like this:
//
// ```js
// dotty.deepKeys(obj).map(function(e) {
//   return e.join(".");
// });
// ```
//
// *Note: this will probably explode on recursive objects. Be careful.*
//

module.exports = function deepKeys(object, options, prefix) {
    options || options = {};
    prefix || prefix = [];

    var keys = [];

    for (var k in object) {
        if (!Object.hasOwnProperty.call(object, k)) {
            continue;
        }

        if (!options.leavesOnly || typeof object[k] !== "object") {
            keys.push(prefix.concat([k]));
        }

        if (typeof object[k] === "object" && object[k] !== null) {
            keys = keys.concat(deepKeys(object[k], options, prefix.concat(k)));
        }
    }

    if (options.asStrings) {
        keys = keys.map(function(e) {
            return e.join(".");
        });
    }

    return keys;
};
