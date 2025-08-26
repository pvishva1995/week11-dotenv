import {test, expect } from '@playwright/test';
import { HomePage } from '../../page_objects/home.page.js';
import { FeaturedListingsPage } from '../../page_objects/featuredListings.page.js'
import testData from '../../testData/listingDetails.json';
import { ListingDetailsPage } from '../../page_objects/listingDetails.page.js';
import { apiLogin } from '../../api/UsersApi.js';
import users from '../../testData/users.json'
import { apiCreateListing } from '../../api/ListingsApi.js';


// const adminEmail = users.admin.email;
// const adminPassword = users.admin.password;

test.describe("Search on Homepage", () => {
        let homePage;
        let featuredlistPage;
        let listingDetailsPage;
        let apiToken;
        let newListing;
        let listingTitle;

    test.beforeAll(async ({ request }, testInfo) => {
        apiToken = await apiLogin(request, testInfo.project.use.env.userEmail, testInfo.project.use.env.userPassword);
        newListing = await apiCreateListing(request, apiToken);
        listingTitle = newListing.title;
    });

    test.beforeEach(async ({ page, request }, testInfo) => {
        await page.goto(testInfo.project.use.env.baseUrl, { timeout: 60000 });

        apiToken = await apiLogin(request, testInfo.project.use.env.userEmail, testInfo.project.use.env.userPassword);
        await page.evaluate(token => localStorage.setItem('accessToken', token), apiToken);
        
        homePage = new HomePage(page);
        featuredlistPage = new FeaturedListingsPage(page);
        listingDetailsPage = new ListingDetailsPage(page);
        await homePage.darkmodeSwitcher.click();
    });

    test('Should search by keyword', async ( {page} ) => {
        await homePage.searchWithKeyword(listingTitle);
        await homePage.searchButton();
        await expect(page.getByText(listingTitle)).toBeVisible({timeout: 30000 });
    });

    test('Should search by bedrooms', async ( {page} ) => {
        await homePage.selectBedrooms(testData.BedroomData.bedrooms);
        await homePage.searchButton();

        // await page.waitForLoadState('networkidle');
          await expect(listingDetailsPage.propertyBed).toBeVisible({ timeout: 30000 });    
        const bedroomsText = await listingDetailsPage.propertyBed.textContent();
        const bedroomsCount = bedroomsText.match(/\d+/);
        const bedroomsCountNumber = parseInt(bedroomsCount[0], 10);
        
        await expect(page.getByText('Bedrooms:').first()).toBeVisible();

        expect(bedroomsCountNumber).not.toBeNull();

        const expectedBedrooms = parseInt(testData.BedroomData.bedrooms, 10); 
        expect(bedroomsCountNumber).toBeGreaterThanOrEqual(expectedBedrooms);
    });

    test('Should search by city', async ( {page} ) => {
        await featuredlistPage.selectCity(testData.City.cityName);
        await homePage.searchButton();

        await expect(featuredlistPage.listingData).toBeVisible(testData.City.cityName);  
        await expect(featuredlistPage.cardBedroomCount).toBeVisible(); 
        await expect(featuredlistPage.cardSqft).toBeVisible(); 
        await expect(featuredlistPage.cardGarage).toBeVisible(); 
        await expect(featuredlistPage.cardBathrooms).toBeVisible();
        await expect(featuredlistPage.cardCity).toBeVisible(); 
        await expect(featuredlistPage.cardState).toBeVisible(); 
        await expect(featuredlistPage.cardZipcode).toBeVisible();
        await expect(featuredlistPage.moreInfoButtons.first()).toBeVisible(); 

        const cardBedroomCount = await featuredlistPage.cardBedroomCount.innerText();
        const cardBathrooms = await featuredlistPage.cardBathrooms.innerText();
        const cardGarage = await featuredlistPage.cardGarage.innerText();

        await featuredlistPage.moreInfoButtons.first().click();

        await expect(listingDetailsPage.propertyBed).toBeVisible();
        await expect(listingDetailsPage.propertyBath).toBeVisible();
        await expect(listingDetailsPage.propertyGarage).toBeVisible();
    
        const propertyBed = await listingDetailsPage.propertyBed.innerText();
        const propertyBath = await listingDetailsPage.propertyBath.innerText();
        const propertyGarage = await listingDetailsPage.propertyGarage.innerText();

        expect(propertyBed.trim()).toBe(cardBedroomCount.trim());
        expect(propertyBath.trim()).toBe(cardBathrooms.trim());
        expect(propertyGarage.trim()).toBe(cardGarage.trim());
    });

    test('Should search by price', async ( {page} ) => {
        const min = 500000;
        const max = 8400000;
    
        await page.goto(`/featured-listings?price=${min}-${max}`);
        await homePage.searchButton();

        await featuredlistPage.moreInfoButtons.first().click();

        const priceText = await featuredlistPage.askingPriceInfo.textContent();
        const listingPrice = parseInt(priceText.replace(/[^0-9]/g, ''), 10);

        expect(listingPrice).toBeGreaterThanOrEqual(min);
        expect(listingPrice).toBeLessThanOrEqual(max);
    }); 
});