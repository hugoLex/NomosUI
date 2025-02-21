import React, { Fragment, useContext } from "react";
import { NextPageWithLayout, TaxonomyDocument } from "@app/types";
import { AppLayout, AppLayoutContext } from "@app/components/layout";
import { Container, ErrorView404, Navbar } from "@app/components/shared";
import { Head, Loader } from "@app/components/ui";
import { useRouter } from "next/router";
import { useGetTaxonomyDocumentQuery } from "@app/store/services/taxnomySlice";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { referrer } = useContext(AppLayoutContext);
  const query = router.query;
  const slug = query.slug ? query.slug : "";
  const taxonomyId = slug as string;

  const { data, isLoading, isError } = useGetTaxonomyDocumentQuery(taxonomyId);

  if (isLoading) {
    // Early return for loading state
    return (
      <Fragment>
        <Navbar query={""} isTitle isTitle2={false} />
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
        <Navbar query={""} isTitle isTitle2={false} />
        <ErrorView404
          caption="No matching legal resources found"
          desc="Check your search terms and try again, or explore our curated collection of legal resources to find what you need"
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar query={""} isTitle isTitle2={false} />
      <Container>
        <div className="space-y-4 py-8 min-w-[980px]">
          {data.documents.map(({ title }: TaxonomyDocument, idx: number) => (
            <div key={idx}>
              <h5>{title}</h5>
            </div>
          ))}
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
