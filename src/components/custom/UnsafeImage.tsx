import Image from 'next/image';

const anyDomainLoader = ({ src }: { src: string }) => src;

const UnsafeImage = (props:any) => (
    <Image
        loader={anyDomainLoader}
        unoptimized
        {...props}
    />
);
export default UnsafeImage;