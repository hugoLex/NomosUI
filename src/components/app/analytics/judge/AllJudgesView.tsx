import React, {
  Fragment,
  Ref,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { GiSplash } from "react-icons/gi";
import {
  useGetAllJudgeQuery,
  useGetAllLegalAreasQuery,
} from "@app/store/services/analyticsSlice";
import {
  ErrorView404,
  LoadingSpinner,
  LoadMoreBtn,
  Container,
  Navbar,
  NavbarTitle,
} from "@app/components/shared";
import { AllJudgesListResponseT } from "@app/types/analytics";

import { HiMiniPlus } from "react-icons/hi2";
import { AppLayoutContext } from "@app/components/layout";
import { useRouter } from "next/router";
import { Head } from "@app/components/ui";
import { SearchBoxRef } from "@app/components/app/analytics/counsel/SearchBoxLegalAnalysis";
import { JudgeIndexSearchBox } from "./searchbox";
import useDebounce from "@app/hooks/useDebounce";
import { useSearchParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import useQueryToggler from "@app/hooks/useQueryHandler";
import { DashboardSkeletonLoader } from "@app/components/shared/DashboardSkeletonLoader";
import { extractAndWrapWords } from "../judegCounselmark";
import { DummyAllLegalAreas } from "@app/utils";
type TJudgeFilterState = {
  query?: string;
  // case_title?: string;
  legal_area?: string;
  stance?: string;
  page: number;
  limit?: number;
};
const AllJudgesView = () => {
  const ref = useRef<SearchBoxRef | null>(null);
  const { UpdateUrlParams, searchParams, removeQueryParam } = useQueryToggler();
  // console.log("state of ref", ref);
  const router = useRouter();
  const newQuery = useSearchParams().get("query");
  const field_type = useSearchParams().get("field_type");
  const legal_areaQ = useSearchParams().get("legal_area");
  const stanceQ = useSearchParams().get("stance");

  const { setReferrer } = useContext(AppLayoutContext);

  const [inputText, setInputText] = useState<string | null>(null);
  const [allData, setAllData] = useState<[] | AllJudgesListResponseT["judges"]>(
    []
  ); // Store accumulated data
  const searchTerm = useDebounce(inputText, 500); // Reduced debounce time for better UX
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<TJudgeFilterState>({
    query: "",
    // case_title: "",
    legal_area: "",
    stance: "",
    page: 1,
    limit: 10,
  });
  const compiledQuery = Object.entries(filters)
    .filter(
      ([key, value]) => value !== null && value !== undefined && value !== ""
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  // const compiledQuery = `query=${filters.query}&legal_area=${filters.legal_area}&stance=${filters.stance}&page=${filters.page}&limit=${filters.limit}`;

  const { isError, isFetching, isLoading, data, error } = useGetAllJudgeQuery(
    // searchTerm
    //   ? {
    //       params: `query=${searchTerm}`,
    //     }
    //   : {
    //       params: `query=${""}`,
    //     }
    !openFilter ? { params: compiledQuery } : skipToken
  );
  console.log("compiled query Data from judges", error, compiledQuery);
  // console.log("allLegalAreas Data from judges", allLegalAreas);
  // console.log("Data from judges", JSON.stringify(data && data.judges[0]));
  // Update the accumulated data when new data is fetched
  useEffect(() => {
    setReferrer(router.asPath);
    if (data) {
      setAllData((prev) => [...data.judges]); // Append new data
      // setAllData((prev) => Array.from(new Set([...prev, ...data.judges]))); // Append new data
    }
  }, [data, router.asPath, setReferrer]);
  const loadMore = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    router.push(`/analytics/judges?${compiledQuery}`);

    // setCurrentPage((prevPage) => prevPage + 1); // Increment page number
  };
  // useEffect(() => {
  //   if (field_type && newQuery) {
  //     console.log("field_type", field_type, "filter value", filters);
  //     setFilters((prev) => ({
  //       ...prev,
  //       [field_type]: newQuery || filters.query,
  //     }));
  //   }
  // }, [field_type]);
  // }, [newQuery,field_type]);
  useEffect(() => {
    const query = searchParams.get("name") || searchParams.get("query") || "";
    // const query = searchParams.get("query") || "";
    const legal_area = searchParams.get("legal_area") || "";
    const stance = searchParams.get("stance") || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    setFilters((prev) => ({ query, legal_area, stance, page, limit }));
  }, [searchParams]);

  if (isLoading) {
    // Early return for loading state
    return (
      <Fragment>
        <Navbar />
        {/* Removed isH1Visible as it's always false*/}
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
      {allData && (
        <Container className="">
          <div className="flex  py-4 w-full md:max-w-[772px] mx-auto">
            {/* <div className="flex  py-4 w-full md:min-w-[980px]"> */}
            <div className="flex-1 self-stretch grow">
              <div className="my-8">
                <h1 className="text-xx text-lexblue font-gilda_Display  font-bold my-2">
                  Judge index
                </h1>
                <h5 className="text-base text-[#9ea7b4] ">All justices</h5>
                <JudgeIndexSearchBox
                  practitionerType={"judge"}
                  innerRef={ref}
                />
                {openFilter && (
                  <JudgeFilter
                    openFilter={openFilter}
                    onFilter={() => {}}
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
                    className="flex cursor-pointer gap-[8px] items-center p-[10px] bg-gray-100 rounded-[5px] "
                  >
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

                    <div className="relative   w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                      <Image
                        width={16}
                        height={16}
                        src={`/images/icons/${"filter-vertical-stroke-rounded.svg"}`}
                        alt={"analytics-02-stroke-rounded"}
                      />
                    </div>
                    <span>Filter</span>
                    {/* <HiMiniPlus className="ml-auto" /> */}
                  </div>
                  <div
                    onClick={() => {
                      // setInputText("a");
                      setFilters({
                        query: "",
                        // case_title: "",
                        legal_area: "",
                        stance: "",
                        page: 1,
                        limit: 10,
                      });
                      setOpenFilter(false);
                      removeQueryParam("query");
                      // UpdateUrlParams("query", "a");
                    }}
                    className="cursor-pointer flex gap-[8px] items-center p-[10px] bg-gray-100 rounded-[5px] "
                  >
                    <div className="relative  w-[16px] h-[16px] flex shrink-0 items-center justify-center size-4 text-powder_blue">
                      <Image
                        width={16}
                        height={16}
                        src={`/images/icons/${"circle-arrow-reload-02-stroke-rounded.svg"}`}
                        alt={"analytics-02-stroke-rounded"}
                      />
                    </div>
                    {/* <GiSplash /> */}
                    <span>Reset</span>
                    {/* <HiMiniPlus className="ml-auto" /> */}
                  </div>
                </div>
              </div>

              <div className=" mb-8 space-y-4">
                {allData?.map((judge, idx) => (
                  <div
                    key={`judge-id${judge.judge_id}-${idx}`}
                    className="flex gap-3 min-w-full"
                  >
                    <span className="text-gray-500 mt-3 ">{idx + 1}.</span>
                    <div className="border-b border-solid border-gray-200 space-y-3 pb-3 w-full">
                      <div className="flex items-center gap-[8px]">
                        <div className="relative rounded-full overflow-clip w-[40px] h-[40px] ">
                          <Image
                            className=""
                            style={{ objectFit: "cover" }}
                            fill
                            src={`/images/${"judge_analytics_av.jpg"}`}
                            loading="lazy"
                            alt="judge counsel profile"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/analytics/judges?judgeId=${judge.judge_id}&judge=${judge.original_name}`}
                            className="text-[1.1rem] text-powder_blue font-semibold  font-gilda_Display"
                          >
                            {newQuery != "a" &&
                            judge?.match_context?.field == "name"
                              ? extractAndWrapWords(
                                  judge?.match_context?.highlight
                                )
                              : judge?.original_name}
                            {/* {judge.original_name} */}
                          </Link>
                          <h3 className="text-xs font-normal text-lex-blue">
                            {judge.court}
                          </h3>
                          <h3 className="text-sm text-lex-blue font-normal">
                            Cases count: {judge?.matching_case_count}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-lexblue font-poppins">
                        {judge.profile ?? "Profile not yet available."}
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

export default AllJudgesView;

type JudgeFilterProps = {
  onFilter: (filters: TJudgeFilterState) => void;
  filters: TJudgeFilterState;
  setFilters: React.Dispatch<React.SetStateAction<TJudgeFilterState>>;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  queryString: string;
  openFilter: boolean;
};

// type TJudgeFilterState = {
//   query?: string;
//   case_title?: string;
//   legal_area?: string;
//   stance?: string;
//   page?: number;
//   limit?: number;
// };

const JudgeFilter: React.FC<JudgeFilterProps> = ({
  onFilter,
  filters,
  setFilters,
  setOpenFilter,
  queryString,
  openFilter,
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
  const { data: allLegalAreas } = useGetAllLegalAreasQuery("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
    router.push(`/analytics/judges?${queryString}`);
    // UpdateUrlParams("", queryString);
    setOpenFilter((openFilter) => !openFilter);
  };

  const legalareasfetched = allLegalAreas?.legal_areas || DummyAllLegalAreas;

  const ref: RefObject<HTMLFormElement> = useRef(null);

  useEffect(() => {
    // console.log("Counsel filter component mounted");

    // if (!openFilter) return; // If filter is not open, do nothing

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
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow rounded-xl"
    >
      <input
        type="text"
        name="query"
        value={filters.query}
        onChange={handleChange}
        placeholder="🔍 e.g. Ejembi Eko, JSC"
        className="border rounded px-3 py-2 w-full"
      />

      {/* <input
        type="text"
        name="case_title"
        value={filters.case_title}
        onChange={handleChange}
        placeholder="Filter by case title"
        className="border rounded px-3 py-2 w-full"
      /> */}

      {/* <input
        type="text"
        name="legal_area"
        value={filters.legal_area}
        onChange={handleChange}
        placeholder="Filter by area of law"
        className="border rounded px-3 py-2 w-full"
      /> */}
      <select
        name="legal_area"
        value={filters.legal_area}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full"
      >
        <option value="">Filter by area of law</option>
        {legalareasfetched.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        {/* <input
          type="text"
          name="stance"
          value={filters.stance}
          onChange={handleChange}
          placeholder="Filter by stance"
          className="border rounded px-3 py-2 w-full"
        /> */}
        <select
          name="stance"
          value={filters.stance}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Filter judge&apos;s stance</option>
          {["DISSENTED", "LEAD", "CONCURRED"].map((stance) => (
            <option className="capitalize" key={stance} value={stance}>
              {stance}
            </option>
          ))}
        </select>
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
          // min={1}
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
  );
};
