"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import { predict } from "./utils/predict";

interface Results {
  Confidence: number;
  Prediction: string;
  Country: string;
  Month: string;
  Year: number
}

export default function Home() {
  const [formData, setFormData] = useState({
    Country: "",
    Month: "",
    Year: "",
  });
  const [results, setResults] = useState<Results| null>(null);

  const resultsData = (results:Results) =>{
    switch(results.Prediction.toLocaleLowerCase()){
      case 'drought':
        return `There is a ${Math.floor(results.Confidence * 100)}% likelihood of a drought in ${results.Country} during ${results.Month}, ${results.Year}. Please consider taking necessary precautions.`
      case 'flood':
        return `There is a ${Math.floor(results.Confidence * 100)}% likelihood of a flood in ${results.Country} during ${results.Month}, ${results.Year}. Please consider taking necessary precautions.`
      default:
        return `The rainfall patterns indicate normal conditions in ${results.Country} for ${results.Month}, ${results.Year}. No significant disaster is predicted with a ${Math.floor(results.Confidence * 100)}% chance.`
    }
    

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await predict(formData)
      setResults(response)
      console.log({ response });
    } catch (error) {
      console.error((error as Error).message);
    }
    // console.log("Form Data Submitted:", formData);
    // // Perform your API call or form submission logic here
    // alert("Data Submitted: " + JSON.stringify(formData));
  };
  return (
    <div>
      <Hero />
      <div className="py-16">
        <h1 className="text-[40px] font-normal text-center">
          Enter Details for Prediction
        </h1>
        <div className="border border-[#929292] rounded-lg w-3/4 mx-auto mt-10">
          <form onSubmit={handleSubmit} className="p-10 space-y-10">
            <div className="flex gap-4 justify-between mb-6 ">
              <input
                type="text"
                placeholder="Country"
                name="Country"
                value={formData.Country}
                onChange={handleChange}
                required
                className="px-4 py-2 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Month"
                name="Month"
                value={formData.Month}
                onChange={handleChange}
                required
                className="px-4 py-2 w-1/5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Year"
                name="Year"
                value={formData.Year}
                onChange={handleChange}
                required
                className="px-4 py-2 w-1/5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#4CAF50] text-white font-normal py-3 px-12 w-1/3 rounded-lg text-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Predict
              </button>
            </div>
            {results && (
              <div className="text-center">
                <h1 className="text-[40px] font-normal">Results</h1>
                <p className="text-[20px]">{resultsData(results)}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
