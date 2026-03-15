export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  // Determine the cookie name based on the user's role
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';
  const cookieExpireDaysValue =
    process.env.COOKIE_EXPIRES_IN ?? process.env.COOKIE_EXPIRE;
  const cookieExpireDays = Number(cookieExpireDaysValue);
  const cookieExpireMs =
    (Number.isFinite(cookieExpireDays) ? cookieExpireDays : 7) *
    24 *
    60 *
    60 *
    1000;

  const isProd = String(process.env.NODE_ENV).toLowerCase() === "production";
  const sameSite =
    process.env.COOKIE_SAMESITE ?? (isProd ? "none" : "lax");
  const secure =
    process.env.COOKIE_SECURE != null
      ? String(process.env.COOKIE_SECURE).toLowerCase() === "true"
      : isProd;

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + cookieExpireMs),
      httpOnly: true,
      sameSite,
      secure,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
