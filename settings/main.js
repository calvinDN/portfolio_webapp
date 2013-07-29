var settings = {};

settings.admin          = {};
settings.admin.name     = "admin";
settings.admin.password = "password";

settings.server         = {};
settings.server.port    = process.env.WEB_PORT || 8000;
settings.server.db      = "mongodb://localhost/calvindn";

settings.mail           = {};
settings.mail.user      = "calvindn@gmail.com";
settings.mail.password  = "sL0077Jx&xgxIuBi%812";

module.exports = settings;