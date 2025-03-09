# softnix-backend

clone project 

node v23.5.0

npm v11.1.0

.env มี port mongo_url json_web_token

ใช้ npm install

run ด้วย nodemon ใช้ คำสั่ง npm run dev

run ด้วย node ใช้ คำสั่ง npm run start

api Swagger สามารถเข้าผ่าน http://localhost:3001/api-docs/

api data
GET: http://localhost:3001/api/data คือการดึงข้อมูลมาแสดงททั้งหมด แสดงที่ละ10 เพราะทำเป็น apagination สามารถปรับแต่ง limit และ page ได้โดยการใส่ http://localhost:3001/api/data?page=1&limit=21 ตามนี้
POST: http://localhost:3001/api/data คือการเพิ่มข้อมูลลง db
PUT: http://localhost:3001/api/data     คือการ update ข้อมูล ใน swagger ต้องใส่ id ของข้อมูล ผ่าน parameter
DELETE: http://localhost:3001/api/data คือการลบข้อมูล ใน swagger ต้องใส่ id ของข้อมูล ผ่าน parameter

api login
POST: http://localhost:3001/api/login คือการยืนยันตัวตน

api register
POST: http://localhost:3001/api/register สมัครสมาชิก มีการเช็คusername หาก username ซ้ำไม่สามารถเพิ่มได้

api profile
GET: http://localhost:3001/api/profile ข้อมูล profile ใน swagger ต้องใส่ token ทีสร้างจากการ login จริง และ token มีอายุแค่ 1 วัน

api mydata
GET: http://localhost:3001/api/mydata คือขอมูลที่เราเพิ่ม ใน swagger ต้องใส่ token ทีสร้างจากการ login จริง และ token มีอายุแค่ 1 วัน

