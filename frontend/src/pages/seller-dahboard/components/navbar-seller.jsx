import useMyInfo from "@/hook/useMyInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { CalendarDays } from "lucide-react";

const NavbarSeller = () => {
  const { user } = useMyInfo();
  const currentDate = format(new Date(), 'EEEE dd MMM yyyy');

  return (
    <div className=" flex items-center justify-between p-2">
      <div className=" text-black py-5 px-6 flex flex-col justify-between items-start gap-1 ">
        <div className="text-3xl font-bold">Welcome Back</div>
        <p className="flex gap-2 font-bold text-md items-center text-foreground"><CalendarDays /> {currentDate}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-1 pr-10">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className=" flex justify-start items-start flex-col">
            <h1 className=" capitalize font-semibold">
              {user?.name} {user?.lastname}
            </h1>
            <p className=" text-xs">{user?.user.role}</p>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Link to="/seller/seller-info">Profile Setting </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarSeller;
