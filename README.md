# DNS Graph
Collection of tools for visualising and correlating DNS data as a graph for security use-cases using FDNS data set.

## DNS Data Import

This script will import FDNS data set to Neo4j Graph Database.

Switch to the FDNS data set import script directory

```
cd builder/fdns
```

Install dependencies

```
npm install
```

Start the import script

```
FDNS_DATASET_FILE=YYYY-MM-dd-fdns_a.json.gz \
NEO4J_URL=bolt://neo4j:password@olocalhost \
npm start
```

The FDNS data set is available from [Rapid7 Forward DNS](https://opendata.rapid7.com/sonar.fdns_v2/) site.