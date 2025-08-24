import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from "path";   // ✅ add this
// import { fileURLToPath } from "url";  // ✅ add this

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export async function apiCreateListing(apiRequestContext, token) {

     const imagePath = path.resolve(__dirname, "../testData/images/house.jpg");

       const data = {
            images: fs.createReadStream(imagePath),
            lotSize: faker.number.int({ min: 1000, max: 10000 }),
            sqft: faker.number.int({ min: 1, max: 10000 }),
            garage: faker.number.int({ min: 1, max: 10 }),
            bathrooms: faker.number.int({ min: 1, max: 10 }),
            bedrooms: faker.number.int({ min: 1, max: 10 }),
            price: faker.number.int({ min: 500000, max: 900000 }),
            zipCode: 75202,
            state: 'TX',
            city: faker.location.city(),
            address: '123 W Humber Street',
            description: 'Vishva Automation Playwright API Refactoring',
            title: `Vishva Search Api Test ${faker.number.int({ min: 1000, max: 100000 })}`,
            isPublished: true
        }

        const apiCreateListingResponse = await apiRequestContext.post(`/api/estate-objects`, {
            multipart: data,
            Authorization: `Bearer ${token}`
        });

        const apiLoginResponseJson = await apiCreateListingResponse.json();
        return apiLoginResponseJson;
}