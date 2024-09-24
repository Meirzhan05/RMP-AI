import { Client } from 'pg';
import * as fs from 'fs';


const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});


async function seedDatabase() {
    try {
      await client.connect();
  
      // Read the JSON file
      const data = JSON.parse(fs.readFileSync('./loadingPincone/Stetson.json', 'utf8'));
  
      for (const professor of data) {
        // Insert professor
        const professorQuery = `
          INSERT INTO professors (name, department, rating, institution_name)
          VALUES ($1, $2, $3, $4)
          RETURNING id
        `;
        const professorValues = [
          professor.name,
          professor.department,
          professor['overall rating'] === 'N/A' ? null : parseFloat(professor['overall rating']),
          professor['institution name']
        ];
        const professorResult = await client.query(professorQuery, professorValues);
        const professorId = professorResult.rows[0].id;
  
        // Insert reviews
        for (const review of professor.reviews) {
          const reviewQuery = `
            INSERT INTO reviews (professor_id, content)
            VALUES ($1, $2)
          `;
          const reviewValues = [professorId, review];
          await client.query(reviewQuery, reviewValues);
        }
      }
  
      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      await client.end();
    }
  }
  
  seedDatabase();