import { test } from '../../fixtures/fixtures.js';
import { expect } from '@playwright/test';
import { FeaturedListingsPage } from '../../page_objects/featuredListings.page';
import testData from '../../testData/listingDetails.json';
import { ListingDetailsPage } from '../../page_objects/listingDetails.page';
import { apiLogin } from '../../api/UsersApi.js';
import users from '../../testData/users.json'
import { apiCreateListing } from '../../api/ListingsApi.js';

const adminEmail = users.admin.email;
const adminPassword = users.admin.password;

test.describe("Search on FeaturedListings page", () => {
        let featuredlistPage;
        let listingDetailsPage;
  
    test.beforeAll(async ({ authenticatedPage }) => {
        await authenticatedPage.goto('/');
    });

    test.beforeEach(async ({ authenticatedPage }) => {
        await authenticatedPage.goto("/featured-listings");
        featuredlistPage = new FeaturedListingsPage(authenticatedPage);
        listingDetailsPage = new ListingDetailsPage(authenticatedPage);
        await featuredlistPage.darkmodeSwitcher.click();
    });

    test('Should search by keyword', async ( { authenticatedPage, createdListing} ) => {
        await featuredlistPage.searchKeyword(createdListing.title);
        await featuredlistPage.searchButton();

        await expect(authenticatedPage.getByText(createdListing.title)).toBeVisible();
    });

    test('Should search by bedrooms', async ( { authenticatedPage,createdListing } ) => {
        await featuredlistPage.selectBedrooms(testData.BedroomData.bedrooms);
        await featuredlistPage.searchButton();

        await authenticatedPage.waitForLoadState('networkidle');
        const bedroomsText = await listingDetailsPage.propertyBed.textContent();
        const bedroomsCount = bedroomsText.match(/\d+/);
        const bedroomsCountNumber = parseInt(bedroomsCount[0]);
        
        await expect(authenticatedPage.getByText('Bedrooms:').first()).toBeVisible();

        expect(bedroomsCountNumber).not.toBeNull();
        const expectedBedrooms = parseInt(testData.BedroomData.bedrooms, 10); 
        expect(bedroomsCountNumber).toBeGreaterThanOrEqual(expectedBedrooms);
    });

    test('Should search by city', async ( {authenticatedPage} ) => {
        await featuredlistPage.selectCity(testData.City.cityName);
        await featuredlistPage.searchButton();

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

    test('Should search by price', async ( { authenticatedPage } ) => {
        const min = 500000;
        const max = 8400000;
    
        await authenticatedPage.goto(`/featured-listings?price=${min}-${max}`);
        await featuredlistPage.searchButton();

        await featuredlistPage.moreInfoButtons.first().click();

        const priceText = await featuredlistPage.askingPriceInfo.textContent();
        const listingPrice = parseInt(priceText.replace(/[^0-9]/g, ''), 10);

        expect(listingPrice).toBeGreaterThanOrEqual(min);
        expect(listingPrice).toBeLessThanOrEqual(max);
    }); 
}); 