const handlebarsHelpers = {
    checkIsLogged: (a) => {
        return !a
    },
    checkIsComplete: (status) => {
        if (status === "Completed") {
            return true
        } else if (status !== "Completed") {
            return false
        }
    }


};

module.exports = {
    handlebarsHelpers,
};