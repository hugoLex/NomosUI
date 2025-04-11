import AuthSideCover from "@app/components/app/authentication/AuthSideCover";
import SuccessUI from "@app/components/app/authentication/success_ui";
import { useOnboard_accountMutation } from "@app/store/services/authenticationslice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface OnboardingCategory {
  id: string;
  title: string;
  description: string;
  options: string[];
  selectedValues: string[];
  multiple?: boolean;
}

interface OnboardingFormData {
  email: string;
  info: {
    [key: string]: string[];
  };
}

// Sample Options
const INDUSTRY_FOCUS_OPTIONS = [
  "Agriculture",
  "Automotive",
  "Construction",
  "Education",
  "Energy",
  "Entertainment",
  "Finance",
  "Government",
  "Health care",
  "Hospitality",
  "Manufacturing",
  "Media",
  "Non-profit",
  "Real estate",
  "Retail",
  "Tech",
  "Telecommunications",
  "Transportation",
  "Others",
];

const AREA_OF_INTEREST_OPTIONS = [
  "Alternative dispute resolution",
  "Caselaw analysis",
  "Compliance",
  "Contract review",
  "Due diligence",
  "Legal research",
  "Legal writing",
  "Mediation",
  "Negotiation",
  "Others",
];

const AREA_OF_SPECIALIZATION_OPTIONS = [
  "Administrative law",
  "Bankruptcy",
  "Civil rights",
  "Constitutional law",
  "Corporate law",
  "Criminal law",
  "Employment law",
  "Environmental law",
  "Family law",
  "Immigration law",
  "Intellectual property",
  "International law",
  "Labor law",
  "Litigation",
  "Maritime law",
  "Real estate",
  "Tax law",
  "Trusts and estates",
  "Others",
];

export default function OnboardingFormA() {
  const [onboard_account, { isLoading, isError, isSuccess }] =
    useOnboard_accountMutation();
  const params = useSearchParams();
  const email = params.get("email") || "No user Email found";
  // console.log(email);
  // const [email, setEmail] = useState("sopewenike@gmail.com");
  const [categories, setCategories] = useState<OnboardingCategory[]>([
    {
      id: "INDUSTRY_FOCUS",
      title: "Industry Focus",
      description:
        "Select the industries you specialize in or have experience with",
      options: INDUSTRY_FOCUS_OPTIONS,
      selectedValues: [],
    },
    {
      id: "AREA_OF_INTEREST",
      title: "Areas of Interest",
      description: "Select your areas of interest in the legal field",
      options: [...AREA_OF_INTEREST_OPTIONS],
      selectedValues: [],
    },
    {
      id: "AREA_OF_SPECIALIZATION",
      title: "Areas of Specialization",
      description: "Select your specialized legal practice areas",
      options: [...AREA_OF_SPECIALIZATION_OPTIONS],
      selectedValues: [],
    },
  ]);

  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    INDUSTRY_FOCUS: true,
    AREA_OF_INTEREST: false,
    AREA_OF_SPECIALIZATION: false,
  });

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Handle option selection
  const handleOptionChange = (categoryId: string, item: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          // Check if the item already exists in selectedValues
          const isSelected = category.selectedValues.includes(item);

          return {
            ...category,
            selectedValues: isSelected
              ? category.selectedValues.filter((value) => value !== item) // Remove if exists
              : [...category.selectedValues, item], // Add if doesn't exist
          };
        }
        return category;
      })
    );
  };

  // Check if at least one option is selected in any category
  function validateForm() {
    const hasSelection = categories.some(
      (category) => category.selectedValues.length > 0
    );

    if (!hasSelection) {
      toast("Please select at least one option in any category");
      return false;
    }

    return true;
  }

  // Prepare form data for submission
  const prepareFormData = (): OnboardingFormData => {
    const info: { [key: string]: string[] } = {};

    categories.forEach((category) => {
      if (category.selectedValues.length > 0) {
        info[category.id] = category.selectedValues;
      }
    });

    return {
      email,
      info,
    };
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = prepareFormData();

      const res = await onboard_account(formData).unwrap();
      if (res) {
        toast(`${email} onboard successfully`);
        console.log(res);
      }

      // Optional: reset form after success
      // resetForm();
    } catch (error) {
      console.error("Onboarding submission error:", error);
      toast(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  // Reset the form to initial state
  const resetForm = () => {
    // setEmail("");
    setCategories((prev) =>
      prev.map((category) => ({
        ...category,
        selectedValues: [],
      }))
    );
  };

  return (
    <section className=" ">
      <div className=" lg:grid h-screen grid-cols-2  bg-white">
        <div className="max-h-screen lg:overflow-y-scroll no-scrollbar  max-lg:w-full  lg:relative  justify-between  flex max-md:flex-col  ">
          {isSuccess ? (
            <SuccessUI
              action="Login"
              heading="Onboarding Completed!"
              subheading="Your professional profile has been successfully updated. You can now access all features."
              link="/auth/login"
            />
          ) : (
            // <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            //   <div className="flex items-center">
            //     <h2 className="text-lg font-semibold text-green-800">
            //       Onboarding Completed!
            //     </h2>
            //   </div>
            //   <p className="mt-2 text-green-700">
            //     Your professional profile has been successfully updated. You can
            //     now access all features.
            //   </p>
            //   <button
            //     onClick={resetForm}
            //     className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            //   >
            //     Continue
            //   </button>
            // </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 px-[24px] pt-[50px] w-full"
            >
              {/* Email Field */}
              <Link
                className="text-2xl text-center block  font-bold text-primary mb-6"
                href={"/"}
              >
                Lexanalytics
              </Link>
              <h1 className="text-xl font-bold text-gray-800 mb-6">
                Complete Your Professional Profile
              </h1>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <span className="w-full py-2   rounded-md ">{email}</span>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Category Header - Clickable to expand/collapse */}
                    <div
                      className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div>
                        <h3 className="font-medium text-gray-800 text-lg">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Category Options */}
                    {expandedCategories[category.id] && (
                      <div className="p-4 bg-white">
                        {/* <div className="space-y-3">
                        <select
                          multiple={category.multiple}
                          value={category.selectedValues}
                          onChange={(e) => {
                            const options = e.target.options;
                            const selectedValues: string[] = [];
                            for (let i = 0; i < options.length; i++) {
                              if (options[i].selected) {
                                selectedValues.push(options[i].value);
                              }
                            }
                            handleOptionChange(category.id, selectedValues);
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          //   size={
                          //     category.multiple
                          //       ? Math.min(8, category.options.length)
                          //       : 1
                          //   }
                        >
                          {category.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {category.multiple && (
                          <p className="text-xs text-gray-500">
                            Hold Ctrl/Cmd to select multiple options
                          </p>
                        )}
                      </div> */}
                        <div className="flex flex-wrap gap-3">
                          {category.options.map((item, idx) => (
                            <div
                              key={category.id + idx}
                              onClick={() =>
                                handleOptionChange(category.id, item)
                              }
                              //   onClick={() => {
                              //     setInterest((prev) => {
                              //       if (interest.includes(item)) {
                              //         return interest.filter(
                              //           (itemZ) => itemZ != item
                              //         );
                              //       }

                              //       return [...prev, item];
                              //     });
                              //   }}
                              className={` ${
                                category.selectedValues?.includes(item)
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                              } px-2 py-1 text-white text-sm rounded-sm cursor-pointer`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-2 mb-[30px] min-w-[141px] h-[40px] rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">Saving...</span>
                  ) : (
                    "Save Profile"
                  )}
                </button>
              </div>
              {/* <div className="pb-[50px]"></div> */}
            </form>
          )}
        </div>{" "}
        <AuthSideCover page="onboard" />
      </div>
    </section>
  );
}
