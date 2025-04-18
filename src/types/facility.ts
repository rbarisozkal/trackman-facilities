export interface Facility {
  id: string;
  name: string;
  address: string;
  description?: string;
  image: string;
  openingTime: string;
  closingTime: string;
  isOpen?: boolean;
  isDefaultFacility: boolean;
}
