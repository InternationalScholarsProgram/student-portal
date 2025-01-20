const VideoComponent = ({ video, text }: { video: string; text: string }) => (
  <div id={text} className="w-full h-full col items-center overflow-hidden">
    {/* <p className="text-center">{text}</p> */}
    <video
      controls
      title={text}
      className="w-[85%] h-[80%]  "
      preload="metadata"
    >
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default VideoComponent;
