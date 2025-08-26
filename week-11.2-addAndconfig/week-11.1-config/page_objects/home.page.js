export class HomePage {

  constructor(page) {
    this.page = page;
    this.loginIcon = page.locator('[href="/auth/login"]');
    this.registerIcon = page.locator('[href="/auth/register"]');
    this.darkmodeSwitcher = page.locator('[type="checkbox"]');
    this.homeIcon = page.locator('[class="MuiBox-root css-1ktnz7v iconify iconify--eva"]');
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.bedroomField = page.locator('[id=":r2:"]');
    this.bedroomValue = page.locator('[data-value="2"]');
    this.cityField = page.locator('[id=":r4:"]');
    this.startSearchButton = page.getByText('Start Search');
    this.priceSlideBar = page.locator('[class="MuiBox-root css-1qtrbix"]');
    this.priceSlider = page.locator('[class="MuiSlider-root MuiSlider-colorPrimary MuiSlider-sizeSmall css-k4xr5o"]');
    this.maxPrice = page.getByText('$ 10,000,000');
    this.listingCards = page.locator('[class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb"]');
  }

  async searchWithKeyword(keyword) {
    await this.searchInput.fill(keyword);
  }

  async selectBedrooms(bedrooms) {
    await this.bedroomField.click();
    await this.bedroomValue.click(bedrooms);
  }

  async selectCity(cityName) {
    await this.cityField.click();
    await this.cityField.fill(cityName);
  }

  async searchButton() {
    await this.startSearchButton.click();
  }
}
