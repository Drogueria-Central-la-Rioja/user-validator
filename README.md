# user-validator

# Create database instance (Docker way)

**Note**: We should move this section to a new project in the future.


The first time if there is not a database create you should create one. 

```bash
$ sudo mkdir -p /storage/docker/drogueria
$ docker run --name drogueria_central_db --env="MYSQL_ROOT_PASSWORD=i-hate-window$" -p 3306:3306 -v /storage/docker/drogueria/:/var/lib/mysql -d mysql:5.7.38-debian
```

Then enter to the container and do whatever you want, for instance create the user.

```bash
docker exec -it drogueria_central_db  bash
root@1a223d76ab5f:/# mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.38 MySQL Community Server (GPL)

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> CREATE USER 'dev_user'@'%' IDENTIFIED WITH mysql_native_password BY 'i-hate-window$';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'dev_user'@'%';
```