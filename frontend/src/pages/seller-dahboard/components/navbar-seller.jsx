import useGetUserInfo from "@/hook/useGetUserInfo";

const NavbarSeller = () => {
  const { name, lastName } = useGetUserInfo();
  return (
    <div>
      <div className=" text-black py-5 px-6 flex justify-between items-center ">
        <div className="text-xl font-bold">Welcome Back, {name}</div>
      </div>
    </div>
  );
};

export default NavbarSeller;
