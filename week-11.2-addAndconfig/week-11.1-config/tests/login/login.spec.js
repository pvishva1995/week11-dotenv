import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page_objects/login.page.js'; 
import { HomePage } from '../../page_objects/home.page.js';
import { DashboardPage } from '../../page_objects/dashboard.page.js';
import { apiLogin } from '../../api/UsersApi.js';
import users from '../../testData/users.json';

test.describe(() => {
        let homePage;
        let loginPage;
        let dashboardPage;

    test.beforeEach(async ({ page }, testInfo) => {
        await page.goto(testInfo.project.use.env.baseUrl);
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
    });

  test('should login with existing admin account', async ({ page }, testInfo) => {
        await homePage.loginIcon.click();
        await loginPage.login(testInfo.project.use.env.adminEmail, testInfo.project.use.env.adminPassword);
      
        await page.waitForLoadState('load');
        await expect(dashboardPage.fullUsersName).toBeVisible({ timeout: 10000 });
        await expect(dashboardPage.userRole).toBeVisible({ timeout: 10000 });
  });

  test('should logout', async ({ page, request }, testInfo) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        const apiToken = await apiLogin(request, testInfo.project.use.env.adminEmail, testInfo.project.use.env.adminPassword);
  
        await page.addInitScript(token => {
          localStorage.setItem('accessToken', token);
        }, apiToken);

        await page.goto(`${testInfo.project.use.env.baseUrl}/dashboard`);

        await expect(dashboardPage.fullUsersName).toBeVisible({ timeout: 10000 });
        await expect(dashboardPage.userRole).toBeVisible({ timeout: 10000 });

        await dashboardPage.logout();
        
        await expect(loginPage.loginHome).toBeVisible();
  });
});

