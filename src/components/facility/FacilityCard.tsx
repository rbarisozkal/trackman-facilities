"use client"
import Image from 'next/image';
import { Facility } from '../../types/facility';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FacilityDeleteDialog } from './FacilityDeleteDialog';
import { useState } from 'react';
import { isFacilityOpen } from '@/lib/utils';

interface FacilityCardProps {
    facility: Facility;
    onEdit: (id: string) => void;
}

export function FacilityCard({ facility, onEdit }: FacilityCardProps) {
    const { id, name, address, image, openingTime, closingTime, isDefaultFacility } = facility;
    const [open, setOpen] = useState(false);
    const checkIsFacilityOpen = isFacilityOpen(openingTime, closingTime);

    return (
        <>
            <Card className="overflow-hidden shadow-lg flex flex-col w-[24rem] p-3">
                <div className="relative w-full h-[200px]">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover rounded-sm"
                        priority
                    />
                    {isDefaultFacility && (
                        <div className="absolute top-2 left-2 z-10">
                            <Image
                                src="/fav.svg"
                                alt="Default Facility"
                                width={24}
                                height={24}
                            />
                        </div>
                    )}
                </div>
                <CardContent className="flex flex-col gap-4 w-full px-0">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="text-lg font-normal">{name}</h3>
                        <Badge variant={checkIsFacilityOpen ? "success" : "destructive"}>
                            {checkIsFacilityOpen ? 'Open' : 'Closed'}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-1">
                            <Image src="/images/locationIcon.svg" alt="locationIcon" width={10} height={12} />
                            <p className="text-sm text-muted-foreground line-clamp-1">{address}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Button
                                onClick={() => setOpen(true)}
                                variant="secondary"
                                size="sm"
                                className="text-destructive hover:text-destructive/90 cursor-pointer"
                            >
                                <Image width={12} height={12} src="/images/deleteIcon.svg" alt="deleteIcon" />
                            </Button>
                            <Button
                                onClick={() => onEdit(id)}
                                variant="secondary"
                                size="sm"
                                className="w-16 cursor-pointer"
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <FacilityDeleteDialog facility={facility} open={open} onOpenChange={setOpen} />
        </>
    );
}
