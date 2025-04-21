import Image, {ImageProps} from 'next/image';

const anyDomainLoader = ({ src }: { src: string }) => src;

const UnsafeImage = (props:ImageProps) => (
    <Image
        loader={anyDomainLoader}
        unoptimized
        {...props}
    />
);
export default UnsafeImage;