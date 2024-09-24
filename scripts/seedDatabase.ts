import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function seedDatabase() {
    try {
      // Read the JSON file
      const data = JSON.parse(fs.readFileSync('./loadingPinecone/Stetson.json', 'utf8'));

      for (const professor of data) {
        const createdProfessor = await prisma.professor.create({
          data: {
            name: professor.name,
            department: professor.department,
            rating: professor['overall rating'] === 'N/A' ? null : parseFloat(professor['overall rating']),
            institution_name: professor['institution name'],
            reviews: {
              create: professor.reviews.map((review: string) => ({
                content: review
              }))
            }
          }
        });

        console.log(`Inserted professor: ${createdProfessor.name}`);
      }

      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      await prisma.$disconnect();
    }
}

seedDatabase();