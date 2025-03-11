import { FullLoader } from "../components/loaders/Loader";

function LoaderSideBar() {
  return (
    <div className="row h-screen-dvh w-screen">
      <aside className="sidebar" />
      <main className="flex-1 col bg-default">
        <nav className="w-full h-[9vh] bg-paper" />
        <FullLoader />
      </main>
    </div>
  );
}

export default LoaderSideBar;
