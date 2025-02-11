import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Head, Loader } from "@app/components/ui";
import { AppLayout, AppLayoutContext } from "@app/components/layout";
import { useGetLegislationsQuery } from "@app/store/services/librarySlice";
import { Container, ErrorView404, Navbar } from "@app/components/shared";
import { FilterIcon2 } from "@app/components/icons";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@app/types";
import Link from "next/link";

type Legislation = {
  document_id: string;
  legislation_title: string;
  year_commenced: string | number;
  primary_domain: string;
  secondary_domain: string;
  specific_legal_concept: string;
};

const Page: NextPageWithLayout = () => {
  const title = "List";
  const router = useRouter();
  const { setReferrer } = useContext(AppLayoutContext);
  const { page } = router.query;
  const searchRef = useRef<HTMLTextAreaElement | null>(null);
  const [legislations, setLegislations] = useState<Legislation[]>([]);
  const [isPageError, setIsPageError] = useState<boolean>(false);

  const { data, isError, isFetching, isLoading } = useGetLegislationsQuery({
    page,
  });

  useEffect(() => {
    setReferrer(router.asPath);
    if (data) {
      setLegislations((prev) =>
        Array.from(new Set([...prev, ...data.legislation]))
      );
    }
    if (isError && Number(page) > 1) {
      setIsPageError(true);
    }

    return () => {};
  }, [data, page, isError]);

  const loadMoreDocs = () => {
    const pageNumber = page ? Number(page) + 1 : 2;
    router.push(
      {
        pathname: "/library/legislations",
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
      <Navbar query="" isTitle />
      {data && (
        <Container>
          <div className={`py-8 w-full md:min-w-[980px]`}>
            <div className=" md:grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <h1 className="text-xx font-normal mb-2">Library</h1>
                <h5 className="text-base text-[#9ea7b4] mb-4">
                  Laws & Legislation
                </h5>

                <div className="space-y-6">
                  {legislations.map(
                    (
                      {
                        document_id,
                        legislation_title,
                        year_commenced,
                        primary_domain,
                        secondary_domain,
                        specific_legal_concept,
                      },
                      idx: number
                    ) => (
                      <div key={idx} className="space-y-2 mb-4">
                        <h5>
                          <Link
                            href={`/library/legislations/${document_id}`}
                            className="text-[#245b91]"
                          >
                            {idx + 1}. {legislation_title}
                          </Link>
                        </h5>
                        <div className="inline-flex gap-2 flex-wrap">
                          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {primary_domain}
                          </span>
                          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {year_commenced}
                          </span>
                          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {secondary_domain}
                          </span>
                          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {specific_legal_concept}
                          </span>
                        </div>
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

Page.getLayout = (page) => {
  return (
    <Fragment>
      <Head title={"Legislations - List"} />
      <AppLayout>{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
