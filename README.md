# DNS Graph
Collection of tools for visualising and correlating DNS data as a graph for security use-cases using FDNS data set.

## Why and What

Read the [rationale](docs/rationale.md) for problem area and reason to exist for this project.

## How To

1. Setup [Neo4j](https://neo4j.com/) Graph Database
2. Import FDNS data set into Neo4j using import script
3. Execute queries on Neo4j (Refer to [query docs](docs/queries.md))
4. Visualize various security use-cases as *Graph* (TODO)

Neo4j can be run as a docker container easily

```
docker run -d -p 7474:7474 -p 7687:7687 -v `pwd`/data:/data neo4j:3.4
```

## Requirements

* NodeJS 8+

## DNS Data Import

This script will import FDNS data set to Neo4j Graph Database.

Install dependencies

```
npm install
```

Switch to `app` directory

```
cd app
```

Start the import script

```
FDNS_DATASET_FILE=YYYY-MM-dd-fdns_a.json.gz \
NEO4J_URL=bolt://192.168.1.100 \
NEO4J_USERNAME=neo4j \
NEO4J_PASSWORD=SomePassword \
npm run import
```

The FDNS data set is available from [Rapid7 Forward DNS](https://opendata.rapid7.com/sonar.fdns_v2/) site.

See [Database Indexing](docs/database-indexing.md) if importing seem very slow after a while.

See [Importing Alex Top 500](docs/alexa-top-500.md) if you want to import all records for Alexa Top-500

## Graph Query

Neo4j Cypher queries can be used to query data.

For sample, check [query docs](docs/queries.md)

## Contribution

See [contribution](docs/contribution.md) page for areas that require contribution.

Ideas, bug reports and pull requests are welcome.
