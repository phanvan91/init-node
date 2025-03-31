const AppServiceProvider = require('../providers/AppServiceProvider');
const RouteServiceProvider = require('../providers/RouteServiceProvider');
const DatabaseServiceProvider = require('../providers/DatabaseServiceProvider');

module.exports = async function bootstrapProviders(app) {
    await new AppServiceProvider(app).register();
    await new RouteServiceProvider(app).register();
    await new DatabaseServiceProvider(app).register();
};