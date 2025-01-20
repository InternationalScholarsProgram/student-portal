import { routes } from "./linkItems";
const allRoutes = [
  ...routes,
  // {
  //   name: "Dashboard",
  //   to: "/",
  // },
];

const getLabels = (path: string) => {
  if (path === "withdraw") return "Withdraw from Program";

  const flattenedPaths = allRoutes.flatMap((item: any) => {
    if (item?.subItems) return [item, ...item.subItems];
    return item;
  });

  return flattenedPaths.find((item) => item.to === path)?.name;
};

export { getLabels };
