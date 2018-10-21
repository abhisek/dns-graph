# DNS Graph
Collection of tools for visualising and correlating DNS data as a graph for security use-cases using FDNS data set.

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
NEO4J_URL=bolt://neo4j:password@olocalhost \
NEO4J_USERNAME=neo4j \
NEO4J_PASSWORD=SomePassword \
npm run import
```

The FDNS data set is available from [Rapid7 Forward DNS](https://opendata.rapid7.com/sonar.fdns_v2/) site.

## Graph Query

Neo4J Cypher queries can be used to query data.

For sample, check [query docs](docs/queries.md)

## Contribution

See [contribution](docs/contribution.md) page for areas that require contribution.

Ideas, bug reports and pull requests are welcome.