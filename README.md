1. Copy the template below and replace it with your own credentials.  
2. Paste it into a file named `app.properties` inside:

```
RoadApp/src/main/resources/
```

### 🔧 Spring Configuration Template

```properties
spring.application.name=RoadApp
spring.datasource.url=jdbc:mysql://<database_url>/<database_name>?useUnicode=true&characterEncoding=UTF-8&connectionCollation=utf8mb4_unicode_ci
spring.datasource.username=<your_username>
spring.datasource.password=<your_password>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

> 📌 **JDK Required:** Version 21

---

## 🌐 Frontend - RoadWeb (React + Vite)

### ✏️ Environment Versions

| Tool      | Version              | Check Command           |
|-----------|----------------------|------------------------|
| Vite      | 6.3.5 (latest stable)| `npm info vite version` |
| npm       | 11.4.5 or higher     | `npm -v`               |
| Node.js   | 22.13.1 or higher (recommended) | `node -v`       |

---

### 📥 Install Dependencies

Navigate to the frontend folder and run:

```bash
cd RoadWeb(Client)/my-first-react-app
npm install
```

---

### 🚀 Run the Frontend App

Start the React development server:

```bash
npm run dev
```

Then copy the local URL (shown in colored text) and open it in Chrome.

---

✅ **That’s it! Your full-stack app is ready.**

---