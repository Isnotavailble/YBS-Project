# Requirements and set up
# For RoadApp(Back-end)
copy this template and replace your credentials
paste to the file call app.properties in RoadApp/src/main/resources/

spring.application.name=RoadApp
spring.datasource.url=jdbc:mysql://database_url/database_name?useUnicode=true&characterEncoding=UTF-8&connectionCollation=utf8mb4_unicode_ci
spring.datasource.username = username
spring.datasource.password = password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
### JDK Version 21

# For RoadWeb(Client)
### vite version 6.3.5(latest stable)
to check this go to the RoadWed(Client)/my-first-react-app and
run this in terminal 
### -> npm info vite version

### npm version 11.4.5 or higher
to check it,run this in terminal
### -> npm -version
-----------------------------------
## Recommended globally on your PC
--> node version 22.13.1 or higher 
(if you have this version of node the npm is mostly auto updated)
-to check it,run this in terminal 
### -> node -v
----------------------------------
## after checking, run this in RoadWed(Client)/my-first-react-app
### -> npm install
----------------------------------
## Running
after setting up everything.
run this in RoadWed(Client)/my-first-react-app 
## -> npm run dev 
this will give you url in colored text.
just copy and paste in chrome
that's all for client
