import { useLocation, useNavigate } from "react-router-dom";
import { useS3Objects } from "../hooks/s3/useS3Objects";
import { HomeHero } from "../components/hero/HomeHero";
import { List } from "../components/s3/List";
import { useEffect } from "react";

/**
d */
export const S3FileList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let prefix = location.state?.prefix || window.location.pathname.slice(1);
  const currentPrefixData = useS3Objects("osm-planet-us-west-2", prefix);

  useEffect(() => {
    const handlePopState = () => {
      const newPrefix = window.location.pathname.slice(1);
      navigate(newPrefix, { replace: true });
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <>
      <HomeHero />
      {currentPrefixData ? (
        <section className="w-full h-screen">
          <h3 className="pl-2 text-xl font-bold my-2 ">Items</h3>
          <List data={currentPrefixData} />
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
