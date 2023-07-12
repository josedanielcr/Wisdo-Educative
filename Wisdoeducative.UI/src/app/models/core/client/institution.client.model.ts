export class InstitutionClient {
  id: number;
  name: string | null;
  country: string | null;
  countryCode: string | null;
  website: string | null;
  status: string | null;

  constructor(
    id: number,
    name: string | null,
    country: string | null,
    countryCode: string | null,
    website: string | null,
    status: string | null
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.countryCode = countryCode;
    this.website = website;
    this.status = status;
  }
}