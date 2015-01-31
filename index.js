//
// Dotty makes it easy to programmatically access arbitrarily nested objects and
// their properties.
//

var dotty = module.exports = {
    get: require('./lib/get'),
    search: require('./lib/search'),
    put: require('./lib/put'),
    remove: require('./lib/remove')
}
