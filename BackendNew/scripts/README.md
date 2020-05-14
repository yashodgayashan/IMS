## Database and table setup scripts.

### Prerequisites

Make sure the files are having appropriate permissions or else change them as follows.

```
sudo chmod 777 <filename>
```

### Create Database

To create the database please run the following script with the database Name

```
./create-db.sh <database-name>
```

_Example_ - `./create-db.sh IMS`

### Execute any query

To execute any query in a sql file please run the following script

```
./run-db-scripts.sh <database> <sql-file>
```

### Add tables to the database

```
/run-db-scripts.sh <database> create-tables.sql
```

_Example_ - `/run-db-scripts.sh IMS create-tables.sql`

### Add dumy data to the database

```
/run-db-scripts.sh <database> dumy-data.sql
```

_Example_ - `/run-db-scripts.sh IMS dumy-data.sql`
