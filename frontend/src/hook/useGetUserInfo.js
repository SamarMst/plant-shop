import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const useGetUserInfo = () => {
  const [data, setData] = useState("");
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  useEffect(() => {
    setData(decoded);
  }, []);
  return { id: data.id, role: data.role };
};

export default useGetUserInfo;
