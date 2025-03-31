"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
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


const fetchPlayerData = async (player_id: string): Promise<PlayerData | null> => {
    try {
        const response = await fetch(`http://127.0.0.1:8080/players/${player_id}`);
        
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);

        const playerData: PlayerData = await response.json();
        console.log("Fetched Player Data:", playerData); // Log after parsing
        return playerData;
    } catch (err) {
        console.error("Error fetching player data:", (err as Error).message);
        return null;
    }
};


const Dashboard: React.FC<DashboardProps> = ({player_id}) => {
  const [data, setData] = useState<PlayerData | null>(null);
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

      const transformedData = playerData.matchup.map((matchup, index) => ({
        game: matchup,
        Points: playerData.recentPoints[index] || 0,
        Rebounds: playerData.recentRebounds[index] || 0,
        Assists: playerData.recentAssists[index] || 0,
        Blocks: playerData.recentBlocks[index] || 0,
        Turnovers: playerData.recentTurnovers[index] || 0,
      }));

      setChartData(transformedData);
    };

    loadData();
  }, [player_id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart width={600} height={300} data={data.recentPoints}>
        <XAxis dataKey="game" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Points" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="Rebounds" fill="var(--color-mobile)" radius={4} />
        <Bar dataKey="Assists" fill="#34D399" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default Dashboard;
