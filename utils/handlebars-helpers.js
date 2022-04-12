const handlebarsHelpers = {
    checkIsLogged: (a) => {
        return !a
    },

    // handleUrlUserId: (userId) => {
    //     const qs = new URLSearchParams({
    //         userId: userId,
    //     });
    //     return qs.toString();
    // },
};

module.exports = {
    handlebarsHelpers,
};