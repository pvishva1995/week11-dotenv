import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../page_objects/registration.page';
import { HomePage } from '../../page_objects/home.page';
import { DashboardPage} from '../../page_objects/dashboard.page';
import { faker } from '@faker-js/faker';

test('should register new user', async ({ page }, testInfo) => {
  await page.goto(testInfo.project.use.env.baseUrl, {  waitUntil: 'domcontentloaded', timeout: 10000 });

  const homepage = new HomePage(page);
  const registrationPage = new RegistrationPage(page);
  const dashboardPage = new DashboardPage(page);

  const randomFirstName = faker.person.firstName();
  const randomLastName = faker.person.lastName();
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();
  const fullUsersName = `${randomFirstName} ${randomLastName}`;
  
  await homepage.registerIcon.click();
  await registrationPage.registration(randomFirstName, randomLastName, randomEmail, randomPassword);
  await page.waitForLoadState('load');

  await dashboardPage.page.waitForSelector(`text=${fullUsersName}`, { state: 'visible', timeout: 30000 });
});