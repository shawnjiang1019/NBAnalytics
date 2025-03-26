"use client";  

import { useEffect, useState } from "react";

interface UserData {
  name: string;
  age: number;
}

const Page = () => {
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/");
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const jsonData: UserData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Data</h1>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
    </div>
  );
};

export default Page;