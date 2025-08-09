export function extractAndWrapWords(text: string): React.JSX.Element[] {
  // Extract the marked content (the "quote" to highlight)
  const markMatch = text.match(/<mark>(.*?)<\/mark>/);
  if (!markMatch) {
    // No marked content, return all words as blue spans
    const words = text.split(/\s+/).filter((word) => word.trim());
    return words.map((word, index) => (
      <span key={`normal-${index}`} className="text-blue-500">
        {word}
      </span>
    ));
  }

  const markedContent = markMatch[1];

  // Split the text by the marked content
  const parts = text.split(`<mark>${markedContent}</mark>`);

  const result: React.JSX.Element[] = [];

  // Process first part (before marked content)
  if (parts[0]) {
    const beforeWords = parts[0].split(/(\s+)/).filter((word) => word);
    beforeWords.forEach((word, index) => {
      result.push(
        <span
          key={`before-${index}`}
          className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
        >
          {/* {" "} */}
          {word}
        </span>
      );
    });
  }

  // Process marked content (highlighted part)
  const markedWords = markedContent.split(/(\s+)/).filter((word) => word);
  // .filter((word) => word.trim());
  markedWords.forEach((word, index) => {
    result.push(
      <span
        key={`marked-${index}`}
        className="text-[1.1rem] text-lexblue bg-[#FFECBC] font-semibold  font-gilda_Display"
      >
        {/* {" "} */}
        {word}
      </span>
    );
  });

  // Process remaining content (after marked content)
  if (parts[1]) {
    const afterWords = parts[1].split(/(\s+)/).filter((word) => word);
    // const afterWords = parts[1].split(/\s+/).filter((word) => word.trim());
    afterWords.forEach((word, index) => {
      result.push(
        <span
          key={`after-${index}`}
          className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
        >
          {/* {" "} */}
          {word}
        </span>
      );
    });
  }

  return result;
}
