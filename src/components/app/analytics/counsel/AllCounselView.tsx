import React, {
  Fragment,
  RefObject,
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
import {
  SearchBox,
  SearchBoxRef,
} from "@app/components/shared/SearchBoxLegalAnalysis";
import { skipToken } from "@reduxjs/toolkit/query";
import useQueryToggler from "@app/hooks/useQueryHandler";
import { DashboardSkeletonLoader } from "@app/components/shared/DashboardSkeletonLoader";
import { extractAndWrapWords } from "../judegCounselmark";

type CounselFilterProps = {
  openFilter: boolean;
  // onFilter: (filters: CounselFilterState) => void;
  filters: CounselFilterState;
  setFilters: React.Dispatch<React.SetStateAction<CounselFilterState>>;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  queryString: string;
};

type CounselFilterState = {
  query?: string;
  case_title?: string;
  law_firm?: string;
  specialization?: string;
  page: number;
  limit?: number;
};

const CounselFilter: React.FC<CounselFilterProps> = ({
  // onFilter,
  openFilter,
  filters,
  setFilters,
  setOpenFilter,
  queryString,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === "page" || name === "limit" ? Number(value) : value,
    }));
  };
  const { UpdateUrlParams, router } = useQueryToggler();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onFilter(filters);
    router.push(`/analytics/counsels?${queryString}`);
    // UpdateUrlParams("", queryString);
    setOpenFilter((openFilter) => !openFilter);
  };

  const ref: RefObject<HTMLFormElement> = useRef(null);

  useEffect(() => {
    // console.log("Counsel filter component mounted");

    if (!openFilter) return; // If filter is not open, do nothing

    // Add a small delay to prevent immediate closure when opening
    const timeoutId = setTimeout(() => {
      function handleClickOutside(event: MouseEvent) {
        // console.log("Clicked outside the component", openFilter);

        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpenFilter(false);
        }
      }

      document.addEventListener("click", handleClickOutside);

      // Store the cleanup function in a way we can access it
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, 100); // Small delay to allow the component to render

    return () => {
      clearTimeout(timeoutId);
    };
  }, [openFilter, setOpenFilter]);

  return (
    // <div ref={ref}>
    <form
      ref={ref}
      onSubmit={handleSubmit}
      // onMouseLeave={() => {
      //   setOpenFilter(false);
      // }}
      className={` ${
        openFilter ? null : "hidden"
      } grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow rounded-xl`}
    >
      <input
        type="text"
        name="query"
        value={filters.query}
        onChange={handleChange}
        placeholder="🔍 e.g. maritime law expert"
        className="border rounded px-3 py-2 w-full"
      />

      <input
        type="text"
        name="case_title"
        value={filters.case_title}
        onChange={handleChange}
        placeholder="Filter by case title"
        className="border rounded px-3 py-2 w-full"
      />

      <input
        type="text"
        name="law_firm"
        value={filters.law_firm}
        onChange={handleChange}
        placeholder="Filter by law firm"
        className="border rounded px-3 py-2 w-full"
      />

      <input
        type="text"
        name="specialization"
        value={filters.specialization}
        onChange={handleChange}
        placeholder="Filter by specialization"
        className="border rounded px-3 py-2 w-full"
      />

      <div className="flex items-center gap-2">
        <label htmlFor="page" className="text-sm">
          Page
        </label>
        <input
          type="number"
          name="page"
          // min={1}
          value={filters.page}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-20"
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="text-sm">
          Limit
        </label>
        <input
          type="number"
          name="limit"
          min={1}
          max={100}
          value={filters.limit}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-20"
        />
      </div>

      <button
        type="submit"
        className="md:col-span-2 bg-lexblue text-white px-4 py-2 rounded hover:bg-lexblue/60 transition"
      >
        Apply Filters
      </button>
    </form>
    // </div>
  );
};

const AllCounselView = () => {
  const router = useRouter();
  const { setReferrer } = useContext(AppLayoutContext);
  const { UpdateUrlParams, searchParams } = useQueryToggler();
  // const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  // const [allData, setAllData] = useState<[] | CounselResponseT["counsels"]>([]); // Store accumulated data
  const [filters, setFilters] = useState<CounselFilterState>({
    query: "",
    case_title: "",
    law_firm: "",
    specialization: "",
    page: 1,
    limit: 10,
  });
  const newQuery = searchParams.get("name");
  const newspecialization = searchParams.get("specialization");
  const compiledQuery = `query=${filters.query}&case_title=${filters.case_title}&law_firm=${filters.law_firm}&specialization=${filters.specialization}&page=${filters.page}&limit=${filters.limit}`;

  //  if the filter is open don't make a request, if closed or not display trigger the request
  const { isError, isFetching, isLoading, data } = useGetAllCounselQuery(
    !openFilter
      ? {
          params: compiledQuery,
        }
      : skipToken
  );

  const counselSearchRef = useRef<SearchBoxRef | null>(null);
  useEffect(() => {
    if (newQuery) {
      setFilters((prev) => ({ ...prev, query: newQuery }));
    }
    if (newspecialization) {
      setFilters((prev) => ({ ...prev, specialization: newspecialization }));
    }
  }, [newQuery, newspecialization]);
  // Update the accumulated data when new data is fetched
  useEffect(() => {
    setReferrer(router.asPath);

    // console.log("counsels fetched from all counsels", data);
    // console.log("counsels fetched from all counsels", JSON.stringify(data));
  }, [router.asPath, setReferrer]);
  // }, [data, router.asPath, setReferrer]);

  const loadMore = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    // setCurrentPage((prevPage) => prevPage + 1); // Increment page number
  };

  if (isLoading) {
    // Early return for loading state
    return (
      <Fragment>
        <Head title={`Counsel - ${"List"}`} />
        <Navbar />
        <div className=" flex-1 flex flex-col justify-center items-center py-6 w-full md:max-w-[772px] mx-auto">
          <DashboardSkeletonLoader />
          {/* <Loader variant="classic" size={80} /> */}
        </div>
      </Fragment>
    );
  }

  if (!data && isError) {
    // Simplified error check
    return (
      <Fragment>
        <Head title={`Counsel - ${"List"}`} />

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
      <Head title={`Counsel - ${"List"}`} />

      <Navbar />
      {data && (
        <Container className="">
          <div className="flex py-6 w-full md:max-w-[772px] mx-auto">
            <div className="flex-1 self-stretch grow">
              <div className="my-8">
                <h1 className="text-xx text-lexblue font-gilda_Display font-bold my-2">
                  Counsel index
                </h1>
                <h5 className="text-base text-[#9ea7b4] ">All counsel</h5>
                <SearchBox
                  practitionerType={"counsel"}
                  isFetchingCounsels={isFetching}
                  innerRef={counselSearchRef}
                />
                {openFilter && (
                  <CounselFilter
                    // onFilter={() => {}}
                    openFilter={openFilter}
                    filters={filters}
                    setFilters={setFilters}
                    setOpenFilter={setOpenFilter}
                    queryString={compiledQuery}
                  />
                )}
                <div className="mt-8 grid max-lg:grid-rows-2 lg:grid-cols-2 lg:justify-center gap-5">
                  <div
                    onClick={() => {
                      setOpenFilter(!openFilter);
                    }}
                    className="cursor-pointer flex gap-[8px] items-center p-[10px] bg-gray-100 rounded-[5px] "
                  >
                    <div className="relative  w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                      <Image
                        width={16}
                        height={16}
                        src={`/images/icons/${"filter-vertical-stroke-rounded.svg"}`}
                        alt={"analytics-02-stroke-rounded"}
                      />
                    </div>

                    {/* <svg
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
                    </svg> */}

                    <span>Filter</span>
                    {/* <HiMiniPlus className="ml-auto" /> */}
                  </div>
                  <div
                    onClick={() => {
                      setFilters({
                        query: "",
                        case_title: "",
                        law_firm: "",
                        specialization: "",
                        page: 1,
                        limit: 10,
                      });
                      setOpenFilter(false);
                    }}
                    className="flex cursor-pointer gap-[8px] items-center p-[10px] bg-gray-100 rounded-[5px] "
                  >
                    <Image
                      width={16}
                      height={16}
                      src={`/images/icons/${"circle-arrow-reload-02-stroke-rounded.svg"}`}
                      alt={"analytics-02-stroke-rounded"}
                    />
                    {/* <GiSplash /> */}
                    <span>Reset</span>
                    {/* <HiMiniPlus className="ml-auto" /> */}
                  </div>
                </div>
              </div>
              <div className="mb-8 space-y-4">
                {data?.results?.map((counsel, index) => (
                  <div
                    key={`${counsel.counsel_id}-${index}-key`}
                    className="flex gap-3"
                  >
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
                            className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
                          >
                            {newQuery != "a" &&
                            counsel?.match_context?.field == "name"
                              ? extractAndWrapWords(
                                  counsel?.match_context?.highlight
                                )
                              : counsel?.counsel_canonical_name}
                            {counsel.counsel_name}
                          </Link>
                          <h3 className="text-xs font-poppins font-normal text-lex-blue">
                            {counsel.law_firms}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-lexblue [#64645F] font-poppins">
                        President of the Queen&apos;s Bench Division. Former
                        Lady Justice of Appeal. Specialist in Media Law and
                        Public Law. Education: Bristol University.
                      </p>
                    </div>
                  </div>
                ))}
                <LoadMoreBtn
                  className="min-w-[109.67px] mx-auto"
                  isFetching={isFetching}
                  loadMore={loadMore}
                />
              </div>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
};

export default AllCounselView;
