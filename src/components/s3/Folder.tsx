import { CommonPrefix, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";
import { useNavigate } from "react-router-dom";

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
export const Folder = ({ data }: FolderProps) => {
  const navigate = useNavigate();

  const handleFolderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const folderName = (event.target as HTMLElement).dataset.prefix;
    console.log(folderName);
    if (folderName) {
      navigate(`/${folderName}`, { state: { prefix: folderName } });
    }
  };

  return (
    data.CommonPrefixes && (
      <div onClick={handleFolderClick} className="">
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
                  <td className=" cursor-pointer" data-prefix={prefix.Prefix}>
                    {prefix.Prefix?.replace("/", "")}
                  </td>
                  <td className="">-</td>
                  <td>-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};
