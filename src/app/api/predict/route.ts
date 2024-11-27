import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const data = await request.json();

  try {
    const response = await fetch(
      "http://ec2-35-159-124-214.eu-central-1.compute.amazonaws.com:7171/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse((error as Error).message);
  }
};
