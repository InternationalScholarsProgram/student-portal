import { routes } from "./linkItems";

const getLabels = (path: string) => {
  if (path === "withdraw") return "Withdraw from Program";
  if (path === "switch-program-package") return "Switch Program Package";
  if (path === "tuition") return "Tuition and Living expenses";

  const checkIfPathhasSlash = path.includes("/");
  if (!checkIfPathhasSlash) return path;

  const flattenedPaths = routes.flatMap((item: any) => {
    if (item?.subItems) return [item, ...item.subItems];
    return item;
  });

  return flattenedPaths.find((item) => item.to === path)?.name;
};

export { getLabels };
