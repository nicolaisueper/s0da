exports = module.exports = {
    buildConnectionString: function (user, pass, host, port, db) {
        return "postgres://" + user + ":" + pass + "@" + host + ":" + port + "/" + db;
    }
};
