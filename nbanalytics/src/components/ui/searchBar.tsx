"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Dashboard from "@/components/ui/dashboard";
import axios from "axios";
import { timeStamp } from "console";




interface PlayerInfo{
  id: string;
  name: string;
}


const CACHE_TTL = 3600000;
const SearchBar = () => {
  const [playerID, setPlayerID] = useState<string>("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); //Initially the search term is empty string (what is currently in the searchbar)
  const [suggestions, setSuggestions] = useState<PlayerInfo[]>([]); // holds ONLY the players we will reccomend
  const [allPlayers, setAllPlayers] = useState<PlayerInfo[]>([]); //holds all the players in general
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null); //the final string passed to be used for search

  //get or set cached data
  useEffect(() => {
    const loadPlayers = async () =>{
      const cachedPlayers = localStorage.getItem("cachedPlayers");
      const currentTime = Date.now();

      //Use valid cache if no valid cache call endpoint
      if (cachedPlayers){
        const { data, timestamp } = JSON.parse(cachedPlayers);
        if (currentTime - timestamp < CACHE_TTL){
          setAllPlayers(data);
          return;
        }
      } else {
        try {
          const response = await axios.get<any[]>("http://127.0.0.1:8080/players/cache/autocomplete");
          const playerData = response.data;
          localStorage.setItem("cachedPlayers", JSON.stringify({
            data: playerData,
            timestamp: currentTime
          }));
          setAllPlayers(playerData);
        } catch (error){
          console.error('Failed to load players:', error)
        }
      }
    };

    loadPlayers();
  }, []);

  //Filter the suggestions
  useEffect(() => {
    if (!searchTerm.trim() || searchTerm == ""){
      setSuggestions([]);
      return;
    }

    const filtered = allPlayers.filter(
      (player: PlayerInfo) => player.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10);

    setSuggestions(filtered);
  }, [searchTerm, allPlayers]);



  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedPlayerId){
      setSubmittedId(selectedPlayerId);
    }
    else if (playerID.trim()) {
      setSubmittedId(playerID.trim())
    }
  };

  const handleSuggestionClick = (playerId: string) => {
    // Find the selected player to set the search term
    const selectedPlayer = allPlayers.find(p => p.id === playerId);
    if (selectedPlayer) {
      setSearchTerm(selectedPlayer.name);
      setSelectedPlayerId(playerId);
    }
    setSuggestions([]);
  };



  return (
    <div className="p-4 max-w-md mx-auto space-y-4 relative">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search player name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded shadow-lg z-10 mt-1">
              {suggestions.map((player) => (
                <div
                  key={player.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(player.id)}
                >
                  {player.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <Button type="submit" className="bg-blue-500">
          Search
        </Button>
      </form>

      {submittedId && <Dashboard player_id={submittedId} />}
    </div>
  );
};

export default SearchBar;
