import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetUserInfo from "@/hook/useGetUserInfo";
import axiosInstance from "@/lib/axios-instance";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const { email } = useGetUserInfo();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const { id } = useGetUserInfo();
  const navigate = useNavigate();

  const handlePay = () => {
    localStorage.removeItem("plant");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}/info`);
        const { name, lastname } = response.data;
        setName(name);
        setLastName(lastname);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [id]);

  return (
    <>
      <nav className="py-4 w-full flex justify-center items-center">
        <Logo />
      </nav>
      <hr className="border-2 font-bold" />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col mt-14 ml-5 w-1/2">
          <div className="flex flex-col mb-5 p-4 border border-black rounded-lg shadow-sm w-full">
            <h3 className="font-sans font-semibold text-xl mb-4">Email</h3>
            <h4 className="font-sans font-semibold text-xl">{email}</h4>
          </div>
          <div className="flex flex-col p-4 border border-black rounded-lg shadow-sm w-full">
            <h3 className="font-sans font-semibold text-xl mb-4">Billing</h3>
            <h5 className="font-sans font-semibold text-sm p-1">
              Address name
            </h5>
            <Input
              className="font-sans text-base h-12"
              type="text"
              placeholder="for example: home, job ..."
            />
            <h5 className="font-sans font-semibold text-sm p-1">Name *</h5>
            <Input
              className="font-sans text-lg h-12"
              type="text"
              required
              value={name}
            />
            <h5 className="font-sans font-semibold text-sm p-1">Last Name *</h5>
            <Input
              className="font-sans text-lg h-12"
              type="text"
              required
              value={lastName}
            />
            <h5 className="font-sans font-semibold text-sm p-1">CAP *</h5>
            <Input className="font-sans text-lg h-12" type="text" required />
            <h5 className="font-sans font-semibold text-sm p-1">City *</h5>
            <Input className="font-sans text-lg h-12" type="text" required />
            <h5 className="font-sans font-semibold text-sm p-1">Country *</h5>
            <Input
              className="font-sans text-lg h-12"
              type="text"
              placeholder="Tunisia"
              disabled
            />
            <h5 className="font-sans font-semibold text-sm p-1">
              Telephone number *
            </h5>
            <Input className="font-sans text-lg h-12" type="text" />
            <h5 className="font-sans font-semibold text-sm p-1">
              * Required fields
            </h5>
          </div>
        </div>
        <div className="flex flex-col border  rounded-lg shadow-sm w-2/3 mt-14 ml-6 p-8">
          <h3 className="text-lg font-sans font-bold">
            Credit Card Information
          </h3>
          <Input
            className="font-sans text-lg h-12 mb-2 mt-4"
            type="text"
            placeholder="Your Credit Card Number"
          />
          <Input
            className="font-sans text-lg h-12 mb-4 mt-4"
            type="password"
            placeholder="Your Credit Card Code"
          />

          <hr className="border-2 font-bold mb-4" />
          <div className="flex justify-between">
            <h3 className="text-lg font-sans font-bold">Total</h3>
            <h3 className="text-lg font-sans font-bold mb-4">
              {totalPrice} DT
            </h3>
          </div>
          <Button className="text-center h-11 w-full text-xl font-sans mt-4 bg-black text-white border border-black rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-300 mb-5">
            Pay
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button
          className=" text-center mt-8 mb-8 h-11 w-96 text-xl font-sans bg-white text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          Back to the store
        </Button>
      </div>
    </>
  );
};

export default Payment;
