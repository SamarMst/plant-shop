import { jwtDecode } from "jwt-decode";

const useGetUserInfo = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No token found");
    return "";
  }
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export default useGetUserInfo;
