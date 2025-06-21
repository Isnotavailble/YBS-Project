# 🛠️ Requirements and Setup Guide

## 📦 Backend - RoadApp (Spring Boot)

1. Copy the template below and replace it with your own credentials.
2. Paste the configuration into a file named `app.properties` located at:

RoadApp/src/main/resources/app.properties

### 🔧 Spring Boot Configuration (Example)
```properties
spring.application.name=RoadApp
spring.datasource.url=jdbc:mysql://<database_url>/<database_name>?useUnicode=true&characterEncoding=UTF-8&connectionCollation=utf8mb4_unicode_ci
spring.datasource.username=<your_username>
spring.datasource.password=<your_password>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

📌 JDK Required: Version 21



---

###🌐 Frontend - RoadWeb (React + Vite)

🧪 Environment Versions

Vite: 6.3.5 (latest stable)

To check the version, open terminal in:

RoadWeb(Client)/my-first-react-app

and run:

npm info vite version


npm: 11.4.5 or higher

To check:

npm -v


Node.js: 22.13.1 or higher (recommended)

npm is usually auto-updated with Node

To check:

node -v




---

📥 Install Dependencies

After checking all versions, install the frontend dependencies:

cd RoadWeb(Client)/my-first-react-app
npm install


---

🚀 Running the Client

Once everything is set up, start the React development server:

npm run dev

You’ll see a URL appear in your terminal in colored text.
Just copy and paste that into your Chrome browser to view the app.


---

✅ That’s it! Your client and server are now ready to run.

---

Let me know if you'd like this turned into a downloadable `README.md` file or if you'd like a second section for production deployment steps or environment variables.

