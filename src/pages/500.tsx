import React, { Fragment } from "react";
import Image from "next/image";
import { View, Button, Head, Header } from "@app/components/ui";
import { RigthArrowIcon } from "@app/components/icons";

import cloud from "../../public/cloud.svg";

const Page = () => {
  return (
    <Fragment>
      <Head title="Not Found" />
      <Header />
      <View>
        <section>
          <div>
            <h2>Opps!</h2>
            <p>An unknown error occurred. Please reload or check back later.</p>
            <Button label="Back to home page" icon={<RigthArrowIcon />} />
          </div>
        </section>
      </View>
    </Fragment>
  );
};

export default Page;
