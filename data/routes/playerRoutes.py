from fastapi import APIRouter, HTTPException
from players import model
from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import playergamelogs
from nba_api.stats.static import players
import pandas as pd

router = APIRouter(prefix="/players", tags=["players"])
@router.get("/{player_id}")
async def queryPlayer(player_id: str):
    #implement logic to fetch stats from player then set the "stats" param in player to that dict
    #player_id = get_player_id(name)
    #print(player_id)

    logs = playergamelogs.PlayerGameLogs(
        season_nullable="2023-24",
        player_id_nullable=player_id
    )
    logs_df = logs.get_data_frames()[0]
    stats = logs_df[[
        "GAME_DATE", "MATCHUP", "PTS", "REB", "AST", "STL", "BLK", "TOV", "FG_PCT", "FT_PCT", "PLUS_MINUS"
    ]].to_dict(orient="records")
    pts_list = [game["PTS"] for game in stats]
    matchup_list = [game["MATCHUP"][-3:] for game in stats]
    reb_list = [game["REB"] for game in stats]
    ast_list = [game["AST"] for game in stats]
    blk_list = [game["BLK"] for game in stats]
    tov_list = [game["TOV"] for game in stats]
    finalData = []
    for i in range(len(matchup_list)):
        dataPoint = {}
        dataPoint["points"] = pts_list[i]
        dataPoint["matchup"] = matchup_list[i]
        dataPoint["rebounds"] = reb_list[i]
        dataPoint["assists"] = ast_list[i]
        dataPoint["blocks"] = blk_list[i]
        dataPoint["turnovers"] = tov_list[i]
        finalData.append(dataPoint)

    return finalData




def get_player_id(name: str):
    """Fetch the NBA Player ID from their full name."""
    nba_players = players.get_players()
    result = next((p for p in nba_players if p["full_name"].lower() == name.lower()), None)
    
    if result:
        return result["id"]
    
    raise HTTPException(status_code=404, detail=f"Player '{name}' not found")





