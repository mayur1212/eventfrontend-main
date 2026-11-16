# Event backend: शिकण्याचा क्रम

तुमचा frontend React मध्ये आहे. Backend तुम्ही स्वतंत्र local Node.js project मध्ये तयार करणार आहात. या बदलात backend तयार केलेला नाही; frontend API शी जोडण्यासाठी तयार केला आहे.

## 1. सध्याचा flow समजून घ्या

Register → backend मध्ये user आणि event request save → Login → backend password तपासतो → token आणि user परत देतो → admin ला dashboard, user ला homepage.

Browser refresh → GET /api/me → backend token verify करतो → user पुन्हा context मध्ये येतो.
Dashboard → GET /api/events → records वरून counts आणि upcoming list.
Events → create / read / update / delete → database मध्ये बदल.
Logout → browser मधून token आणि user काढला जातो.

लक्षात ठेवा: सध्याचा Register form हा account + event request असा एकत्र आहे. त्यामुळे /register ने दोन्ही records तयार करायचे. नंतर स्वतंत्र account signup आणि logged-in event booking form वेगळे करता येतील. Existing email साठी आत्ता 409 परत द्या; पुन्हा request करण्याची सोय पुढच्या टप्प्यात करा.

## 2. आज: पहिला server चालवा

नवीन terminal मध्ये frontend folder च्या शेजारी स्वतः backend folder तयार करा:

```sh
mkdir eventbackend
cd eventbackend
npm init -y
npm install express cors dotenv
```

`server.js` तयार करा:

```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});

const port = process.env.PORT || 5000;
app.listen(port, "127.0.0.1", () => console.log(`API listening on ${port}`));
```

Backend `.env`:

```env
PORT=5000
```

Backend `.gitignore` मध्ये `node_modules/` आणि `.env` ठेवा.

```sh
node server.js
curl http://localhost:5000/api/health
```

`Backend is running` दिसले की पहिला टप्पा पूर्ण. `req` म्हणजे आलेली request; `res` म्हणजे परत पाठवलेले response. `express.json()` JSON body वाचतो. CORS browser मधल्या frontend origin ला API access देतो; तो authentication चा पर्याय नाही.

Frontend terminal मध्ये:

```sh
cp .env.example .env.local
npm start
```

`.env.local` आधी असेल तर overwrite न करता त्यात `REACT_APP_API_BASE_URL=http://localhost:5000/api` सेट करा. Environment variable बदलल्यावर frontend restart करा. Health endpoint एकटाच केल्यावर login/events अजून चालणार नाहीत; खालील routes हळूहळू तयार करा.

## 3. Database आणि models

पुढचा टप्पा: local MongoDB + Mongoose वापरून दोन collections बनवा. सुरुवातीला project लहान ठेवा.

- User: clientName, email (unique, lowercase), contactNumber, passwordHash, role (`user` / `admin`), profileImg, timestamps.
- Event: eventName, clientName, contactNumber, email, venue, city, startDate, endDate, createdBy, timestamps.

इथे frontend `_id` वापरतो. दुसरा database वापरलात तरी API response मध्ये `_id` द्या.
User आणि Event वेगळे ठेवल्याने एका user चे अनेक events ठेवता येतात. Event मध्ये password ठेवू नका.

## 4. Registration आणि login

आता `mongoose`, `bcryptjs`, `jsonwebtoken` packages जोडा. Backend `.env` मध्ये database URL आणि random `JWT_SECRET` ठेवा. Secret frontend च्या `REACT_APP_` variable मध्ये ठेवू नका.

POST /api/register:

1. Body मधले fields validate करा; email normalize करा, 10 digit contact, password किमान 6 characters आणि endDate >= startDate तपासा.
2. Duplicate email असल्यास 409 द्या.
3. Password bcrypt ने hash करा. Plain password save किंवा response मध्ये पाठवू नका.
4. User चा role नेहमी server वर `user` ठेवा. Body मधला role स्वीकारू नका.
5. User आणि त्याची Event request save करा. दोन्ही writes अर्धवट राहू नयेत; transactions वापरणार असल्यास MongoDB replica set लागतो. तो टप्पा शिकेपर्यंत partial failure cleanup करा.
6. 201 response द्या: `{ "message": "Registration successful" }`.

POST /api/login:

1. Email ने user शोधा.
2. bcrypt.compare वापरून password तपासा.
3. चुकीचा login: 401 आणि `{ "message": "Invalid email or password" }`.
4. बरोबर login: expiry असलेला signed token आणि safe user द्या.

```json
{
  "token": "signed-token",
  "user": {
    "_id": "user-id",
    "clientName": "Mayur",
    "email": "mayur@example.com",
    "contactNumber": "9876543210",
    "role": "admin",
    "profileImg": ""
  }
}
```

हे response shape चे उदाहरण आहे. Public signup ने `admin` तयार करू नका. Dashboard शिकण्यासाठी स्वतःचा account register करा आणि trusted database tool किंवा private seed script मधून त्या account ला admin करा. Frontend मध्ये admin email list आता नाही.

## 5. Authentication middleware

प्रत्येक protected request मध्ये frontend `Authorization: Bearer <token>` पाठवतो.

Middleware: header वाचा → signature आणि expiry verify करा → token मधल्या user id ने database मधून user शोधा → `req.user` ठेवा → पुढचा handler.

Token missing/expired/invalid असेल तर 401. Admin route वर current database user चा role admin नसेल तर 403. Browser route guard फक्त navigation नियंत्रित करतो; server वर प्रत्येक protected endpoint तपासणे आवश्यक आहे.

GET /api/me ने `{ "user": { ...safeUser } }` द्यावे. Refresh flow यावर अवलंबून आहे.

या frontend मध्ये token localStorage मध्ये आहे. Learning flow नंतर deployment आधी HttpOnly cookie based session, CSRF protection, login rate limiting शिकून लागू करा.

## 6. Frontend ला लागणारा API contract

सगळ्या URLs च्या आधी `http://localhost:5000/api` आहे.

| Method | Path | Access | Response |
| --- | --- | --- | --- |
| POST | /register | Public | 201 + message; user आणि event save |
| POST | /login | Public | token आणि user |
| GET | /me | Logged in | `{ "user": {...} }` |
| GET | /events | Admin | Event objects चा plain array `[]` |
| POST | /events | Admin | 201 + created event |
| GET | /events/:id | Admin | Single event object |
| PUT | /events/:id | Admin | Updated event object |
| DELETE | /events/:id | Admin | 204 किंवा success message |
| POST | /update-profile | Logged in | `{ "success": true, "user": {...} }` |
| DELETE | /remove-profile-image | Logged in | Success response |

Event input/response उदाहरण:

```json
{
  "_id": "event-id",
  "eventName": "Robotics Workshop",
  "clientName": "Mayur",
  "contactNumber": "9876543210",
  "email": "mayur@example.com",
  "venue": "Community Hall",
  "city": "Pune",
  "startDate": "2026-12-01",
  "endDate": "2026-12-02"
}
```

Create request मध्ये `_id` पाठवायचा नाही; database तयार करेल. Date strings `YYYY-MM-DD` ठेवा. Upcoming = start आजनंतर; Ongoing = start ते end मध्ये आजचा दिवस; Completed = end आजच्या आधी. हे event च्या तारखांवरून frontend काढतो, approval status नाही.

Profile update चा existing form `multipart/form-data` पाठवतो: clientName, email, contactNumber आणि optional profileImg file. हा route करताना multer सारखा multipart parser, image type/size validation, स्वतःच्या user ला update करणारा handler आणि unique email check जोडा. Role/password body मधून update होऊ देऊ नका. Image URL absolute किंवा `/uploads/name.jpg` द्या; upload directory API host वर serve करा.

प्रत्येक error साठी योग्य HTTP status आणि `{ "message": "समजण्यास सोपा error" }` द्या. Invalid id/body = 400, unknown record = 404. Updates साठी allowed fields निवडा; पूर्ण req.body सरळ database ला देऊ नका.

## 7. छोट्या टप्प्यांत verify करा

1. Health curl ने चालतो.
2. Register → database मध्ये hashed password असलेला user + event; duplicate email reject.
3. Wrong password reject; correct password ने token मिळतो.
4. GET /me token सह चालतो; token शिवाय 401.
5. Normal user ला /events वर 403; admin ला array.
6. Admin login → dashboard; refresh नंतर session कायम.
7. Add event → list आणि dashboard refresh मध्ये आकडे बदलतात.
8. Edit → reload नंतर नवीन values कायम; delete → database मधूनही record जातो.
9. Search आणि pagination; no records असताना zero counts.
10. Backend बंद → connection error आणि retry; token विनाकारण काढला जात नाही.

## 8. नंतर काय add करायचे?

पहिले auth + Event CRUD पूर्ण करा. मग या क्रमाने features जोडा:

1. Existing user साठी स्वतंत्र event request form आणि My events page, server वर ownership checks.
2. Admin approval: pending / approved / rejected, reason आणि filter.
3. Coordinator assignment; coordinator model आणि real assignment endpoint झाल्यावरच UI.
4. Server pagination आणि search, records वाढल्यावर.
5. Forgot/reset password: expiring single use reset token आणि email delivery. Frontend मध्ये pages आहेत; POST /forgot-password आणि POST /reset-password/:token backend अजून करायचे आहेत.
6. Payments: gateway verification आणि webhook नंतरच paid status; आत्ताचा payment page backend payment पूर्ण झाल्याचा पुरावा नाही.

सुरुवातीला sales/traffic सारखे बनावट dashboard metrics टाळले आहेत. आत्ता dashboard event data चेच totals दाखवतो.

Official references: [Express installation](https://expressjs.com/en/starter/installing/), [Node environment variables](https://nodejs.org/api/environment_variables.html).
