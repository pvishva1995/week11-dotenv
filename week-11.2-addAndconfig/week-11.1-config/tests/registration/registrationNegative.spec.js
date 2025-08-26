import { test, expect } from '@playwright/test';
import { HomePage } from '../../page_objects/home.page';
import { RegistrationPage } from '../../page_objects/registration.page';

test('User should not register without filling in all required fields', async({ page }, testInfo) => {
    await page.goto(testInfo.project.use.env.baseUrl);
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.registerIcon.click();
    await registrationPage.registerButton.click();
    
    await expect(registrationPage.firstNameRequired).toBeVisible();
    await expect(registrationPage.lastNameRequired).toBeVisible();
    await expect(registrationPage.emailRequired).toBeVisible();
    await expect(registrationPage.passwordRequired).toBeVisible();
})