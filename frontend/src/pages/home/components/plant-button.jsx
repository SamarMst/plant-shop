import { useNavigate } from "react-router-dom";

const PlantButton = ({ id, name }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/plant/${id}`);
  };

  return (
    <button
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default PlantButton;
