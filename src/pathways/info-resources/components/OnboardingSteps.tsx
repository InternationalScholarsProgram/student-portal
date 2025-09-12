import { applicationGuide, gmat, gre, creditReport } from "../assets/videos";
import VideoComponent from "./VideoComponent";

const slides = [
  { text: "ISP Application Guide", video: applicationGuide },
  { text: "Generating credit report", video: creditReport },
  { text: "Entrance exam GMAT option", video: gmat },
  { text: "Entrance exam GRE option", video: gre },
];

function OnboardingSteps() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {slides.map((slide, index) => (
        <div key={index} className="col gap-2">
          <p className="text-center">{slide.text}</p>
          <VideoComponent video={slide.video} text={slide.text} />
        </div>
      ))}
    </div>
  );
}

export default OnboardingSteps;
