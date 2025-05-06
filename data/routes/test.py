from nba_api.stats.static import players

all_players = players.get_active_players()
thing = [{"id": str(p["id"]), "name": p["full_name"]} for p in all_players]
print(thing)