# Queries on DNS Graph
Neo4J queries on DNS Graph created by `import` script.

## Enumerate Sub Domains

```
MATCH (p:Domain { name: 'tumblr.com' })-[HAS_SUBDOMAIN]-(t:Host)
RETURN t LIMIT 25
```

## Correlate two Domains

```
MATCH (p:Domain { name: 'tumblr.com' })-[r*..5]-(t:Host { name: '0-203.tumblr.com' })
RETURN p,r,t LIMIT 25
```

## Find Nameservers shared by Domains

```
MATCH (p:Domain)-[r:NS_RECORD]-(t:Host)
WITH t, COUNT(r) as edgeCount
WHERE edgeCount > 1
RETURN t
```

## Find IP(s) Hosting Multiple Names

```
MATCH (p:Host)-[r:RESOLVES_TO]-(t:IPv4)
WITH t, COUNT(r) as edgeCount
WHERE edgeCount > 100
RETURN t LIMIT 25
```

This query will list IPv4 addresses with more than 100 hostnames resolving to it.