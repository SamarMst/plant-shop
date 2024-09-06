import Navbar from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import UserInfo from "./user-info";

const DashboarBuyer = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex my-28 p-4 flex-grow">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="text-lg w-48 h-12 flex items-center justify-center"
            >
              User Info
            </Button>
            <Button
              variant="outline"
              className="text-lg w-48 h-12 flex items-center justify-center"
            >
              History
            </Button>
            <Button
              variant="outline"
              className="text-lg w-48 h-12 flex items-center justify-center"
            >
              Orders Status
            </Button>
          </div>

          <UserInfo />
        </div>
      </div>
    </>
  );
};

export default DashboarBuyer;
