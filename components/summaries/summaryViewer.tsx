export default function SummaryViewer({ summary } : { summary: string }) {
  if (!summary) {
    return <div>No summary available</div>;
  }

  return (
    <div>
      <p>{summary}</p>
    </div>
  );
}
