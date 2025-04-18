'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useFacilityStore } from '@/store/facilityStore';
import { useRouter } from 'next/navigation';
import { Facility } from '@/types/facility';
import { Separator } from '../ui/seperator';

interface FacilityDeleteDialogProps {
    facility: Facility;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const FacilityDeleteDialog = ({ facility, open, onOpenChange }: FacilityDeleteDialogProps) => {
    const router = useRouter();
    const { deleteFacility } = useFacilityStore();
    const handleDelete = (facility: Facility) => {
        deleteFacility(facility.id);
        router.push('/');
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="px-0">
                <div className="px-2">
                    <DialogHeader>
                        <DialogTitle className='font-normal'>Delete Facility</DialogTitle>
                    </DialogHeader>
                </div>
                <Separator className="w-full" />
                <div className="px-2">
                    <DialogDescription className='flex flex-col gap-2 text-black text-md'>
                        <span>Are you sure you want to delete this facility? This action cannot be undone.</span>
                        <span>Facility Name: <span className='font-semibold'>{facility.name}</span></span>
                    </DialogDescription>
                </div>
                <Separator className="w-full" />
                <div className="px-2">
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => handleDelete(facility)} variant="primary">Yes, Delete</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};