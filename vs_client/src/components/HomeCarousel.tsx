import { FunctionComponent } from "react";
import Carousel from 'react-bootstrap/Carousel';

interface HomeCarouselProps {
}

const HomeCarousel: FunctionComponent<HomeCarouselProps> = () => {
    return (<div className="container-carousel ">
        <div className="caption">        <h1>Learn at your own pace</h1>
            <p>You have a test tomorrow, and you don't feel so sure about it? <br />
                Our team of friendly teachers will give you some last-minute help. <br />** No long-term commitments, monthly fees or stress. **</p></div>

        <Carousel fade className="container-carousel">

            <Carousel.Item >
                {/* <CarouselImage text="First slide" /> */}
                <img className="carousel-img " src="images/carousel_img/subjects_img/mathematics_img.webp" alt="mathematics_image" />
                <Carousel.Caption>
                    <h1>Mathmatics</h1>
                </Carousel.Caption>
                {/* <div>
                    <Carousel.Caption className="carousel-caption text-start" >
                        <h1>Learn at your own pace</h1>
                        <p>You have a test tomorrow, and you don't feel so sure about it? Our team of friendly teachers will give you some last-minute help. <br /> No long-term commitments, monthly fees or stress.</p>
                    </Carousel.Caption>

                </div> */}
            </Carousel.Item>
            <Carousel.Item>
                <img className="carousel-img " src="images/carousel_img/subjects_img/chemistry_img.webp" alt="chemistry_imag" />
                <Carousel.Caption>
                    <h1>Chemistry</h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="carousel-img " src="images/carousel_img/subjects_img/biology_img.webp" alt="biology_imag" />
                <Carousel.Caption>
                    <h1>Biology</h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="carousel-img " src="images/carousel_img/subjects_img/english_img.webp" alt="english_imag" />
                <Carousel.Caption>
                    <h1>English</h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="carousel-img " src="images/carousel_img/subjects_img/geography_img.webp" alt="geography_img" />
                <Carousel.Caption>
                    <h1>Geography</h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="carousel-img " src="images/carousel_img/subjects_img/history_img.webp" alt="history_imag" />
                <Carousel.Caption>
                    <h1>History</h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="carousel-img " src="images/carousel_img/subjects_img/physics_img.webp" alt="physics_image" />
                <Carousel.Caption>
                    <h1>Physics</h1>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </div>
    );
}

export default HomeCarousel;