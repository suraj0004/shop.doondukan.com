import CookieService from "../services/CookieService";
export const handleSession = () => {
  const remember = CookieService.get("remember");
  const token = CookieService.get("token");
  if (((remember && Number(remember) === 0) || !remember) && token) {
    let date = new Date();
    const expiryAfterHours = 6;
    date.setTime(date.getTime() + (1000 * 60 * 60 * expiryAfterHours));

    const options = { path: "/", expires: date };

    CookieService.set("token", token, options);
    CookieService.set("remember", 0, options);
    console.log("cookie service");
  }
};
