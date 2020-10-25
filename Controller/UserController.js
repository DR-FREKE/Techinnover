import "babel-polyfill";
import Users from "../Model/user.model";

class UserController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  static _getUsers = async (req, res) => {
    try {
      const all_user = await Users.find();
      const response = {
        success: true,
        response_code: "00",
        response_message: "user retrieved successfully",
        data: all_user,
        total: all_user.length,
      };
      res.json(response);
    } catch (error) {
      res.sendStatus(404);
    }
  };

  static _addUsers = async (req, res) => {
    let image;
    if (req.file != null || req.file != undefined) {
      image = req.file.path;
    } else {
      image = "";
    }

    const user_data = new Users({
      user: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        familyMember: JSON.parse(req.body.familyMember),
        passport: image,
        dob: req.body.dob,
      },
    });

    try {
      const user_exist = await Users.exists({ email: req.body.email });
      if (!user_exist) {
        const add_user = await user_data.save();
        const response = {
          success: true,
          response_code: "00",
          response_message: "user added successfully",
          data: add_user,
        };
        res.json(response);
      }
    } catch (error) {
      if (error.code == 11000) {
        res.status(409).json({ response_message: "user already exist" });
      }
      res.status(404).json(error);
    }
  };
}

export default UserController;
