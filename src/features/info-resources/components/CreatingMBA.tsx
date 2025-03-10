import VideoComponent from "./VideoComponent";
import { creatingMBA } from "../assets/videos";

function CreatingMBA() {
  return (
    <div className="col-center h-full">
      <p className="py-1">Steps to Create MBA Account</p>
      <VideoComponent text="" video={creatingMBA} />

      <div className="w-full row items-center gap-2 text-lg p-4">
        <a href="https://www.mba.com/service/registration" className="text-primary-main">Click here </a>
        <p className="text-sm">to create an account</p>
        {/* <PrimaryBtn className="self-end mx-4"> Create Account</PrimaryBtn> */}
      </div>
    </div>
  );
}

export default CreatingMBA;
