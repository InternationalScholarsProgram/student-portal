import { routes } from "./linkItems";

const getLabels = (path: string) => {
  if (path === "withdraw") return "Withdraw from Program";
  if (path === "switch-program-package") return "Switch Program Package";

  const flattenedPaths = routes.flatMap((item: any) => {
    if (item?.subItems) return [item, ...item.subItems];
    return item;
  });

  return flattenedPaths.find((item) => item.to === path)?.name;
};

export { getLabels };
