const jwt = require("jsonwebtoken");

const generateAuthToken = async (id) => {
  const access = "auth";
  const token = jwt
    .sign({ _id: id, access }, "NJBKJBK34853456HVJHV")
    .toString();

  return token;
};

module.exports = {
  generateAuthToken,
};
