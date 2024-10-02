import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import useMyInfo from "@/hook/useMyInfo";
import axiosInstance from "@/lib/axios-instance";
import { useState } from "react";

const DashboardSeller = () => {
    //to make this better use ReactQuerry
  const { user, setUser,fetchMyInfo } = useMyInfo(); 
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    age: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/my-info", formData);
      setUser(response.data); 
      fetchMyInfo()
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="dashboard-container">

      
      {!user && (
        <Card className="create-user-card">
          <CardHeader>
            <CardTitle>Create User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="form-group">
                <Label htmlFor="name">Name:</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <Label htmlFor="lastName">Last Name:</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <Label htmlFor="age">Age:</Label>
                <Input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardSeller;
