const UserAuthController = require("../controllers/auth.controller");

module.exports = function (app) {
  app.post("/register", UserAuthController.register);
  app.post("/login", UserAuthController.login);
  app.patch("/updateUser", UserAuthController.updateUser);
};
