import axiosInstance from "@/lib/axios-instance";
import { useEffect, useState } from "react";

const useMyInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyInfo = async () => {
    try {
      const result = await axiosInstance.get("/user/my-info");
      setUser(result.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  return { user, setUser,fetchMyInfo, error, loading }; // Added setUser in the return
};

export default useMyInfo;
