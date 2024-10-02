import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMyInfo from "@/hook/useMyInfo";
import axiosInstance from "@/lib/axios-instance";
import { useState } from "react";

import Toast from "react-hot-toast";

const SellerInfo = () => {
  const { user, setUser, fetchMyInfo } = useMyInfo();

  // Separate states for each form
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    lastname: "",
    age: "",
  });
  const [emailInfo, setEmailInfo] = useState({
    oldEmail: "",
    newEmail: "",
  });
  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input change for each form
  const handleInputChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Submit handler for personal info
  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/my-info", personalInfo);
      setUser(response.data);
      fetchMyInfo();
      Toast.success("Personal info updated successfully!");
    } catch (error) {
      console.error("Error updating personal info:", error);
      Toast.error("Failed to update personal info.");
    }
  };

  // Submit handler for email change
  const handleEmailChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle email change logic here
      Toast.success("Email updated successfully!");
    } catch (error) {
      console.error("Error updating email:", error);
      Toast.error("Failed to update email.");
    }
  };

  // Submit handler for password change
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      Toast.error("Passwords do not match.");
      return;
    }
    try {
      // Handle password change logic here
      Toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      Toast.error("Failed to change password.");
    }
  };

  return (
    <div className=" space-y-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <p className="text-gray-600">
          Manage your personal information, email, and password settings
        </p>
      </header>
      <Card className="create-user-card">
        <CardHeader>
          <CardTitle>Your Personal Details</CardTitle>
          <CardDescription>Update your name, last name, and age</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
            <div className="form-group">
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={personalInfo.name}
                onChange={(e) => handleInputChange(e, setPersonalInfo)}
                required
              />
            </div>
            <div className="form-group">
              <Label htmlFor="lastname">Last Name:</Label>
              <Input
                type="text"
                id="lastname"
                name="lastname"
                value={personalInfo.lastname}
                onChange={(e) => handleInputChange(e, setPersonalInfo)}
                required
              />
            </div>
            <div className="form-group">
              <Label htmlFor="age">Age:</Label>
              <Input
                type="text"
                id="age"
                name="age"
                value={personalInfo.age}
                onChange={(e) => handleInputChange(e, setPersonalInfo)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="create-user-card">
        <CardHeader>
          <CardTitle>Change Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailChangeSubmit} className="space-y-4">
            <div className="form-group">
              <Label htmlFor="oldEmail">Old Email:</Label>
              <Input
                type="email"
                id="oldEmail"
                name="oldEmail"
                value={emailInfo.oldEmail}
                onChange={(e) => handleInputChange(e, setEmailInfo)}
                required
              />
            </div>
            <div className="form-group">
              <Label htmlFor="newEmail">New Email:</Label>
              <Input
                type="email"
                id="newEmail"
                name="newEmail"
                value={emailInfo.newEmail}
                onChange={(e) => handleInputChange(e, setEmailInfo)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="create-user-card">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
            <div className="form-group">
              <Label htmlFor="oldPassword">Old Password:</Label>
              <Input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={passwordInfo.oldPassword}
                onChange={(e) => handleInputChange(e, setPasswordInfo)}
                required
              />
            </div>
            <div className="form-group">
              <Label htmlFor="newPassword">New Password:</Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordInfo.newPassword}
                onChange={(e) => handleInputChange(e, setPasswordInfo)}
                required
              />
            </div>
            <div className="form-group">
              <Label htmlFor="confirmPassword">Confirm Password:</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordInfo.confirmPassword}
                onChange={(e) => handleInputChange(e, setPasswordInfo)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>Permanently delete your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Delete</Button> 
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerInfo;
