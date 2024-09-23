import { useState, useEffect, useCallback, useMemo } from "react";
import { S3Client, ListObjectsV2Command, _Object } from "@aws-sdk/client-s3";

interface UseS3FilesResult {
  files: _Object[];
  loading: boolean;
  error: Error | null;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalFiles: number;
}

const useS3Files = (
  bucketName: string,
  prefix: string = "",
  pageSize: number = 10,
  startAfter: string | undefined
): UseS3FilesResult => {
  const [files, setFiles] = useState<_Object[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalFiles, setTotalFiles] = useState<number>(0);

  const s3Client = useMemo(
    () =>
      new S3Client({
        region: "us-west-2",
        credentials: {
          accessKeyId: "", // Replace with your AWS access key ID
          secretAccessKey: "", // Replace with your AWS secret access key
        },
        signer: {
          sign: async (request) => request,
        },
      }),
    []
  );

  // Fetch the files for the current page
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    let fetchedFiles: _Object[] = [];

    try {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix ? prefix.replace("react-s3/", "") : "", // Use the prefix to navigate directories
        Delimiter: "/", // Folder separator
        StartAfter: startAfter, // Token for fetching the next page
        MaxKeys: pageSize,
      });

      const { Contents, IsTruncated, CommonPrefixes, KeyCount } =
        await s3Client.send(command);

      // Add files (objects without folder-like paths)
      if (Contents) {
        fetchedFiles.push(...Contents);
      }

      // Add folders as pseudo-objects
      if (CommonPrefixes) {
        CommonPrefixes.forEach((prefix: any) => {
          fetchedFiles.push({
            Key: prefix.Prefix, // Use Prefix as the pseudo-object's Key
          } as _Object);
        });
      }

      // Replace the file list with the current page's files
      setFiles(fetchedFiles);

      // Update the StartAfter token for the next page
      // if (IsTruncated && Contents && Contents.length > 0) {
      //   const lastFileKey = Contents[Contents.length - 1].Key;
      //   setStartAfter(lastFileKey);
      // } else {
      //   setStartAfter(undefined); // No more pages
      // }

      setTotalFiles(KeyCount || 0);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [bucketName, prefix, pageSize, startAfter, s3Client]);

  // Fetch files when prefix or current page changes
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { files, loading, error, currentPage, setCurrentPage, totalFiles };
};

export default useS3Files;
