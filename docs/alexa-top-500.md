# Importing Alexa Top 500 (or whatever you like)

```
wget http://s3.amazonaws.com/alexa-static/top-1m.csv.zip
unzip top-1m.csv.zip
mkdir extracted
for x in `cat top-1m.csv | head -n 500 | cut -d',' -f2`; do \
   echo "Working on $x";   \
   zcat 2018-09-28-XXXXX-fdns_any.json.gz | grep $x > ./extracted/$x;   \
done;
```
