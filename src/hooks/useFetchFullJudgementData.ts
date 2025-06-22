import matter from "gray-matter";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCaseQuery } from "@app/store/services/caseSlice";
import { TCaseDocument } from "@app/types";


// There is a need to get the full text of a judgement with out having to repeat
//  all the logics for it hence the need for this hook 
// if you feel the retrieval of full text of judgement can be better done 
// please delete this logic else lets keep it.
function useFetchFullJudgementData(caseId: string) {


    const { isError, isLoading, data } = useCaseQuery(caseId);
    const [caseDocument, setCaseDocument] = useState<TCaseDocument | null>(null);
    const [analysisDocument, setAnalysisDocument] = useState<any>(undefined);
    // console.log("case full judgement", )
    useEffect(() => {
        if (data) {
            const { case_data } = data;
            const { main_judgement_url: judgementUrl, analysis_url: analysisUrl } =
                case_data;

            (async () => {
                try {
                    let judgementData: any = undefined;
                    let analysisData: any = undefined;

                    const [judgementRes, analysisRes] = await Promise.all([
                        judgementUrl
                            ? axios.get(judgementUrl)
                            : Promise.resolve({ data: null }),
                        analysisUrl
                            ? axios.get(analysisUrl)
                            : Promise.resolve({ data: null }),
                    ]);
                    // const res = await axios.get(judgementUrl);

                    // console.log(judgementRes, analysisRes);

                    if (judgementRes) {
                        const { content } = matter(judgementRes.data);
                        judgementData = content;
                    }

                    if (analysisRes.data) {
                        const { content } = matter(analysisRes.data);
                        analysisData = content;
                    }

                    setCaseDocument({ ...case_data, judgement: judgementData });
                    setAnalysisDocument(analysisData);
                } catch (error) {
                    console.log(error);

                    setCaseDocument({ ...case_data });
                }
            })();
        }
    }, [data]);
    return { fullJudgement: caseDocument }
}

export default useFetchFullJudgementData