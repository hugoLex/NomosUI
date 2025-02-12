import React, { Fragment } from "react";
import { NextPageWithLayout } from "@app/types";
import { AppLayout } from "@app/components/layout";
import { Container, ErrorView404, Navbar } from "@app/components/shared";
import { Head, Loader } from "@app/components/ui";
import { useGetTaxonomyStructureQuery } from "@app/store/services/taxnomySlice";
import Link from "next/link";

type Taxonomy = {
  document_breakdown: string | null;
  hierarchy_path: string;
  id: number;
  level: number;
  name: string;
  parent_id: number;
  total_documents: number;
  type: string;
};

const Page: NextPageWithLayout = () => {
  const { data, isLoading, isError } = useGetTaxonomyStructureQuery({});

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
      <Container>
        <div className={`py-8 w-full md:min-w-[980px]`}>
          <div className="space-y-3">
            {data.map(
              (
                { id, hierarchy_path, name, total_documents, type }: Taxonomy,
                idx: number
              ) => (
                <div key={idx}>
                  <h5>
                    <Link
                      href={`/taxonomy/${id}`}
                      className="text-[#245b91] text-wrap"
                    >
                      {idx + 1}. {name}
                    </Link>
                  </h5>
                  <div>
                    <span>{hierarchy_path}: </span>
                    {/* <span>{type}</span> */}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

Page.getLayout = (page) => {
  return (
    <Fragment>
      <Head title={`Taxonomy`} />
      <AppLayout className="h-screen">{page}</AppLayout>
    </Fragment>
  );
};

export default Page;
