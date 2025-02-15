import React, { Fragment } from "react";
import Link from "next/link";
import { Navbar, Container } from "@app/components/shared";
import { Taxonomy } from "@app/types";

const TaxonomyView = ({ data }: { data: Taxonomy[] }) => {
  return (
    <Fragment>
      <Navbar query="" isTitle />
      <Container className="">
        <div className={`py-8 w-full md:min-w-[980px]`}>
          <div className="hiddenspace-y-3">
            {data.map(
              (
                { id, hierarchy_path, name, total_documents, type },
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

export default TaxonomyView;
