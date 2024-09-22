import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetUserInfo from "@/hook/useGetUserInfo";
import axiosInstance from "@/lib/axios-instance";
import { useEffect, useState } from "react";
import Toast from "react-hot-toast";

const SellerInfo = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(18);
  const { id } = useGetUserInfo();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}/info`);
        if (response.data) {
          const { name, lastname, age } = response.data;
          setName(name);
          setLastName(lastname);
          setAge(age);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/user/${id}/info`, {
        name,
        lastname: lastName,
        age,
      });
      Toast.success("User info updated successfully.");
    } catch (error) {
      Toast.error("Failed to update user info.");
    }
  };

  return (
    <>
      <div className="flex-grow p-4 mt-10 border rounded-lg bg-white">
        <h3 className="text-xl font-bold mb-2">Your personal details </h3>
        <div className="text-sm text-gray-700">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="flex my-5 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mb-9"
            >
              {name || lastName || age ? "Update" : "Save"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellerInfo;
