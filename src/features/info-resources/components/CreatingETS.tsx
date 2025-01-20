import VideoComponent from "./VideoComponent";
import { creatingETS } from "../assets/videos";

function CreatingETS() {
  return (
    <div className="col-center h-full">
      <p>Steps to Create ETS Account</p>
      <VideoComponent text="" video={creatingETS} />

      <div className="w-full row items-center gap-2 text-lg p-4">
        <a href="https://www.mba.com/service/registration" className="text-primary-main">Click here </a>
        <p className="text-sm">to create an account</p>
        {/* <PrimaryBtn btnstyles="self-end mx-4"> Create Account</PrimaryBtn> */}
      </div>
    </div>
  );
}

export default CreatingETS;
