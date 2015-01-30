//
// Dotty makes it easy to programmatically access arbitrarily nested objects and
// their properties.
//

module.exports = {
    exists: require('./lib/exists'),
    get: require('./lib/get'),
    search: require('./lib/search'),
    put: require('./lib/put'),
    remove: require('./lib/remove'),
    deepKeys: require('./lib/deepKeys')
}
