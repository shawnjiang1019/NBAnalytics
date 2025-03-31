"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Dashboard from "@/components/ui/dashboard"

const search = ()=> {
    const [playerID, setPlayerID] = useState<string>("");
    const [submittedId, setSubmittedId] = useState<string | null>(null);

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        if (playerID.trim()){
            setSubmittedId(playerID);
        }
    };



    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                type="text"
                placeholder="Enter Player ID"
                value={playerID}
                onChange={(e) => setPlayerID(e.target.value)}
                className="w-full"
                />
                <Button type="submit" className="bg-blue-500">
                Search
                </Button>
            </form>

            {/* Show Dashboard only when a valid ID is submitted */}
            {submittedId && <Dashboard player_id={submittedId} />}
        </div>

    );
}

export default search;