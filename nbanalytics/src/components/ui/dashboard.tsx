"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";

interface PlayerData {
  playerName: string;
  matchup: string[];
  recentPoints: number[];
  recentRebounds: number[];
  recentAssists: number[];
  recentBlocks: number[];
  recentTurnovers: number[];
}

interface dataPoint {
  matchup: string;
  points: number;
  rebounds: number;
  assists: number;
  blocks: number;
  turnovers: number;
}

interface DashboardProps {
  player_id: string;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;


const fetchPlayerData = async (player_id: string): Promise<dataPoint[] | null> => {
    try {
        const response = await fetch(`http://127.0.0.1:8080/players/${player_id}`);
        
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);

        const playerData: dataPoint[] = await response.json();
        console.log("Fetched Player Data:", playerData); // Log after parsing
        return playerData;
    } catch (err) {
        console.error("Error fetching player data:", (err as Error).message);
        return null;
    }
};


const Dashboard: React.FC<DashboardProps> = ({player_id}) => {
  const [data, setData] = useState<dataPoint[] | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //Defined the function which calls fetch data and transforms it into proper format for the chart component
    const loadData = async () => {
      const playerData = await fetchPlayerData(player_id);
      console.log(playerData);
      if (playerData == null){
        setError("Could not get the player data");
        return;
      }
      //set the data 
      setData(playerData);

      const transformedData = playerData;

      setChartData(transformedData);
    };

    loadData();
  }, [player_id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    // <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
    //   <BarChart width={100} height={100} data={chartData}>
    //     <XAxis dataKey="game" />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend />
    //     <Bar dataKey="Points" fill="var(--color-desktop)" radius={4} />
    //     <Bar dataKey="Rebounds" fill="var(--color-mobile)" radius={4} />
    //     <Bar dataKey="Assists" fill="#34D399" radius={4} />
    //   </BarChart>
    // </ChartContainer>
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <LineChart width={800} height={400}  data={chartData}>
        <XAxis dataKey={"game"}/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Line type="monotone" dataKey="points" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="rebounds" stroke="#82ca9d" />
      </LineChart>

    </ChartContainer>
    
  );
};

export default Dashboard;
