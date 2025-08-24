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
import CaseSummaryForIndex from "@app/components/app/library/case/CaseSummary";

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
  // console.log("sases list page", data);

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
        <Navbar />
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
        <Navbar />
        <ErrorView404
          caption="No matching legal resources found"
          desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar />

      {data && (
        <Container>
          <div className={`py-8 w-full md:min-w-[980px]`}>
            <div className="grid grid-cols-12 gap-8">
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
              <div className="col-span-8">
                <h1 className="text-xx text-lexblue font-gilda_Display capitalize font-bold mb-2">
                  Library
                </h1>
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
                      },
                      idx: number
                    ) => (
                      <CaseSummaryForIndex
                        key={document_id}
                        area_of_law={area_of_law}
                        case_title={case_title}
                        case_summary={case_summary}
                        document_id={document_id}
                        court={court}
                        subject_matters={subject_matters}
                        year_decided={year_decided}
                        idx={idx}
                      />
                    )
                  )}
                </div>

                <div className="flex justify-center py-2.5">
                  <Button
                    disabled={isPageError}
                    label={`${isFetching ? "loading..." : "load more"}`}
                    onClick={loadMoreDocs}
                    className={`bg-lexblue text-white ${
                      isPageError ? "opacity-50 cursor-none" : "opacity-100"
                    }`}
                  />
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
