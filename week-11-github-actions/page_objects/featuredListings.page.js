export class FeaturedListingsPage {

  constructor(page) {
    this.page = page;
    this.featuredListingIcon = page.locator('[aria-current="page"]');
    this.searchField = page.locator('[id=":r1:"]');
    this.bedroomField = page.locator('[id=":r2:"]');
    this.bedroomValue =  page.locator('[data-value="2"]');
    this.cityField = page.locator('[id=":r4:"]');
    this.startSearchButton = page.getByText('Start Search');
    this.priceSlider = page.locator('[class="MuiBox-root css-1qtrbix"]');
    this.slideBar = page.locator('[class="MuiSlider-root MuiSlider-colorPrimary MuiSlider-sizeSmall css-k4xr5o"]');
    this.maxPrice = page.getByText('$ 10,000,000');
    this.listingData = page.locator('[class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb"]');
    this.propertyListing = page.locator('[class*="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6"]').first();
    this.cardBedroomCount = page.getByText(' Bedrooms: ').first();
    this.cardSqft = page.getByText(' Sqft: ').first();
    this.cardGarage = page.getByText(' Garage: ').first();
    this.cardBathrooms = page.getByText(' Bathrooms: ').first();
    this.cardCity = page.getByText(' City: ').first();
    this.cardState = page.getByText(' State: ').first();
    this.cardZipcode = page.getByText(' Zip/Code: ').first();
    this.moreInfoButtons = page.getByText('More Info').first();
    this.askingPriceInfo = page.getByText(' Asking Price:').first();
    this.darkmodeSwitcher = page.locator('[type="checkbox"]');
  }

  async searchKeyword(keyword) {
    await this.searchField.fill(keyword);
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