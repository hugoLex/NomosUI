// export function extractAndWrapWords(text: string): React.JSX.Element[] {
//   // Extract the marked content (the "quote" to highlight)
//   const markMatch = text.match(/<mark>(.*?)<\/mark>/);
//   const testText = "<mark>Paulyn</mark> <mark>Abulimen</mark>, Esq.";
//   const TestmarkMatch = text.match(/<mark>(.*?)<\/mark>/g);
//   // const TestmarkMatch = testText.match(/<mark>(.*?)<\/mark>/g);
//   if (!markMatch) {
//     // No marked content, return all words as blue spans
//     const words = text.split(/\s+/).filter((word) => word.trim());
//     return words.map((word, index) => (
//       <span key={`normal-${index}`} className="text-blue-500">
//         {word}
//       </span>
//     ));
//   }

//   const markedContent = markMatch[1];
//   let viewthiscomponet = [<span key={"test 1"}>Hi</span>];
//   if (TestmarkMatch) {
//     const escaped = TestmarkMatch.map(
//       (p) => `(${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`
//     ) // wrap in ()
//       .join("|");

//     // Join them into one regex pattern

//     const regex = new RegExp(escaped, "g");
//     const parts = text.split(
//       regex
//       // /(<mark>Paulyn<\/mark>)|(<mark>Abulimen<\/mark>)/g
//     );
//     // const parts = testText.split(regex);
//     // console.log("regex created", regex);
//     // console.log("regex escaped for special characters", escaped);
//     // console.log("markedContent", TestmarkMatch);
//     // console.log("parts", parts);
//     // console.log(
//     //   "parts ready for use",
//     //   parts.map((t) => {
//     //     if (!t) return;

//     //     return TestmarkMatch.includes(t) ? (
//     //       <span className="">{t}</span>
//     //     ) : (
//     //       <span>{t}</span>
//     //     );
//     //   })
//     // );
//     viewthiscomponet = parts
//       .filter((item) => item != undefined)
//       .map((t) => {
//         // if (!t) return;

//         return TestmarkMatch.includes(t) ? (
//           <span className="text-red-600">
//             {t.match(/(?<=<mark>).*?(?=<\/mark>)/)}
//           </span>
//         ) : (
//           <span>{t}</span>
//         );
//       });
//   }

//   // // Split the text by the marked content
//   // const parts = text.split(`<mark>${markedContent}</mark>`);

//   // const result: React.JSX.Element[] = [];

//   // // Process first part (before marked content)
//   // if (parts[0]) {
//   //   const beforeWords = parts[0].split(/(\s+)/).filter((word) => word);
//   //   beforeWords.forEach((word, index) => {
//   //     result.push(
//   //       <span
//   //         key={`before-${index}`}
//   //         className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
//   //       >
//   //         {/* {" "} */}
//   //         {word}
//   //       </span>
//   //     );
//   //   });
//   // }

//   // // Process marked content (highlighted part)
//   // const markedWords = markedContent.split(/(\s+)/).filter((word) => word);
//   // // .filter((word) => word.trim());
//   // markedWords.forEach((word, index) => {
//   //   result.push(
//   //     <span
//   //       key={`marked-${index}`}
//   //       className="text-[1.1rem] text-lexblue bg-[#FFECBC] font-semibold  font-gilda_Display"
//   //     >
//   //       {/* {" "} */}
//   //       {word}
//   //     </span>
//   //   );
//   // });

//   // // Process remaining content (after marked content)
//   // if (parts[1]) {
//   //   const afterWords = parts[1].split(/(\s+)/).filter((word) => word);
//   //   // const afterWords = parts[1].split(/\s+/).filter((word) => word.trim());
//   //   afterWords.forEach((word, index) => {
//   //     result.push(
//   //       <span
//   //         key={`after-${index}`}
//   //         className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
//   //       >
//   //         {/* {" "} */}
//   //         {word}
//   //       </span>
//   //     );
//   //   });
//   // }

//   return viewthiscomponet;
//   // return result;
// }

// export function extractAndWrapWords(text: string): React.JSX.Element[] {
//   // Extract the marked content (the "quote" to highlight)

//   const markMatch = text.match(/<mark>(.*?)<\/mark>/g);

//   if (!markMatch) {
//     // No marked content, return all words as blue spans
//     const words = text.split(/\s+/).filter((word) => word.trim());
//     return words.map((word, index) => (
//       <span
//         key={`normal-${index}`}
//         className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
//       >
//         {word}
//       </span>
//     ));
//   }

//   const escaped = markMatch
//     .map((p) => `(${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`) // wrap in ()
//     .join("|");

//   // Join them into one regex pattern

//   const regex = new RegExp(escaped, "g");
//   const parts = text.split(regex);

//   const result: React.JSX.Element[] = parts
//     .filter((item) => item != undefined)
//     .map((t) => {
//       return markMatch.includes(t) ? (
//         <span key={`key-mark-${t}`} className=" bg-[#FFECBC]">
//           {t.match(/(?<=<mark>).*?(?=<\/mark>)/)}
//         </span>
//       ) : (
//         <span className="" key={`key-mark-${t}`}>
//           {t}
//         </span>
//       );
//     });

//   return result;
// }
export function extractAndWrapWords(text: string): React.JSX.Element[] {
  // Regex to split text into marked and unmarked parts
  const regex = /(<mark>.*?<\/mark>)/g;
  const parts = text.split(regex).filter(Boolean); // removes empty strings

  return parts.map((part, index) => {
    if (part.startsWith("<mark>") && part.endsWith("</mark>")) {
      const inner = part.replace(/<\/?mark>/g, ""); // strip tags
      return (
        <span key={`mark-${index}`} className="bg-[#FFECBC]">
          {inner}
        </span>
      );
    }
    return (
      <span key={`normal-${index}`} className="">
        {part}
      </span>
    );
  });
}
