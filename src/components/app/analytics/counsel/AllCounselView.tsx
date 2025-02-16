import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { GiSplash, GiWaves } from "react-icons/gi";
import { HiMiniPlus } from "react-icons/hi2";
import { useGetAllCounselQuery } from "@app/store/services/analyticsSlice";
import {
  ErrorView404,
  LoadingSpinner,
  LoadMoreBtn,
  Container,
  Navbar,
} from "@app/components/shared";
import { CounselResponseT } from "@app/types/analytics";
import { AppLayoutContext } from "@app/components/layout";
import { useRouter } from "next/router";
import { Head, Loader } from "@app/components/ui";

const AllCounselView = () => {
  const router = useRouter();
  const { setReferrer } = useContext(AppLayoutContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState<[] | CounselResponseT["counsels"]>([]); // Store accumulated data
  const { isError, isFetching, isLoading, data } = useGetAllCounselQuery({
    page: currentPage,
  });
  const searchRef = useRef<HTMLTextAreaElement | null>(null);

  // Update the accumulated data when new data is fetched
  useEffect(() => {
    setReferrer(router.asPath);

    if (data) {
      setAllData((prev) => Array.from(new Set([...prev, ...data.counsels]))); // Append new data
    }
  }, [data, router.asPath, setReferrer]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page number
  };

  if (isLoading) {
    // Early return for loading state
    return (
      <Fragment>
        <Head title={`Counsel - ${"List"}`} />
        <Navbar query={""} isTitle={false} />{" "}
        {/* Removed isTitle as it's always false*/}
        <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-screen">
          <Loader variant="classic" size={80} />
        </div>
      </Fragment>
    );
  }

  if (!data && isError) {
    // Simplified error check
    return (
      <Fragment>
        <Head title={`Counsel - ${"List"}`} />

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
      <Head title={`Counsel - ${"List"}`} />

      <Navbar query={""} isTitle />
      {allData && (
        <Container className="">
          <div className="flex py-6 w-full md:min-w-[980px]">
            <div className="flex-1 self-stretch grow">
              <div className="my-8">
                <h1 className="text-xx font-normal my-2">Counsel</h1>
                <h5 className="text-base text-[#9ea7b4] ">All counsel</h5>
                <div className="mt-8 grid max-lg:grid-rows-2 lg:grid-cols-2 lg:justify-center gap-5">
                  <div className="flex gap-[8px] items-center p-[10px] bg-gray-100 rounded-[5px] ">
                    <svg
                      width="16"
                      height="11"
                      viewBox="0 0 16 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.1299 2.23906H8.04152V3.81406H15.1299V2.23906ZM15.1299 5.38906H8.04152V6.96406H15.1299V5.38906ZM8.04152 0.664062H0.953125V2.23906H8.04152V0.664062ZM8.04152 3.81406H0.953125V5.38906H8.04152V3.81406ZM8.04152 6.96406H0.953125V8.53906H8.04152V6.96406ZM15.1299 8.53906H8.04152V10.1141H15.1299V8.53906Z"
                        fill="black"
                      />
                    </svg>

                    <span>Thread</span>
                    <HiMiniPlus className="ml-auto" />
                  </div>
                  <div className="flex gap-[8px] items-center p-[10px] bg-gray-100 rounded-[5px] ">
                    <GiSplash />
                    <span>Page</span>
                    <HiMiniPlus className="ml-auto" />
                  </div>
                </div>
              </div>
              <div className="mb-8 space-y-4">
                {allData?.map((counsel, index) => (
                  <div key={counsel.counsel_id} className="flex gap-3">
                    <span className="text-gray-500 mt-3 ">{index + 1}.</span>
                    <div className="border-b border-solid border-gray-200 space-y-3 pb-3 w-full">
                      <div className=" flex items-center gap-[8px] ">
                        <div className="relative rounded-full overflow-clip w-[40px] h-[40px] ">
                          <Image
                            className=""
                            style={{ objectFit: "cover" }}
                            fill
                            src={`/images/${"counsel_analytics_av.jpg"}`}
                            loading="lazy"
                            alt="judge counsel profile"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/analytics/counsels?counselId=${counsel.counsel_id}&counsel=${counsel.counsel_name}`}
                            className="text-base [1.125rem] font-normal leading- [28px] font-poppins"
                          >
                            {counsel.counsel_name}
                          </Link>
                          <h3 className="text-xs font-poppins font-normal text-lex-blue">
                            {counsel.law_firms}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-[#4C4D50] [#64645F]">
                        President of the Queen&apos;s Bench Division. Former
                        Lady Justice of Appeal. Specialist in Media Law and
                        Public Law. Education: Bristol University.
                      </p>
                    </div>
                  </div>
                ))}
                <LoadMoreBtn isFetching={isFetching} loadMore={loadMore} />
              </div>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default AllCounselView;
