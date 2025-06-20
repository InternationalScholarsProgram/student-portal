import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import ContentComponent from "../../../components/ContentComponent";
import { ProgressData } from "../Dashboard";
import { CircularProgressbar } from "react-circular-progressbar";
import { Theme, useTheme } from "@mui/material";
type Props = {
  progressData: ProgressData | undefined;
};

const ProgressTracker: React.FC<Props> = ({ progressData }) => {
  const { palette: colors } = useTheme();
  return (
    <ContentComponent header="Progress Tracker">
      <div className="grid grid-cols-5 gap-2">
        {progressData &&
          Object.entries(progressData).map(([key, progress]) => {
            if (typeof progress !== "number") return null;
            return (
              <div key={key} className="col gap-2">
                <CircularProgressbar
                  value={progress}
                  text={`${Math.round(progress)}%`}
                  styles={{
                    path: {
                      stroke: getProgressColor(progress, colors),
                    },
                    root: {
                      width: "100%",
                      height: "7em",
                    },
                    trail: {
                      stroke: colors.action.active,
                      opacity: 0.1,
                    }
                  }}
                />
                <p className="font-bold text-sm text-center">
                  {formatLabel(key)}
                </p>
              </div>
            );
          })}
      </div>
    </ContentComponent>
  );
};

export default ProgressTracker;

const getProgressColor = (progress: number, colors: Theme["palette"]) => {
  if (progress <= 25) {
    return colors.error.light;
  } else if (progress <= 50) {
    return colors.warning.light;
  } else if (progress <= 75) {
    return colors.primary.light;
  } else {
    return colors.success.light;
  }
};
const formatLabel = (key: string) => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
