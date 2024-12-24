import React, { useState, useRef } from "react";
import type { MouseEvent, KeyboardEvent, SetStateAction } from "react";
import { GetCoords, extractMention, generateId } from "@app/utils/client";

type MentionProp = {
  symbol: string;
  cssClass?: string;
  data: any[];
  field: string;
  onChange?: (data: any) => void;
  limit?: number;
  requestFunc?: (data: any) => Promise<any>;
  renderContent?: (data: any) => any;
  onMentionChange?: (data: any) => void;
  textAreaProps?: {};
};

const Mention = ({
  symbol = "@",
  cssClass,
  data = [],
  field = "name",
  onChange,
  limit = 5,
  requestFunc,
  renderContent,
  onMentionChange,
  textAreaProps = {},
}: MentionProp) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [id] = useState("mention-" + generateId());
  const [lookupId] = useState("lookup-" + generateId());

  const [startAt, setStartAt] = useState<number>(-1);
  const [mentionSize, setMentionSize] = useState<number>(0);
  const [mentionList, setMentionList] = useState<any[]>([]);
  const [lookupStyles, setLookupStyles] = useState<{}>({});

  const peopleClass = "mention-li-nt";

  const setupLookup = () => {
    let { x, y } = GetCoords(textAreaRef.current);
    setLookupStyles({ position: "absolute", left: `${x}px`, top: `${y}px` });
  };

  const hideLookup = () => setMentionList([]);

  const insertNameIntoInput = (
    e: MouseEvent<HTMLLIElement>,
    dataField: string | any[]
  ) => {
    const textArea = textAreaRef.current;
    if (textArea) {
      const first = textArea.value.substring(0, startAt);
      const last = textArea.value.substring(
        startAt + mentionSize,
        textArea.value.length
      );
      const content = `${first}${dataField}${last}`;
      textArea.value = content;
      setMentionSize(dataField.length);
      textArea.focus();
      if (onChange) onChange(textArea.value);
      hideLookup();
    }
  };

  const updateMentionList = async () => {
    const textArea = textAreaRef.current;
    if (textArea !== null) {
      const mention = extractMention(textArea.value, startAt);

      try {
        if (requestFunc) {
          const reqData = await requestFunc(mention);
          if (reqData) setMentionList(reqData);
        } else {
          const filteredData = data
            .filter((d) => d[field].toLowerCase().includes(mention))
            .slice(0, limit);
          setMentionList(filteredData);
        }
      } catch (err) {
        console.error(err);
      }

      if (onMentionChange) onMentionChange(mention);
      if (onChange && textArea?.value) onChange(textArea.value);
    }
  };

  const handleKeyUp = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
    const { value, selectionStart: start } = evt.currentTarget;

    const character = value.substring(start - 1, start);

    if (onChange) onChange(value);

    if (character === symbol) {
      setStartAt(start);
      setupLookup();
      updateMentionList();
      setMentionSize(mentionSize + 1);
      return;
    }

    if (character === " " || value.trim() === "") {
      setStartAt(-1);
      hideLookup();
      return;
    }

    // if (startAt > -1) {
    //   updateMentionList();
    //   setMentionSize(mentionSize + 1);
    //   return;
    // }
  };

  return (
    <div
      id={lookupId}
      className={`mention-lookup-nt relative w-full ${cssClass}`}
    >
      <ul style={lookupStyles}>
        {mentionList.map((mention, i) => {
          return (
            <li
              key={i}
              className={peopleClass}
              onClick={(e: MouseEvent<HTMLLIElement>) =>
                insertNameIntoInput(e, mention[field])
              }
            >
              {renderContent ? (
                renderContent(mention)
              ) : (
                <div>
                  {symbol}
                  {mention[field]}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <textarea
        {...textAreaProps}
        id={id}
        wrap="off"
        ref={textAreaRef}
        onKeyUp={handleKeyUp}
        onClick={hideLookup}
      ></textarea>
    </div>
  );
};
export default Mention;
