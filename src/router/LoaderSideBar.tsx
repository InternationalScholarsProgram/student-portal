import Loader from "../components/loaders/Loader";

function LoaderSideBar() {
  return (
    <div className="row h-screen-dvh w-screen">
      <aside className="sidebar" />
      <main className="flex-1 col-center bg-default">
        <nav className="w-full h-[9vh] bg-paper" />
        <Loader />
      </main>
    </div>
  );
}

export default LoaderSideBar;
