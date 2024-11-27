const Hero = () => {
  return (
    <div
    className="px-10 py-12 flex flex-col  justify-between space-y-28"
      style={{
        backgroundImage: "url('/images/bg-rain.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" ">
        <span className="rounded-lg text-white text-[40px] p-2">
          RainGuard AI
        </span>
      </div>

      <div className=" space-y-12 w-1/2 text-white h-2/3">
        <h1 className="font-black text-5xl">
          Rainfall-Based Disaster Prediction
        </h1>
        <p className="font-normal text-[20px]">
          Get insights into potential rainfall-based disasters to stay prepared
        </p>
      </div>
    </div>
  );
};

export default Hero;
