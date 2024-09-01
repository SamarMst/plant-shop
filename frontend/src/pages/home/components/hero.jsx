import PlantButton from "./plant-button";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row justify-around p-4 py-20">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-[#21441f] font-bold text-7xl ">
          Various Indoor <br /> Plant shop
        </h1>
        <p className=" font-semibold text-zinc-400 max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          alias aperiam esse eius assumenda sunt est quasi, molestias quae
          pariatur, soluta a culpa quis incidunt quos delectus ipsum corporis
          deleniti.
        </p>
       <PlantButton name="Add to Cart" />
      </div>
      <img
        src="images/plant-hero-img-.png"
        className=" "
        alt="plant-hero-img"
      />
    </section>
  );
};

export default Hero;
