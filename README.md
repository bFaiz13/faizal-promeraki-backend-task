
# 🚀 Backend Coding Task – Assembly Parts

A simple inventory management backend for a manufacturing plant to track **Raw** and **Assembled** parts.  
Built with **Node.js**, **TypeScript**, and **MongoDB**.

---

## 📚 Tech Stack

- **Language:** TypeScript
- **Framework:** Node.js (Express)
- **Database:** MongoDB

---

## 📦 Core Requirements

The system supports two types of parts:

✅ **Raw Parts**  
- Purchased from external suppliers.  
- Example: *Bolts*

✅ **Assembled Parts**  
- Built by combining raw and/or other assembled parts.  
- Example: *Gearbox* made using Bolts (raw) and Gears (assembled)

### Part Properties:
- A unique identifier (`string`)
- Name
- Type: `RAW` or `ASSEMBLED`
- Quantity in stock
- For assembled parts:  
  A list of constituent parts with required quantity.

---

## 🛠️ Installation & Setup

### 1️⃣ Install dependencies:
```bash
npm install
```

### 2️⃣ Create `.env` file:
Add the following environment variables:
```env
DB_URL=<your-mongoDB-connection-URI>
DB_NAME=inventory
```

### 3️⃣ Run the project:

#### For production:
```bash
npm run start
```

#### For development:
```bash
npm run dev
```

---

## 📡 API Endpoints

### 🔷 1. Create a Part

📤 **Endpoint:**  
`POST /api/part`

#### Request – Raw Part:
```json
{
  "name": "Bolt",
  "type": "RAW"
}
```

#### Response:
```json
{
  "id": "<partId>",
  "name": "Bolt",
  "type": "RAW"
}
```

#### Request – Assembled Part:
```json
{
  "name": "Gearbox",
  "type": "ASSEMBLED",
  "parts": [
    { "id": "<partId-1>", "quantity": 4 },
    { "id": "<partId-2>", "quantity": 2 }
  ]
}
```

#### Response:
```json
{
  "_id": "<partId>",
  "name": "Gearbox",
  "type": "ASSEMBLED",
  "parts": [
    { "id": "<partId-1>", "quantity": 4 },
    { "id": "<partId-2>", "quantity": 2 }
  ]
}
```

---

### 🔷 2. Add Quantity to Raw Part

📤 **Endpoint:**  
`PATCH /api/part/quantity/:partId`

#### Request:
```json
{
  "quantity": 1000
}
```

#### Response:
```json
{
  "status": "SUCCESS"
}
```

---

### 🔷 3. Use Parts from Inventory

📤 **Endpoint:**  
`POST /api/part/:partId`

#### Request:
```json
{
  "quantity": 4
}
```

#### Response (Success):
```json
{
  "status": "SUCCESS"
}
```

#### Response (Failure – Insufficient quantity):
```json
{
  "status": "FAILED",
  "message": "Insufficient quantity - <partId-2>"
}
```

#### Response (Failure – Multiple insufficient):
```json
{
  "status": "FAILED",
  "message": "Insufficient quantity - <partId-1>, <partId-2>"
}
```

---

## 🧑‍💻 Author
✨ Developed as a backend coding task – demonstrating clean architecture, validation, and inventory logic with MongoDB.
