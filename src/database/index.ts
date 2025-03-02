import { NextFunction } from "express";
import mongoose from "mongoose";
import { db_uri } from "../config";

const connectDb = async (next: NextFunction) => {
  try {
    const db_res = await mongoose.connect(db_uri!);
    if (db_res.connection.host) {
      console.log(`Database connected,`);
      return next();
    } else {
      return console.log("Unable to connect to the DB.", db_res);
    }
  } catch (error: any) {
    return console.log("Unable to connect to the database.", error.message);
  }
};

export { connectDb };
