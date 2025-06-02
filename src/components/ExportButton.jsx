function ExportButton({ flashcards }) {
    const handleExport = () => {
      const csv = flashcards.map(card =>
        `"${card.question.replace(/"/g, '""')}","${card.answer.replace(/"/g, '""')}"`
      );
      const blob = new Blob([`Question,Answer\n${csv.join('\n')}`], {
        type: 'text/csv',
      });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'flashcards.csv';
      a.click();
      URL.revokeObjectURL(url);
    };
  
    return (
      <button
        onClick={handleExport}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Export to CSV
      </button>
    );
  }
  
  export default ExportButton;
  