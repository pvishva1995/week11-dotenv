import { expect } from "@playwright/test";

export class DashboardPage {

  constructor(page) {
    this.page = page;
    this.fullUsersName = page.locator('h6.MuiTypography-subtitle2');
    this.userRole = page.locator('a p.MuiTypography-body2');
    this.personIcon = page.locator('button[type="button"] .MuiAvatar-root');
    this.logoutButton = page.getByText('Logout');
  }

  async navigateToDashboard() {
    await this.page.goto('/dashboard');
    await expect(this.fullUsersName).toBeVisible({ timeout: 5000 });
    await expect(this.userRole).toBeVisible({ timeout: 10000 });
  } 

  async logout() {
    await this.personIcon.click();
    await this.logoutButton.click();
  }
}