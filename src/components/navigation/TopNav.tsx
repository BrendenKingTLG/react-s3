export const TopNav = () => {
  return (
    <div className="navbar bg-slate-400">
      <div className="flex-none w-6">
        <a className="btn btn-ghost text-xl">
          OpenStreetMap{" "}
          <span className=" text-2xl font-semibold marker-underline">Data</span>
        </a>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="flex-none w-6">
        <a className="btn btn-ghost text-xl"></a>
      </div>
    </div>
  );
};
