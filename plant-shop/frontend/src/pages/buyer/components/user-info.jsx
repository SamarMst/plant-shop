import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserInfo = () => {
  return (
    <>
      <div className="flex-grow ml-4 p-4 border border-black rounded-lg bg-white">
        <h3 className="text-xl font-bold mb-2">Your personal details </h3>
        <p className="text-sm text-gray-700">
          <form>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                /*  value={plantName}
              onChange={(e) => setPlantName(e.target.value)} */
              />
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                /*  value={plantName}
              onChange={(e) => setPlantName(e.target.value)} */
              />
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                placeholder="Age"
                /*  value={plantName}
              onChange={(e) => setPlantName(e.target.value)} */
              />
            </div>
            <Button type="submit">Save </Button>
          </form>
        </p>
      </div>
    </>
  );
};

export default UserInfo;
