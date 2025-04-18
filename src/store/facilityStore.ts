import { create } from 'zustand';
import { Facility } from '../types/facility';
import { sortFacilityByDefaultOption } from '../lib/utils';
import { Facilities } from '@/app/constants';

interface FacilityState {
  facilities: Facility[];
  addFacility: (facility: Facility) => void;
  editFacility: (id: string, facility: Partial<Facility>) => void;
  deleteFacility: (id: string) => void;
  setDefaultFacility: (id: string) => void;
}

export const useFacilityStore = create<FacilityState>((set) => ({
  facilities: sortFacilityByDefaultOption(Facilities),

  addFacility: (facility) => set((state) => {
    const isFirstFacility = state.facilities.length === 0;

    const shouldBeDefault = isFirstFacility || facility.isDefaultFacility;

    let updatedFacilities = state.facilities;
    if (shouldBeDefault) {
      updatedFacilities = state.facilities.map(f => ({
        ...f,
        isDefaultFacility: false
      }));
    }

    const newFacilities = [
      ...updatedFacilities,
      {
        ...facility,
        isDefaultFacility: shouldBeDefault
      }
    ];

    const sortedFacilities = sortFacilityByDefaultOption(newFacilities);

    return { facilities: sortedFacilities };
  }),

  editFacility: (id: string, updatedFacility: Partial<Facility>) => set((state) => {
    const isBeingSetAsDefault = updatedFacility.isDefaultFacility === true;

    const facilities = state.facilities.map((facility) => {
      if (isBeingSetAsDefault && facility.id !== id) {
        return { ...facility, isDefaultFacility: false };
      }

      if (facility.id === id) {
        return { ...facility, ...updatedFacility };
      }

      return facility;
    });

    const sortedFacilities = sortFacilityByDefaultOption(facilities);

    return { facilities: sortedFacilities };
  }),

  deleteFacility: (id: string) => set((state) => {
    const isDefaultBeingDeleted = state.facilities.find(f => f.id === id)?.isDefaultFacility;

    const remainingFacilities = state.facilities.filter((facility) => facility.id !== id);

    if (isDefaultBeingDeleted && remainingFacilities.length > 0) {
      remainingFacilities[0].isDefaultFacility = true;
    }

    const sortedFacilities = sortFacilityByDefaultOption(remainingFacilities);

    return { facilities: sortedFacilities };
  }),

  setDefaultFacility: (id: string) => set((state) => {
    const facilities = state.facilities.map((facility) => ({
      ...facility,
      isDefaultFacility: facility.id === id
    }));

    const sortedFacilities = sortFacilityByDefaultOption(facilities);

    return { facilities: sortedFacilities };
  })
}));
