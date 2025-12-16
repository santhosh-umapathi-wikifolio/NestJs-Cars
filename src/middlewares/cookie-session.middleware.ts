const CookieSession = require('cookie-session');

export const CookieSessionMiddleware = CookieSession({
    keys: ['nestjs-cars-secret-key'],
});