python -u ".\init_config_server.py"
python -u ".\init_shard_servers.py"
python -u ".\init_router_server.py"
mongoimport -h localhost:113 -d clubesDB -c users users_population.json
mongoimport -h localhost:113 -d clubesDB -c clubes clubes_population.json