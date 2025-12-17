const CookieSession = require('cookie-session');

export const CookieSessionMiddleware = (COOKIE_KEY: string) => CookieSession({
    keys: [COOKIE_KEY],
});