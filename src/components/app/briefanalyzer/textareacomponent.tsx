import React, { useEffect, useRef } from "react";

interface AutoResizingTextareaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}

const AutoResizingTextarea: React.FC<AutoResizingTextareaProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      //   console.log("height of text", textarea.scrollHeight);
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onInput={resizeTextarea}
      placeholder={placeholder}
      className={`text-gray-authinput w-full text-wrap outline-none focus:outline-none ${className}`}
    />
  );
};

export default AutoResizingTextarea;
