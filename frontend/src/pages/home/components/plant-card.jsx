import Button from "./button-buy";

const PlantCard = ({name,type,price,plantImage}) => {
  return (
    <div className=" p-4 shadow-lg rounded-xl w-80">
      <img
        src={`http://localhost:4000/${plantImage}`}
        alt="name"
        className=" rounded-xl"
      />
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className=" text-gray-400 ">{type}</p>
      <p className=" font-bold">{price}</p>
      <Button name="buy" />
    </div>
  );
};

export default PlantCard;
