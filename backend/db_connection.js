import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

pool.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
}
);

export async function getVinyls(){
  const [rows] = await pool.query(`SELECT * FROM vinyls`);
  return rows;
}

export async function getVinyl(id){
  const [rows] = await pool.query(
    `SELECT * FROM vinyls WHERE vinyl_id = ?`, [id]
  )
  return rows[0];
}

export async function createVinyl(name){
  const result = await pool.query(
    `INSERT INTO vinyls (name) VALUES (?)`, [name]
  );
  const id = result.insertId;
  return getVinyl(id);
}

//const vinyl = await getVinyl(2);
//console.log(vinyl);

// const result = await createVinyl('The Symposium');
// console.log(result);

// const vinyls = await getVinyls();
// console.log(vinyls);