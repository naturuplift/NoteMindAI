
exports.home = (req, res) => {
    res.status(200).json( {
        success: true,
        greeting: "Hello from API",
    });
};

