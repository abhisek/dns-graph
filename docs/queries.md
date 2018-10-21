# Queries on DNS Graph
Neo4J queries on DNS Graph created by `import` script.

## Enumerate Sub Domains

```
MATCH (p:Domain { name: 'tumblr.com' })-[HAS_SUBDOMAIN]-(t:Host)
RETURN t LIMIT 25
```