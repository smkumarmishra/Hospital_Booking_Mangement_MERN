import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

const getBearerToken = (req) => {
  const headerValue = req.headers?.authorization ?? req.headers?.Authorization;
  if (!headerValue) return null;
  if (typeof headerValue !== "string") return null;
  const [scheme, token] = headerValue.split(" ");
  if (scheme?.toLowerCase() !== "bearer") return null;
  return token?.trim() || null;
};

const getAuthToken = (req, cookieName) => {
  return req.cookies?.[cookieName] || getBearerToken(req);
};

const verifyAndLoadUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);
  return user;
};

// Middleware to authenticate dashboard users
export const isAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = getAuthToken(req, "adminToken");
    if (!token) {
      return next(
        new ErrorHandler("Dashboard User is not authenticated!", 400)
      );
    }
    try {
      req.user = await verifyAndLoadUser(token);
    } catch {
      return next(new ErrorHandler("Invalid token!", 400));
    }
    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  }
);

// Middleware to authenticate frontend users
export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = getAuthToken(req, "patientToken");
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 400));
    }
    try {
      req.user = await verifyAndLoadUser(token);
    } catch {
      return next(new ErrorHandler("Invalid token!", 400));
    }
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  }
);

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource!`
        )
      );
    }
    next();
  };
};
