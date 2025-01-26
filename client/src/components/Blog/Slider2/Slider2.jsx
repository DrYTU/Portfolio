import React from 'react'
import BlogItem from '../BlogItem'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Slider2({ Blogs }) {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
      slidesToSlide: 2
    },
    bigDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 6,
      slidesToSlide: 2
    },
    desktop: {
      breakpoint: { max: 2000, min: 1594 },
      items: 5,
      slidesToSlide: 1
    },
    littleDesktop: {
      breakpoint: { max: 1594, min: 1278 },
      items: 4,
      slidesToSlide: 1
    },
    bigTablet: {
      breakpoint: { max: 1278, min: 750 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 750, min: 468 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 468, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <div className='row justify-content-center'>

      <Carousel
        className='ms-5'
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={true}
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
        transitionDuration={2000}
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={0}
        centerMode={false}
        containerClass="container-with-dots"
        customTransition="all 2s ease"
        dotListClass=""
        draggable={true}
        focusOnSelect={false}
        infinite
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}

      >
        {Blogs?.map(item => (
          <BlogItem
            class="my-5 mx-md-4 mx-3"
            id={item.id}
            key={item.id}
            img={item.imgPath}
            title={item.title}
            summary={item.summary}
            favNum={item.favNum}
            date={item.createdAt.substring(0, item.createdAt.indexOf('T'))}
          />
        ))}

      </Carousel>



    </div>




  )
}

export default Slider2