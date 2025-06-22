import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";

const Markdown = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return (
    <Fragment>
      <div className={`markdown ${className ? className : ""}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Fragment>
  );
};

export default Markdown;
