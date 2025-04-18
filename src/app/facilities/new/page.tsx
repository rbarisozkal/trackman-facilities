'use client';

import { CreateFacilityForm } from '@/components/facility/CreateFacilityForm';

export default function NewFacility() {
  return (
    <div className="flex flex-col w-full max-w-[74rem] px-4 py-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Facility</h1>
      <CreateFacilityForm />
    </div>
  );
}
