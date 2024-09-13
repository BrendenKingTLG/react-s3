import { CommonPrefix, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";
import { useNavigate } from "react-router-dom";

interface FolderProps {
  data: Partial<ListObjectsV2CommandOutput>;
}

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
    <div onClick={handleFolderClick}>
      {data.CommonPrefixes?.map((prefix: CommonPrefix) => (
        <p
          key={prefix.Prefix}
          data-prefix={prefix.Prefix}
          className="text-2xl p-2 cursor-pointer"
        >
          {prefix.Prefix}
        </p>
      ))}
    </div>
  );
};
