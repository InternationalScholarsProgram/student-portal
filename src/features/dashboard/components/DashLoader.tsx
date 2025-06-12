import { Skeleton, Stack } from "@mui/material";

function DashLoader() {
  return (
    <Stack spacing={1} w-full className="p-4 w-full h-dvh">
      <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
      <Skeleton variant="rounded" className="w-full" height={200} />

      <Stack spacing={2} w-full direction="row" className="py-3">
        <Skeleton variant="rounded" width={400} height={100} />
        <Skeleton variant="rounded" width={400} height={100} />
        <Skeleton variant="rounded" width={400} height={100} />
      </Stack>

      <Skeleton variant="rounded" className="w-full" height={200} />
    </Stack>
  );
}

export default DashLoader;
