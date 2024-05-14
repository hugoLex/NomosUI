import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";

const Markdown = ({ content }: { content: string }) => {
  return (
    <Fragment>
      <div className="markdown">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Fragment>
  );
};

export default Markdown;
