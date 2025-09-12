import { Skeleton, Stack } from "@mui/material";

function LoaderSideBar() {
  return (
    <Stack spacing={1} direction="row" className="w-screen h-dvh">
      <Stack spacing={1} className="col p-4 w-[30vw] h-dvh">
        <Skeleton variant="rounded" className="flex-1 h-full" />
      </Stack>
      <Stack spacing={1} direction="column" className="w-[65vw]">
        <Skeleton variant="text" height={200} />
        <Skeleton variant="rounded" className="w-full flex-1" />
      </Stack>
    </Stack>
  );
}

export default LoaderSideBar;
