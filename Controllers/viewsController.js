require("dotenv").config();

module.exports.about_get = (req, res) => {
  res.render("about");
};
module.exports.index_get = (req, res) => {
  res.render("index");
};
module.exports.newUser_get = (req, res) => {
  res.render("newUser");
};
module.exports.loginUser_get = (req, res) => {
  res.render("loginUser", { webURL: process.env.URL_WEB_SERVER });
};
module.exports.chat_get = (req, res) => {
  res.render("chat");
};
