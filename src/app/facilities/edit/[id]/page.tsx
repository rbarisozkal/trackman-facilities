'use client';
import { EditFacilityForm } from '@/components/facility/EditFacilityForm';
import { useParams } from 'next/navigation';
export default function EditFacility() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col w-full max-w-[74rem] px-4 py-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Facility</h1>
      <EditFacilityForm facilityId={id} />
    </div>
  );
}
