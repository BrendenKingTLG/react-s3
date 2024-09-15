import { useEffect, useState } from "react";
import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";

/**
 * Fetches a list of S3 objects.
 * @param bucket - The S3 bucket name.
 * @param prefix - The S3 prefix.
 */
export const useS3Objects = (bucket: string, prefix: string) => {
  const [data, setData] = useState<Partial<ListObjectsV2CommandOutput>>({});

  useEffect(() => {
    const client = new S3Client({
      region: "us-west-2",
      credentials: {
        accessKeyId: "",
        secretAccessKey: "",
      },
      signer: { sign: async (request) => request },
    });

    const fetchObjects = async () => {
      try {
        const command = new ListObjectsV2Command({
          Bucket: bucket,
          Prefix: prefix.replace("react-s3/", ""),
          Delimiter: "/",
        });
        const result = await client.send(command);
        setData(result);
        // localStorage.setItem("s3Prefix", prefix);
      } catch (error) {
        console.error("Error fetching S3 objects:", error);
      }
    };

    fetchObjects();
  }, [bucket, prefix]);

  return data;
};
