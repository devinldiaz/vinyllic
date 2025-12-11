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
  const [rows] = await pool.query(
    `SELECT v.vinyl_id, v.name, v.photo_file_path, JSON_EXTRACT(v.genres, '$') AS genres, a.name AS artist_name
    FROM vinyls v
    LEFT JOIN artists a ON v.artist_id = a.artist_id`
  );

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

export async function getArtist(id){
  const [rows] = await pool.query(
    `SELECT * FROM artists WHERE artist_id = ?`, [id]
  )
  return rows[0];
}

export async function createArtist(name){
  const result = await pool.query(
    `INSERT INTO artists (name) VALUES (?)`, [name]
  );
  const id = result.insertId;
  return getArtist(id);
}

export async function updateVinyl(id, data) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue; 

    if (key === "genres") {
      fields.push(`${key} = ?`);
      values.push(JSON.stringify(value));
    } else {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (fields.length === 0) return getVinyl(id);

  const sql = `
    UPDATE vinyls
    SET ${fields.join(", ")}
    WHERE vinyl_id = ?
  `;

  values.push(id);

  await pool.query(sql, values);

  return getVinyl(id);
}
//const vinyl = await getVinyl(2);
//console.log(vinyl);

// const result = await createVinyl('The Symposium');
// console.log(result);

// const vinyls = await getVinyls();
// console.log(vinyls);