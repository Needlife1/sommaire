export function SourceInfo({ fileName }: { fileName: string }) {
  return (
    <div className="summary-info">
      <p className="file-name">File: {fileName}</p>
    </div>
  );
}