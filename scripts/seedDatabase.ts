import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';



async function seedDatabase() {
    const prisma = new PrismaClient({
        datasources: {
          db: {
              url: process.env.POSTGRES_PRISMA_URL,
          }
        },
    });
    try {
        // Check if the database is already seeded
        const existingProfessorCount = await prisma.professor.count();
        if (existingProfessorCount > 0) {
            console.log('Database already seeded. Skipping seeding process.');
            return;
        }

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