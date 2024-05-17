const loadIndex = async (req, res) => {
    try {
        res.setHeader("ngrok-skip-browser-warning", "arafat");
        res.render("index");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    loadIndex,
};
