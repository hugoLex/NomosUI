import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Head, Loader } from "@app/components/ui";
import { AppLayout, AppLayoutContext } from "@app/components/layout";
import { useGetCasesQuery } from "@app/store/services/librarySlice";
import {
  ErrorView404,
  Container,
  Navbar,
  SummaryComponent,
} from "@app/components/shared";
import { FilterIcon2 } from "@app/components/icons";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@app/types";
import Link from "next/link";

type Case = {
  document_id: string;
  case_title: string;
  case_summary?: string;
  court: string;
  year_decided: number;
  area_of_law?: string[];
  subject_matters?: string[];
};

const Page: NextPageWithLayout = () => {
  const title = "List";
  const router = useRouter();
  const { setReferrer } = useContext(AppLayoutContext);

  const { page } = router.query;
  const { data, isError, isFetching, isLoading } = useGetCasesQuery({
    page,
  });

  const [cases, setCases] = useState<Case[]>([]);
  const [isPageError, setIsPageError] = useState<boolean>(false);

  useEffect(() => {
    setReferrer(router.asPath);

    if (data) {
      setCases((prev) => Array.from(new Set([...prev, ...data.cases])));
    }

    if (isError && Number(page) > 1) {
      setIsPageError(true);
    }

    return () => {};
  }, [data, page, isError, setReferrer, router.asPath]);

  const loadMoreDocs = () => {
    const pageNumber = page ? Number(page) + 1 : 2;
    router.push(
      {
        pathname: "/library/cases",
        query: {
          page: pageNumber,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  if (isLoading) {
    // Early return for loading state
    return (
      <Fragment>
        <Navbar query={""} isTitle />
        {/* Removed isTitle as it's always false*/}
        <div className="flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-[]">
          <Loader variant="classic" size={80} />
        </div>
      </Fragment>
    );
  }

  if (!data && isError) {
    // Simplified error check
    return (
      <Fragment>
        <Head title={`Cases - ${title}`} />
        <Navbar query={""} isTitle />
        <ErrorView404
          caption="No matching legal resources found"
          desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar query={""} isTitle />

      {data && (
        <Container>
          <div className={`py-8 w-full md:min-w-[980px]`}>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <h1 className="text-xx font-normal mb-2">Library</h1>
                <h5 className="text-base text-[#9ea7b4] mb-4">Cases</h5>
                <div className="space-y-4">
                  {cases.map(
                    (
                      {
                        area_of_law,

                        case_title,
                        case_summary,
                        document_id,
                        court,
                        subject_matters,
                        year_decided,
                      }: Case,
                      idx: number
                    ) => (
                      <div key={idx} className="space-y-2 mb-6">
                        <h5>
                          <Link
                            href={`/library/cases/${document_id}?title=${case_title}&tab=case`}
                            className="text-[#245b91]"
                          >
                            {idx + 1}. {case_title}
                          </Link>
                        </h5>
                        <div className="inline-flex gap-2">
                          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {court}
                          </span>
                          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {year_decided}
                          </span>
                        </div>

                        <p className="flex items-center  gap-2 text-xs flex-wrap my-3">
                          {area_of_law &&
                            area_of_law.map((atx, adx) => (
                              <span
                                key={adx}
                                title="Area of law"
                                className="text-[#008E00] bg-[#008E00]/10 px-3 py-1 rounded"
                              >
                                {atx}
                              </span>
                            ))}

                          {subject_matters &&
                            subject_matters.map((stx, sdx) => (
                              <span
                                key={sdx}
                                title="Subject matter"
                                className="bg-stone-100 text-teal-900  px-3 py-1 rounded"
                              >
                                {stx}
                              </span>
                            ))}
                        </p>

                        {case_summary && (
                          <SummaryComponent
                            summary={case_summary}
                            isCollapsible={false}
                          />
                        )}

                        {/* <p className="flex items-center  gap-2 text-xs flex-wrap my-3">
                          {area_of_law &&
                            area_of_law.map((atx, adx) => (
                              <span
                                key={adx}
                                title="Area of law"
                                className="text-[#008E00] bg-[#008E00]/10 px-3 py-1 rounded"
                              >
                                {atx}
                              </span>
                            ))}

                          {subject_matters &&
                            subject_matters.map((stx, sdx) => (
                              <span
                                key={sdx}
                                title="Subject matter"
                                className="bg-stone-100 text-teal-900  px-3 py-1 rounded"
                              >
                                {stx}
                              </span>
                            ))}
                        </p> */}
                      </div>
                    )
                  )}
                </div>

                <div className="flex justify-center py-2.5">
                  <Button
                    disabled={isPageError}
                    label={`${isFetching ? "loading..." : "load more"}`}
                    onClick={loadMoreDocs}
                    className={`primary ${
                      isPageError ? "opacity-50 cursor-none" : "opacity-100"
                    }`}
                  />
                </div>
              </div>
              <div className="col-span-4">
                <div className="sticky md:top-[68px]">
                  <div className="space-y-3">
                    <div className="inline-flex space-x-1">
                      <FilterIcon2 />
                      <h5>Filter</h5>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-[#eaf0f2] space-y-4 rounded-md">
                      <p className="text-sm">
                        Find cases by legal classification
                      </p>
                      <Button label="Coming soon" className="primary" />
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

Page.getLayout = (page) => (
  <Fragment>
    <Head title={`Cases - List`} />
    <AppLayout>{page}</AppLayout>;
  </Fragment>
);

export default Page;
