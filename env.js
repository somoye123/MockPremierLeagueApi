module.exports = {
    mongodb_url : process.env.MONGODB_URL,
    secret: process.env.JWT_SECRET,
    port : process.env.PORT || 4000,
    environment : process.env.NODE_ENV,
}
