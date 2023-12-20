import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register user

// this function has to be async because it's a call to the database
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      occupation,
      viewedProfile,
      impressions
    } = req.body;

    // we're going to use this salt to encrypt the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    //  the flow is user gives us password, we hash it, store it in database and then match it when 
    // they try to login, if it matches we give a JWT

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      occupation,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100)
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({error: err.message});;
  }
}

// Logging in

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(400).json({msg: "User not found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({msg: "Invalid credentials"});
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    
    // we don't want to send the password back to the user
    delete user.password;
    res.status(200).json({token, user});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}