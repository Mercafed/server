export const isAuthenticated = (req, res, next) => {
    if ((req.session && req.session.user) || req.url === "/login"|| req.url.startsWith("/public/css")) {
        return next();
    } else {
        res.redirect("/login");
    }
};