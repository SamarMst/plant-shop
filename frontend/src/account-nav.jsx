import { Bell } from "lucide-react";

const AccountNav = ({ name, role, src, alt }) => {
  console.log("🚀 ~ AccountNav ~ name:", name);

  return (
    <nav className="flex flex-row justify-between items-center  p-4 ">
      <div className="flex items-center gap-2">
        <div>
          <img
            className=" object-cover size-8 rounded-full ring-2 ring-blue-50 dark:ring-gray-800"
            src={src}
            alt={alt}
          />
        </div>
        <div>
          <h1 className="text-xl text-gray-400 flex gap-2 ">
            welcome back
            <span className="capitalize text-black font-bold">{name}</span> 👋
          </h1>
          <h3 className=" font-bold text-xs">{role} </h3>
        </div>
      </div>
      <Bell />
    </nav>
  );
};

export default AccountNav;
