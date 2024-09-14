import { useLocation } from "react-router-dom";
import { useS3Objects } from "../hooks/s3/useS3Objects";
import { Folder } from "../components/s3/Folder";
import { File } from "../components/s3/File";
import { HomeHero } from "../components/hero/HomeHero";

/**
 * Renders a list of S3 objects as folders and files.
 */
export const S3FileList = () => {
  const location = useLocation();
  const prefix = location.state?.prefix || window.location.pathname.slice(1);
  const currentPrefixData = useS3Objects("osm-planet-us-west-2", prefix);

  return (
    <>
      <HomeHero />
      {currentPrefixData ? (
        <section className="w-full">
          <h3 className="text-xl font-bold my-2">Items</h3>
          <Folder data={currentPrefixData} />
          <File data={currentPrefixData} />
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
