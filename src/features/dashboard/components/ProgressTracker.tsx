import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import ContentComponent from "../../../components/ContentComponent";
import { ProgressData } from "../Dashboard";
import { CircularProgressbar } from "react-circular-progressbar";
type Props = {
  progressData: ProgressData | undefined;
};

const ProgressTracker: React.FC<Props> = ({ progressData }) => {
  return (
    <ContentComponent header="Progress Tracker">
      <div className="w-full space-y-6 p-4">
        <div className="grid grid-cols-5 flex-wrap gap-2">
          {progressData &&
            Object.entries(progressData).map(([key, progress]) => {
              if (typeof progress !== "number") return null;
              return (
                <div key={key} className="">
                  {/* <p className="font-bold text-sm w-">{formatLabel(key)}</p>

                <div className="col-span-2 flex items-center gap-2 px-2">
                  <LinearProgress
                    className="w-[100%]"
                    variant="determinate"
                    color={getProgressColor(progress)}
                    value={progress}
                  />
                </div>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >{`${Math.round(progress)}%`}</Typography> */}
                  <div>
                    <CircularProgressbar
                      value={progress}
                      text={`${Math.round(progress)}%`}
                    ></CircularProgressbar>
                    <p className="font-bold text-sm w-">{formatLabel(key)}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </ContentComponent>
  );
};

export default ProgressTracker;

const getProgressColor: (progress: number) => LinearProgressProps["color"] = (
  progress
) => {
  if (progress <= 25) {
    return "error";
  } else if (progress <= 50) {
    return "warning";
  } else if (progress <= 75) {
    return "primary";
  } else {
    return "success";
  }
};
const formatLabel = (key: string) => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
