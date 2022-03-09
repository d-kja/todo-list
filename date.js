exports.getDay = function () {
    const now = new Date();

    const day = now.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    return day;
};

exports.getDate = function () {
    const now = new Date();

    const day = now.toLocaleDateString("en-US", {
        weekday: "long",
    });

    return day;
};

module.exports.getMonth = () => {
    const now = new Date();

    const day = now.toLocaleDateString("en-US", {
        month: "long",
    });

    return day;
}