import React, { Fragment, useContext, useEffect, useState } from "react";
import { Button, Head, Loader } from "@app/components/ui";
import { AppLayout, AppLayoutContext } from "@app/components/layout";
import { useGetArticlesQuery } from "@app/store/services/librarySlice";
import {
  Container,
  ErrorView404,
  Navbar,
  NavbarTitle,
} from "@app/components/shared";
import { FilterIcon2, FilterIcon3 } from "@app/components/icons";
import { useRouter } from "next/router";
import {
  NextPageWithLayout,
  SearchResultDocumentMetaDocType,
} from "@app/types";
import Link from "next/link";

type Article = {
  article_title: string;
  date_published: string;
  document_id: string;
  document_type?: SearchResultDocumentMetaDocType;
  primary_domain: string;
  publisher: string;
  secondary_domains: string[];
  specific_legal_concepts: string[];
  year: number;
};

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { setReferrer } = useContext(AppLayoutContext);

  const { page } = router.query;
  const [articles, setArticles] = useState<Article[]>([]);
  const { data, isError, isFetching, isLoading } = useGetArticlesQuery({
    page,
  });

  useEffect(() => {
    setReferrer(router.asPath);

    if (data) {
      setArticles((prev) => Array.from(new Set([...prev, ...data.articles])));
    }
    return () => {};
  }, [data, router.asPath, setReferrer]);

  const loadMoreDocs = () => {
    const pageNumber = page ? Number(page) + 1 : 2;
    router.push(
      {
        pathname: "/library/articles",
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
            <div className="md:grid grid-cols-12 gap-8">
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
                <h1 className="text-xx font-normal mb-2">Library</h1>
                <h5 className="text-base text-[#9ea7b4] mb-4">Articles</h5>

                <div className="space-y-6">
                  {articles.map(
                    (
                      {
                        article_title,
                        document_id,
                        date_published,
                        primary_domain,
                        secondary_domains,
                        specific_legal_concepts,
                        year,
                      },
                      idx: number
                    ) => (
                      <div key={idx} className="space-y-2 mb-4">
                        <h5>
                          <Link
                            href={`/library/articles/${document_id}`}
                            className="text-[#245b91] text-wrap"
                          >
                            {idx + 1}. {article_title}
                          </Link>
                        </h5>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {year}
                          </span>
                          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {primary_domain}
                          </span>
                          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {date_published}
                          </span>
                          {/* <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {secondary_domain}
                          </span>
                          <span className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium">
                            {specific_legal_concept}
                          </span> */}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {secondary_domains.map((stx, sdx) => (
                            <span
                              key={sdx}
                              title="Secondary domain"
                              className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium"
                            >
                              {stx}
                            </span>
                          ))}
                          {specific_legal_concepts.map((slc, sdx) => (
                            <span
                              key={sdx}
                              title="Specific legal concept"
                              className="px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium"
                            >
                              {slc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="flex justify-center my-6">
                  <Button
                    label={`${isFetching ? "loading..." : "load more"}`}
                    onClick={loadMoreDocs}
                    className="primary"
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

Page.getLayout = (page) => {
  return (
    <Fragment>
      <Head title={"Articles - List"} />
      <AppLayout>{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
