'use client';

import { useRouter } from 'next/navigation';
import { useFacilityStore } from '@/store/facilityStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { facilitySchema, FacilityFormValues } from '@/schemas/facilitySchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

export function CreateFacilityForm() {
    const router = useRouter();
    const { facilities, addFacility } = useFacilityStore();
    const isFirstFacility = facilities.length === 0;

    const form = useForm<FacilityFormValues>({
        resolver: zodResolver(facilitySchema),
        defaultValues: {
            name: '',
            address: '',
            description: '',
            openingTime: '',
            closingTime: '',
            image: '',
            isDefaultFacility: isFirstFacility,
        },
    });

    const onSubmit = (data: FacilityFormValues) => {
        addFacility({
            id: Date.now().toString(),
            name: data.name,
            address: data.address,
            description: data.description,
            image: data.image,
            openingTime: data.openingTime,
            closingTime: data.closingTime,
            isDefaultFacility: isFirstFacility ? true : data.isDefaultFacility,
        });
        router.push('/');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className='w-full md:w-2/3 lg:w-1/2'>
                    <h2 className="text-xl font-semibold mb-4">Facility Information</h2>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Facility Name *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description *</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} rows={6} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cover Image URL *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isDefaultFacility"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={isFirstFacility || field.value}
                                            onCheckedChange={(value) => field.onChange(value)}
                                            disabled={isFirstFacility}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Default Facility</FormLabel>
                                        <p className="text-sm text-gray-500">
                                            {isFirstFacility
                                                ? "This is the first facility and will be automatically set as the default."
                                                : "Setting this facility as default will override the currently marked default facility."}
                                        </p>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <h2 className="text-xl font-semibold mb-4">Working Hours</h2>

                    <div className="flex gap-x-2">
                        <FormField
                            control={form.control}
                            name="openingTime"
                            render={({ field }) => (
                                <FormItem className='w-64'>
                                    <FormLabel>Opening Time *</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="closingTime"
                            render={({ field }) => (
                                <FormItem className='w-64'>
                                    <FormLabel>Closing Time *</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <Button
                        variant="secondary"
                        onClick={() => router.push('/')}
                        type="button"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Create Facility
                    </Button>
                </div>
            </form>
        </Form>
    );
}