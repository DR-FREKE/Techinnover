import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const _userModel = new Schema({
  user: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    familyMember: {
      type: Array,
    },
    passport: {
      type: String,
      //   required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
  },
});

// _userModel.plugin(uniqueValidator, {
//   type: "mongoose-unique-validator",
//   message: "Error, expected {PATH} to be unique.",
// });

export default model("users", _userModel);
