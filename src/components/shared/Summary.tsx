import React, { Fragment, useState } from "react";
import { RiCloseLine, RiOpenaiFill } from "react-icons/ri";
import { CaretDown, CaretUp } from "../icons";
import SmallTextBtn from "./SmallBtn";
import { useQueryHandler } from "@app/hooks";
import { LuChevronUp, LuChevronDown } from "react-icons/lu";
import Markdown from "./Markdown";

{
  /* <div
                id="summary"
                ref={(el) => (sectionRefs.current[0] = el)}
                className="hidden p-4 bg-[#eaf0f2]/30 border w-full border-gray-200 rounded-lg  flex-col justify-start items-start min-h-[10rem] mb-8"
              >
                <div className="flex flex-col self-stretch   justify-start items-start mb-6">
                  <div className="flex flex-col my-3">
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        className="hidden"
                      >
                        <path
                          d="M12,22H5c-1.654,0-3-1.346-3-3V5c0-1.654,1.346-3,3-3h4.515c.163,0,.325,.008,.485,.023V7c0,1.654,1.346,3,3,3h5.813c.633,.017,1.142-.639,.969-1.248-.311-1.217-.945-2.329-1.833-3.217l-3.485-3.485c-1.322-1.322-3.08-2.05-4.95-2.05H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h7c.552,0,1-.448,1-1s-.448-1-1-1Zm0-19.341c.379,.218,.732,.488,1.05,.806l3.485,3.485c.314,.314,.583,.668,.803,1.05h-4.338c-.551,0-1-.449-1-1V2.659Zm11.707,19.634l-3.957-3.957,1.586-1.586c.39,.516,1.135,.703,1.621,.207,.391-.391,.391-1.023,0-1.414l-4.5-4.5c-.391-.391-1.023-.391-1.414,0s-.391,1.023,0,1.414l.056,.056-4.586,4.586-.056-.056c-.391-.391-1.023-.391-1.414,0s-.391,1.023,0,1.414l4.5,4.5c.195,.195,.451,.293,.707,.293,1.033,.006,1.335-1.367,.5-1.914l1.586-1.586,3.957,3.957c.904,.931,2.345-.511,1.414-1.414Zm-9.78-3.78l4.586-4.586,1.41,1.41-4.586,4.586-1.41-1.41ZM4,8c0-.552,.448-1,1-1h2c.552,0,1,.448,1,1s-.448,1-1,1h-2c-.552,0-1-.448-1-1Zm9,5H5c-.552,0-1-.448-1-1s.448-1,1-1H13c.552,0,1,.448,1,1s-.448,1-1,1Zm-5,2c.552,0,1,.448,1,1s-.448,1-1,1h-3c-.552,0-1-.448-1-1s.448-1,1-1h3Z"
                          stroke="#245b91"
                        />
                      </svg>
                      <span className="uppercase text-sm text-[#245b91] font-semibold">
                        Summary
                      </span>
                    </p>
                    <span className="text-xs">
                      Essential details and core rulings at a glance
                    </span>
                  </div>
                  <div className="my-1 border w-full border-gray-200 mb-3" />
                  {case_summary && <SummaryPreview text={case_summary} />}
                </div>
              </div> */
}

const SummaryView = ({
  content,
  context,
}: {
  content: string;
  context: string;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const toogleShow = () => setShow(!show);

  console.log(content.split(context).length);

  return (
    <Fragment>
      <div className="summary">
        <div className={`preview `}>
          <p className={`text ${show ? "full" : "short"}`}>
            {[
              ...content.split(context).slice(0, 1),
              context,
              ...content.split(context).slice(1),
            ].map((group) => {
              return (
                <span
                  className={` ${group === context ? "bg-[#FFE89E]" : ""} px-1`}
                  key={group}
                >
                  {group}
                </span>
              );
            })}
          </p>
          {/* {content.length > 24 && (
            <span onClick={toogleShow}>{show ? "collapse" : "See more"}</span>
          )} */}
        </div>
      </div>
    </Fragment>
  );
};

export const SummaryComponent = ({
  summary,
  isCollapsible = false,
  toogler,
  isCollapsed,
}: {
  summary?: string | React.ReactNode;
  isCollapsible: boolean;
  toogler?: () => void;
  isCollapsed?: boolean;
}) => {
  const { close, searchParams } = useQueryHandler();
  // const [showCaseSummary, setShowCaseSummary] = useState(index);

  const defaultSummary = ` A final decision is one that leaves nothing to be judicially determined
        or ascertained thereafter, in order to render it effective and capable
        of execution, and is absolute, complete, and certain.`;

  return (
    <div className="mt-[30px] bg-[#eaf0f2]/30 rounded-lg px-4 py-3 relative">
      <div className="flex justify-between">
        <h4 className="text-sm font-medium">Summary</h4>
        {isCollapsible ? (
          <>
            {isCollapsed ? (
              // <RiCloseLine
              //   onClick={() => {
              //     toogler ? toogler() : close("showCaseSummary", undefined);
              //   }}
              //   className="text-pink-600 ml-auto cursor-pointer"
              //   size={19}
              // />
              <button
                title=""
                className="text-primary ml-auto cursor-pointer text-sm font-normal"
                onClick={() => {
                  toogler ? toogler() : close("showCaseSummary", undefined);
                }}
                // size={19}
              >
                Collapse
              </button>
            ) : (
              <button
                title=""
                className="text-primary ml-auto cursor-pointer text-sm font-normal"
                onClick={() => {
                  // check this logic LiaTerminalSolid, the arguement passed to it
                  toogler ? toogler() : close("showCaseSummary", "true");
                }}
                // size={19}
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <RiCloseLine
            onClick={() => {
              toogler ? toogler() : close("showCaseSummary", undefined);
            }}
            className="text-pink-600 ml-auto cursor-pointer"
            size={19}
          />
        )}
      </div>
      <hr className="mt-2 mb-5" />
      <span className="text-sm font-poppins text-lexblue flex-wrap text-justify block">
        {summary ?? defaultSummary}
      </span>
      {/* {!isCollapsed && (
        <div className="w-full absolute bottom-0 h-[52px] bg-[linear-gradient(transparent_0px,rgba(255,255,255,0.9)_52px,#fff_80px)]"></div>
      )} */}
      <div className=" hidden gap-5 items-center py-5">
        <SmallTextBtn
          smallBtnData={["Judgement"]}
          divStyle=""
          btnStyle="border-white font-light bg-primary  px-3 py-1 text-white/80"
        />
        {/* <SmallTextBtn
          smallBtnData={["Precedent analytics"]}
          divStyle=""
          btnStyle="border-white font-light bg-primary  px-3 py-1 text-white/80"
        /> */}
      </div>
    </div>
  );
};

// export const SummaryPreview = ({ text }: { text: string }) => {
//   const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
//   const isShow = text.length > 100 ? true : false;

//   return (
//     <div className={`summary preview pb-5 relative overflow-y -hidden`}>
//       <p
//         className={`text overflow-hidden transition-all duration-500 ${
//           isShow && isCollapsed ? "h-[5rem]" : "h-auto"
//         }`}
//       >
//         {text
//           .trim()
//           .split("\n")
//           .map((txt, _key) => (
//             <Fragment key={_key}>
//               <span
//                 className={`text-black/80 text-sm leading-6
//                           font-normal whitespace-pre-wrap mb-2
//                          `}
//                 dangerouslySetInnerHTML={{ __html: txt.trim() }}
//               />
//             </Fragment>
//           ))}
//       </p>
//       {isShow && (
//         <div
//           className={`text-end pt-6 pb-4 ${
//             isCollapsed
//               ? "inline-flex items-end blurred justify-center absolute z-50 transition duration-75 bottom-0  h-[65px] w-full"
//               : ""
//           }`}
//         >
//           <span
//             role="button"
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className={`inline-flex gap-2 items-center text-sm transition-all px-3 py-1.5 rounded ${
//               isCollapsed
//                 ? "bg-neutral-200/80 hover:bg-neutral-200"
//                 : "bg-neutral-200 hover:bg-neutral-200/50"
//             }`}
//           >
//             {isCollapsed && (
//               <Fragment>
//                 Expand <CaretDown />
//               </Fragment>
//             )}
//             {!isCollapsed && (
//               <Fragment>
//                 Collapse <CaretUp />
//               </Fragment>
//             )}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

export const PreviewCard = ({ content }: { content?: string }) => {
  // const [isExpanded, setIsExpanded] = useState(false);

  // const toggleExpand = () => {
  //   setIsExpanded(!isExpanded);
  // };

  return content ? (
    <div className="bg-transparent pb-4 shadow-sm">
      <div>
        <div
          className={`relative text-sm text-[#4C4D50] font-rubik leading-6
            `}
        >
          {/* ${!isExpanded ? "max-h-[4.5rem] overflow-hidden" : ""} */}
          <Markdown
            content={content}
            className="wrapper text-wrap overflow-x-hidden"
          />
          {/* {!isExpanded && ( */}
          <div className="absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-white to-transparent"></div>
          {/* )} */}
        </div>

        {/* <button
          onClick={toggleExpand}
          className="mt-2 flex items-center justify-center w-full text-xs font-medium text-blue-600 hover:text-blue-800"
        >
          {isExpanded ? (
            <>
              <span>Show less</span>
              <LuChevronUp size={16} className="ml-1" />
            </>
          ) : (
            <>
              <span>Show more</span>
              <LuChevronDown size={16} className="ml-1" />
            </>
          )}
        </button> */}
      </div>
    </div>
  ) : (
    <div className="flex h-16 items-center justify-center rounded-md bg-gray-50 text-sm text-[#4C4D50] font-['Rubik']">
      No decision history available for this case
    </div>
  );
};
