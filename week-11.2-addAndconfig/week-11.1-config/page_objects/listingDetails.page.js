export class ListingDetailsPage {

  constructor(page) {
    this.page = page;
    this.propertyBed = page.getByText(' Bedrooms: ').first();
    this.propertyBath = page.getByText(' Bathrooms: ').first();
    this.propertyGarage = page.getByText(' Garage: ').first();
  }
}