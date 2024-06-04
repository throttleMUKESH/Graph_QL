import { users } from "../dummyData/Data.js";
import User from "../models/user_model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    // Sign Up
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();
        await context.login(newUser); // Assuming context.login is a custom function to handle login

        return newUser;
      } catch (err) {
        console.error("Error in signup:", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    // Login
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user); // Assuming context.login is a custom function to handle login

        return user;
      } catch (err) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    // Logout
    logout: async (_, __, context) => {
      try {
        await context.logout(); // Assuming context.logout is a custom function to handle logout
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (err) {
        console.error("Error in logout:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  
  Query: {
    // Authenticated User
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser(context.req.headers.authorization); // Ensure context.getUser is correctly defined and accessible
        return user;
      } catch (err) {
        console.error("Error in authUser: ", err);
        throw new Error("Internal server error");
      }
    },

    // User by ID
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error in user query", err);
        throw new Error(err.message || "Error getting user");
      }
    },
  },

  // TODO: add user/transaction relation
};

export default userResolver;
