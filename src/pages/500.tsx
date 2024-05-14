import React from "react";
import Image from "next/image";
import { Layout, View, Button } from "@app/components/ui";
import { RigthArrowIcon } from "@app/components/icons";

import cloud from "../../public/cloud.svg";

const Page = () => {
  return (
    <Layout>
      <View>
        <section>
          <div>
            <h2>Opps!</h2>
            <p>An unknown error occurred. Please reload or check back later.</p>
            <Button label="Back to home page" icon={<RigthArrowIcon />} />
          </div>
          <div>
            <Image src={cloud} alt="Cloud" />
          </div>
        </section>
      </View>
    </Layout>
  );
};

export default Page;
