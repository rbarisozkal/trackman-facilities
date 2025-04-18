'use client';
import { FacilityCard } from './FacilityCard';
import { useFacilityStore } from '../../store/facilityStore';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Button } from '../ui/button';

export function FacilityList() {
  const { facilities } = useFacilityStore();
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/facilities/edit/${id}`);
  };


  return (
    <div className="flex flex-col items-center max-w-[74rem] px-2">
      <div className="flex mb-4 self-end items-center">
        <Button variant={"primary"} asChild>
          <Link href="/facilities/new">
            Create Facility
          </Link>
        </Button>
      </div>
      <div className="flex flex-row flex-wrap gap-2 justify-center">
        {facilities.map((facility) => (
          <FacilityCard
            key={facility.id}
            facility={facility}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
