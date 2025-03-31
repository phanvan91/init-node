module.exports = class AppServiceProvider {
    constructor(app) {
        this.app = app;
    }

    async register() {
        // Nơi bạn bind service, middleware global, helper
        this.app.locals.appName = 'Node Laravel';
        console.log('🔌 AppServiceProvider Registered');
    }
}