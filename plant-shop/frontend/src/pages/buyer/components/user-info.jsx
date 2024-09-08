import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const UserInfo = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(18);

  return (
    <>
      <div className="flex-grow ml-4 p-4 border border-black rounded-lg bg-white">
        <h3 className="text-xl font-bold mb-2">Your personal details </h3>
        <div className="text-sm text-gray-700">
          <form>
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
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
