import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { S3FileList } from "../../src/pages/S3FileList";
import { useS3Objects } from "../../src/hooks/s3/useS3Objects";

jest.mock("../../src/hooks/s3/useS3Objects", () => ({
  useS3Objects: jest.fn(),
}));

describe("S3FileList", () => {
  it("renders folder and file components with data", () => {
    const mockData = {
      CommonPrefixes: [{ Prefix: "folder1/" }],
      Contents: [{ Key: "file1.txt" }],
    };

    useS3Objects.mockReturnValue(mockData);
    render(
      <MemoryRouter>
        <S3FileList />
      </MemoryRouter>
    );

    expect(screen.getByText("folder1")).toBeInTheDocument();
    expect(screen.getByText("file1.txt")).toBeInTheDocument();
  });
});
