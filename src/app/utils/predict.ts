interface Data {
  Country: string;
  Month: string;
  Year: string;
}
export const predict = async (data: Data) => {
  try {
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return (error as Error).message;
  }
};
