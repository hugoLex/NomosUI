import React, { Fragment, useState } from "react";
import { IoPeople } from "react-icons/io5";
import { HiMiniListBullet, HiPlus } from "react-icons/hi2";
import * as Accordion from "@radix-ui/react-accordion";

import { DocumentInfo } from "@app/components/icons";
import { useScrollspy } from "@app/hooks/useScrollspyHook";
import { TCaseDocument } from "@app/types";

type ContentOutline = "Judicial Panel" | "Decision history";
// | "judgement"
// | "ratio";

const { Root, Header, Trigger, Item } = Accordion;

const contentOutline: ContentOutline[] = [
  "Judicial Panel",
  "Decision history",
  // "judgement",
  // "ratio",
];

const actions = ["Main Issues", "Issue for Cause of Action", "Ratio Decidendi"];
const cases = ["By Subject Matter", "By Ratio Decidendi"];

const CaseDetailsSidebarView = (props: {
  sections: any;
  activeSection: any;
  caseDocument: TCaseDocument | null;
  scrollToSection: any;
}) => {
  const { sections, activeSection, caseDocument, scrollToSection } = props;
  const [tab, setTab] = useState<ContentOutline>("Judicial Panel");

  return (
    <Fragment>
      {caseDocument && (
        <Fragment>
          <div className="hidden">
            <h5 className="flex items-center gap-4 text-base font-normal font-rubik">
              <HiMiniListBullet size={24} className="" />
              Content Outline
            </h5>
            <nav className="py-2 pr-2 shrink-0">
              <ul className="space-y-2 bg-gray -100 border-gray-200 border-solid border-l-2">
                {sections.map((section: { id: any; label: string }) => (
                  <li
                    className={`relative ${
                      activeSection === section.id
                        ? "border-spacing-x-48 before:absolute before:left-[-2px] before:h-[40px] before:w-[2px] before:bg-primary "
                        : null
                    }  `}
                    key={section.id}
                  >
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-2 py-2 rounded transition-colors ${
                        activeSection === section.id
                          ? "text-primary"
                          : " hover:text-primary text-black/50"
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            {contentOutline.map((item) => (
              <div key={item} className="flex flex-col  gap-1">
                <span
                  role="button"
                  // className="flex items-center "

                  className={`flex justify-between items-center capitalize border border-gray-200 border-solid my-2 px-[20px] py-[8px] text-start text-[14px] rounded-md gap-2  text-black/80 hover:bg-neutral-200/50 ${
                    tab === item ? "font-black text-[#245b91]" : ""
                  }`}
                  onClick={() => {
                    setTab(item);
                    scrollToSection(item);
                    // router.push(
                    //   `${pathname}?${urlSearchParamsString}#${item}`
                    //   // `/${pathname}?${createQueryString("section", item)}#${item}`
                    // );
                  }}
                >
                  {/* the icons on the buttons differ hence the logic  */}
                  {item} {item === "Judicial Panel" ? <IoPeople /> : <HiPlus />}
                </span>
                {item == "Judicial Panel" && tab == "Judicial Panel" ? (
                  // <SmallTextBtn
                  //   smallBtnData={
                  //     caseDetail.judge_names.length > 0
                  //       ? caseDetail.judge_names
                  //       : ["Chibuike Ewenike", "Wendy Osuji"]
                  //   }
                  //   divStyle=""
                  //   btnStyle="text-[#008E00] bg-[#008E00]/10 text-xs px-3 py-1 rounded mt-2"
                  // />
                  <div className="flex items-center gap-2 flex-wrap">
                    {caseDocument.judges &&
                      caseDocument.judges.length > 0 &&
                      caseDocument.judges.map(({ id, name }) => (
                        <button
                          type="button"
                          className={` text-[#008E00] bg-[#008E00]/10 text-xs px-3 py-1 rounded"`}
                          key={id}
                        >
                          {name}
                        </button>
                      ))}
                  </div>
                ) : item == "Decision history" && tab == "Decision history" ? (
                  <Fragment>
                    {caseDocument.decision_history !== null && (
                      <p className="text-[10px] pl-[20px] text-[rgb(0,0,0,0.8)] leading-[14px]">
                        {caseDocument.decision_history}
                      </p>
                    )}
                  </Fragment>
                ) : (
                  <Fragment />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4 text-dark-2">
            <h4 className="flex items-center gap-4 text-base font-semibold font-rubik ">
              <DocumentInfo />
              Document Info
            </h4>

            <div className="space-y-6">
              <div>
                <h5 className="text-base font-medium text-inherit">
                  Decision History
                </h5>
                <p className="text-sm">{caseDocument.decision_history}</p>
              </div>

              <div>
                <h5 className="text-base font-medium text-inherit">Judges</h5>
                <ul className="text-inherit text-sm">
                  {caseDocument.judges.map(({ id, name }) => (
                    <li key={id}>{name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-base font-medium text-inherit">Actions</h5>
              </div>

              <div>
                {/* <Root></Root> */}
                <h5 className="text-base font-medium text-inherit">
                  Similar cases
                </h5>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CaseDetailsSidebarView;
