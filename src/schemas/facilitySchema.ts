import { z } from 'zod';

export const facilitySchema = z.object({
  name: z.string().min(1, 'Facility name is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'Cover Image is required'),
  openingTime: z.string().min(1, 'Opening time is required'),
  closingTime: z.string().min(1, 'Closing time is required'),
  isDefaultFacility: z.boolean({ required_error: 'Is Default Facility is required' })
});

export type FacilityFormValues = z.infer<typeof facilitySchema>;
