
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// ...

const HeroCarousel = () => {
    return (
        <Carousel autoPlay interval={5000} infiniteLoop>
            <div className="relative h-75vh">
                <div className="w-full h-0" style={{ height: '75vh' }}>
                    <Image
                        src="/assets/hero-image1.png"
                        alt="Hero 1"
                        layout="fill"

                    />
                </div>
            </div>
            <div className="relative">
                <div className="w-full h-0" style={{ height: '75vh' }}>
                    <Image
                        src="/assets/hero-image2.jpg"
                        alt="Hero 2"
                        layout="fill"
                        className="object-center"
                    />
                </div>
            </div>
        </ Carousel>
    )
};
export default HeroCarousel;