import CookieService from "../services/CookieService";
import imageCompression from "browser-image-compression";

export const handleSession = () => {
  const remember = CookieService.get("remember");
  const token = CookieService.get("token");
  if (((remember && Number(remember) === 0) || !remember) && token) {
    let date = new Date();
    const expiryAfterHours = 6;
    date.setTime(date.getTime() + 1000 * 60 * 60 * expiryAfterHours);

    const options = { path: "/", expires: date };

    CookieService.set("token", token, options);
    CookieService.set("remember", 0, options);
    console.log("cookie service");
  }
};

export const compressImgae = async (imageFile) => {
  const options = {
    maxSizeMB: 5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
  return null;
};
