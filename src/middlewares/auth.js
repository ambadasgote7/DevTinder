const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        return res.status(401).send("Unauthorized");
    }   else {
        next();
    }
};

const userAuth = (req, res, next) => {
    const token = "xyz";
    const isUserAuthorized = token === "xyz";
    if (!isUserAuthorized) {
        return res.status(401).send("Unauthorized");
    }   else {
        next();
    }
};

module.exports = {
    adminAuth, userAuth
};