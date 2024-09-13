import { useLocation } from "react-router-dom";
import { useS3Objects } from "../../hooks/s3/useS3Objects";
import { Folder } from "./Folder";
import { File } from "./File";

/**
 * Renders a list of S3 objects as folders and files.
 */
export const S3FileList = () => {
  const location = useLocation();
  const prefix = location.state?.prefix || window.location.pathname.slice(1);
  const currentPrefixData = useS3Objects("osm-planet-us-west-2", prefix);

  return (
    <>
      {currentPrefixData ? (
        <>
          <Folder data={currentPrefixData} />
          <File data={currentPrefixData} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
