import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { applicationGuide, gmat, gre, creditReport } from "../assets/videos";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../styles/swiper.css";
import VideoComponent from "./VideoComponent";

const slides = [
  { text: "ISP Application Guide", video: applicationGuide },
  { text: "Generating credit report", video: creditReport },
  { text: "Entrance exam GMAT option", video: gmat },
  { text: "Entrance exam GRE option", video: gre },
];

function OnboardingSteps() {
  return (
    <div className="grid grid-cols-2 w-full h-full">
      {slides.map((slide, index) => (
        <div key={index} className="w-full h-full col">
          <p className="text-center">{slide.text}</p>
          <VideoComponent video={slide.video} text={slide.text} />
        </div>
      ))}
      {/* <Swiper
        slidesPerView={1}
        loop={true}
        onChange={(swiper) => {
          // console.log(swiper, "onChange");
        }}
        pagination={{
          clickable: true,
          renderBullet: (index: number, className: string) => {
            // console.log(index, className);
            className = className + " bg-primary-main scale-105";
            return '<span class="' + className + '"></span>';
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        style={{ height: "100%", width: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full h-full col">
            <p>{slide.text}</p>
            <VideoComponent video={slide.video} text={slide.text} />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}

export default OnboardingSteps;
