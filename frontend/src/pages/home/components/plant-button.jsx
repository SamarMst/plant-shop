const PlantButton = ({name}) => {
  return (
    <button
      className=" capitalize text-white text-xl w-full font-semibold 
            rounded-xl bg-lime-400 p-4 hover:bg-lime-600"
    >
      {name}
    </button>
  );
};

export default PlantButton;
