import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import useS3Files from "../hooks/s3/useS3Objects";

const S3FileList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Log changes to location for debugging purposes
  useEffect(() => {
    console.log("Location changed, new pathname:", location.pathname);
    console.log("Location state:", location.state);
  }, [location]);

  // Use location.pathname or state to update the prefix
  let prefix = location.state?.prefix || location.pathname.slice(1);
  if (!prefix) {
    prefix = ""; // Default to an empty string if no prefix is found
  }

  const pageSize = 10; // Number of files per page

  // State for controlling the current page and pagination token
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startAfter, setStartAfter] = useState<string | undefined>(undefined); // For pagination
  const [prevStarts, setPrevStarts] = useState<string[]>([]); // For storing previous startAfter keys

  // Fetch S3 files based on the prefix
  const { files, loading, error, totalFiles } = useS3Files(
    "osm-planet-us-west-2",
    prefix,
    pageSize,
    startAfter
  );

  const totalPages = Math.ceil(totalFiles / pageSize);

  // Handle list item click for folder navigation or file download
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLUListElement>) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const listItem = target.closest("li");

      if (!listItem || !listItem.textContent) return;

      if (listItem.textContent.endsWith("/")) {
        // Handle folder navigation
        const newPrefix = listItem.textContent;
        navigate(`${newPrefix}`, { state: { prefix: newPrefix } });
      } else {
        // Handle file download
        window.open(
          `https://osm-planet-us-west-2.s3.us-west-2.amazonaws.com/${listItem.textContent}`,
          "_blank"
        );
      }
    },
    [navigate] // `navigate` is stable and won't change
  );

  // Handle going to the next page
  const handleNextPage = () => {
    console.log("startAfter:", files[files.length - 1].Key);
    setCurrentPage((prevPage) => prevPage + 1);
    setPrevStarts((prevStarts) => [...prevStarts, startAfter || ""]); // Add current startAfter to prevStarts
    setStartAfter(files[files.length - 1].Key); // Set startAfter to the last file's key
  };

  // Handle going to the previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    const previousStart = prevStarts[prevStarts.length - 1];
    setStartAfter(previousStart); // Set startAfter to the previous page's startAfter
    setPrevStarts((prevStarts) => prevStarts.slice(0, -1)); // Remove the last item from prevStarts
    console.log("Going to previous page:", currentPage - 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul onClick={handleClick} className="w-full">
        {files.length > 0 ? (
          files.map((file, index) => (
            <li key={`${file.Key}-${index}`}>{file.Key}</li>
          ))
        ) : (
          <p>No files found.</p>
        )}
      </ul>

      <span>
        {totalPages > 1 ? `Page ${currentPage} of ${totalPages}` : ""}
      </span>

      <div style={{ display: "flex", gap: "1em" }}>
        <button onClick={handlePreviousPage}>Previous</button>

        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default S3FileList;
