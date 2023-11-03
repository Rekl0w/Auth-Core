const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { username, email, first_name, last_name, password, password_confirm } =
    req.body;

  if (
    !username ||
    !email ||
    !first_name ||
    !last_name ||
    !password ||
    !password_confirm
  ) {
    return res.status(422).json({ message: "Please fill in all fields" });
  }

  if (password !== password_confirm) {
    return res.status(422).send("Passwords do not match");
  }

  const userExists = await User.exists({ email }).exec();

  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      first_name,
      last_name,
      password: hashedPassword,
    })

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Could not create user" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Invalid fields" });
  }

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.status(401).json({ message: "Email or password is incorrect" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Email or password is incorrect" });
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m",
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  user.refresh_token = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });
  res.json({ access_token: accessToken });
}

async function logout(req, res) {
  const cookies = req.cookies;

  if (!cookies.refreshToken) {
    return res.sendStatus(204);
  }

  const refreshToken = cookies.refreshToken;
  const user = await User.findOne({ refresh_token: refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.sendStatus(204);
  }

  user.refresh_token = null;
  await user.save();

  res.clearCookie("refreshToken", { httpOnly: true });
  res.sendStatus(204);
}

async function refresh(req, res) {
  const cookies = req.cookies;

  if (!cookies.refreshToken) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.refreshToken;
  const user = await User.findOne({ refresh_token: refreshToken }).exec();

  if (!user) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      {
        id: decoded.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );

    res.json({ access_token: accessToken });
  });
}

async function user(req, res) {
  const user = req.user;

  return res.status(200).json(user);
}

module.exports = { register, login, logout, refresh, user };
