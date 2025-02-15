import React, { Fragment, useEffect, useState } from "react";
import { AppLayout } from "@app/components/layout";
import { ErrorView404, Navbar } from "@app/components/shared";
import { Head, Loader } from "@app/components/ui";
import {
  TaxonomyHybridView,
  TaxonomyView,
} from "@app/components/app/taxonomy/";
import { useGetTaxonomyStructureQuery } from "@app/store/services/taxnomySlice";
import { MappedTx, NextPageWithLayout, Taxonomy } from "@app/types";

const Page: NextPageWithLayout = () => {
  const [mappedTx, setMappedTx] = useState<MappedTx[]>([]);
  const { data, isLoading, isError } = useGetTaxonomyStructureQuery({});

  useEffect(() => {
    if (data) {
      const mapData = data as Taxonomy[];

      // const t = treatment.reduce((acc, value) => {
      //   acc[value.Label] = acc[value.Label] || [];
      //   acc[value.Label].push(value);
      //   return acc;
      // }, {});

      // for (let [key, value] of Object.entries(t)) {
      //   rel.push({ name: key, children: value });
      // }

      const mapSortedTx = mapData.reduce((acc, val) => {
        if (val.parent_id === null) {
          acc.push({ id: val.id, name: val.name, children: [val] });
          return acc;
        }

        acc.filter(({ id }) => id === val.parent_id)[0].children.push(val);

        return acc;
      }, [] as MappedTx[]);

      setMappedTx(mapSortedTx);
    }

    return () => {};
  }, [data]);

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

  return <TaxonomyHybridView data={mappedTx} />;
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
