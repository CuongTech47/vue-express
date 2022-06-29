const User = require("../model/user.model");

const jwt = require("jsonwebtoken")
class AuthController {
  index(req, res) {
    res.json({
      message: "hello auth",
    });
  }
  async register(req, res) {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      return res.json({ message: "Người dùng đã tồn tại" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      newUser.save();
      return res.json(newUser);
    }
  }
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "Người dùng không tồn tại",
      });
    } else {
      //check password
      if (password !== user.password) {
        return res.json({
          message: "mật khẩu không đúng",
        });
      }
      const payload = {
        email,
        name: user.name,
      };
      jwt.sign(payload, "secret", (err, token) => {
        if (err) console.log(err);
        else {
          return res.json({
            token: token,
          });
        }
      });
    }
  }
}

module.exports = new AuthController();
