import { expect } from "@playwright/test";

export class DashboardPage {

  constructor(page) {
    this.page = page;
    this.fullUsersName = page.locator('h6.MuiTypography-subtitle2');
    this.userRole = page.getByText('role: ');
    this.personIcon = page.locator('button[type="button"] .MuiAvatar-root');
    this.logoutButton = page.getByText('Logout');
  }

  async navigateToDashboard(fullName) {
    await this.page.goto('**/dashboard', { waitUntil: 'domcontentloaded' });
    const fullUsersName = this.page.getByText(fullName);
    await expect(fullUsersName).toBeVisible();
    await expect(this.userRole).toBeVisible();
  } 

  async logout() {
    await this.personIcon.click();
    await this.logoutButton.click();
  }
}