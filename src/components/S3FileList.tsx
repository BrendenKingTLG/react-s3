import { useNavigate } from "react-router-dom";
import { useS3Objects } from "../hooks/useS3Objects";
import { CommonPrefix } from "@aws-sdk/client-s3";

export const S3FileList = () => {
  const navigate = useNavigate();
  const prefix = window.location.pathname.slice(1);
  const currentPrefixData = useS3Objects("osm-planet-us-west-2", prefix);

  const handleFolderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const folderName = (event.target as HTMLElement).dataset.prefix;
    if (folderName) {
      navigate(`/${folderName}`, { state: { prefix: folderName } });
    }
  };

  return (
    <>
      {currentPrefixData.CommonPrefixes && (
        <div onClick={handleFolderClick}>
          {currentPrefixData.CommonPrefixes.map((prefix: CommonPrefix) => (
            <p
              key={prefix.Prefix}
              data-prefix={prefix.Prefix}
              className="text-2xl p-2 cursor-pointer"
            >
              {prefix.Prefix}
            </p>
          ))}
        </div>
      )}

      {currentPrefixData.Contents && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="py-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {currentPrefixData.Contents.map((object) => (
                <tr key={object.Key}>
                  <td className="p-2">
                    <a
                      href={`https://osm-planet-us-west-2.s3.us-west-2.amazonaws.com/${object.Key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={object.Key}
                      className="p-2 hover:underline"
                    >
                      {object.Key}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
