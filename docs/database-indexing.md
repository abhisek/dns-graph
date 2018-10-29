# Database Indexing

Create index on Neo4j to speed up queries.

```
CREATE INDEX ON :Tld(name)
CREATE INDEX ON :Domain(name)
CREATE INDEX ON :IPv4(name)
CREATE INDEX ON :IPv6(name)
CREATE INDEX ON :TXT(name)
```
