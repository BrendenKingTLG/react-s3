import { CommonPrefix, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";
import { Link } from "react-router-dom";

/**
 * Represents a S3 prefix as a folder.
 */
interface FolderProps {
  data: Partial<ListObjectsV2CommandOutput>;
}

/**
 * Renders a list of S3 prefixes as folders.
 * @param data - The data to display.
 */
export const List = ({ data }: FolderProps) => {
  return (
    data.CommonPrefixes && (
      <div className="">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.CommonPrefixes?.map((prefix: CommonPrefix) => (
                <tr key={prefix.Prefix}>
                  <td className="">
                    {prefix.Prefix && (
                      <Link
                        to={prefix.Prefix}
                        onClick={() =>
                          history.pushState(
                            { prefix: prefix.Prefix },
                            "",
                            prefix.Prefix?.split("/").at(-2) + "/"
                          )
                        }
                      >
                        {prefix.Prefix?.split("/").at(-2)}
                      </Link>
                    )}
                  </td>
                  <td className="">-</td>
                  <td>-</td>
                </tr>
              ))}
              {data.Contents?.map((object) => (
                <tr key={object.Key}>
                  <td className="p-2">
                    <a
                      href={`https://osm-planet-us-west-2.s3.us-west-2.amazonaws.com/${object.Key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={object.Key}
                      className=""
                    >
                      {object.Key?.split("/").at(-2)}
                    </a>
                  </td>
                  <td className="p-2">{object.LastModified?.toISOString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};
