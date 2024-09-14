import { ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";

/**
 * Represents a S3 Object.
 */
interface FileProps {
  data: Partial<ListObjectsV2CommandOutput>;
}

/**
 * Renders a list of S3 Objects.
 * @param data - The data to display.
 */
export const File = ({ data }: FileProps) => {
  return (
    <>
      {data.Contents && (
        // <div className="overflow-x-auto">
        //   <table className="table-auto w-full">
        //     <thead>
        //       <tr>
        //         <th className="py-2">Name</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {data.Contents?.map((object) => (
        //         <tr key={object.Key}>
        //           <td className="p-2">
        //             <a
        //               href={`https://osm-planet-us-west-2.s3.us-west-2.amazonaws.com/${object.Key}`}
        //               target="_blank"
        //               rel="noopener noreferrer"
        //               download={object.Key}
        //               className="p-2 hover:underline tn btn-primary"
        //             >
        //               {object.Key}
        //             </a>
        //           </td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
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
                      {object.Key}
                    </a>
                  </td>
                  <td className="p-2">{object.LastModified?.toISOString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
