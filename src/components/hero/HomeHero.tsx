import imgUrl from "../../assets/home-hero.png";

export const HomeHero = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={typeof imgUrl === "string" ? imgUrl : ""}
          className="max-w-sm"
        />
        <div>
          <h1 className="text-5xl font-bold">Planet OSM!</h1>
          <p className="py-6">
            Files published before 12 September 2012 are distributed under a
            Creative Commons Attribution-ShareAlike 2.0 license, those published
            after are Open Data Commons Open Database License 1.0 licensed. For
            more information, see the project wiki.
          </p>
        </div>
      </div>
    </div>
  );
};
