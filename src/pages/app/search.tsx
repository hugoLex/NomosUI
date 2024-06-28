import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Head, Loader, Shimmer } from '@app/components/ui';
import {
  AppLayout as Layout,
  AppLayoutContext as LayoutContext,
} from '@app/components/layout';
import {
  FilterSideBar,
  SearchAIMetaResult,
  SearchHeader,
  SearchResultMeta,
} from '@app/components/app';
import { AIResult, SearchResult } from '@app/types';
import { useSearchCasesQuery } from '@app/store/services/searchSlice';
import { useGetAIQuery } from '@app/store/services/aiSlice';

type SearchData = {
  llmResult: AIResult | null;
  searchResult: SearchResult | null;
};

const useSearch = (query: string | undefined, pageNumber: string | number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<SearchData>({
    llmResult: null,
    searchResult: null,
  });

  const {
    data: llmResult,
    isError: llmError,
    isFetching: fetchingLLM,
    isLoading: loadingLLM,
    isSuccess: llmSuccess,
  } = useGetAIQuery(String(query));

  const {
    data: searchResult,
    isError: searchError,
    isFetching: fetchingSearch,
    isLoading: loadingSearch,
    isSuccess: searchSuccess,
  } = useSearchCasesQuery({
    query: String(query),
    pageNumber: String(pageNumber),
  });

  useEffect(() => {
    const isLoadingLLM = loadingLLM || fetchingLLM ? true : false;
    const isLoadingSearch = loadingSearch || fetchingSearch ? true : false;

    if (isLoadingLLM || isLoadingSearch) {
      setIsError(false);
      setIsSuccess(false);
      setIsLoading(true);
    }

    if (llmSuccess && llmResult) {
      setData((prev) => ({ ...prev, llmResult }));
      setIsSuccess(true);
      setIsError(false);
      setIsLoading(false);
    }

    if (searchSuccess && searchResult) {
      setData((prev) => ({ ...prev, searchResult }));
      setIsSuccess(true);
      setIsError(false);
      setIsLoading(false);
    }

    if (llmError && searchError) {
      setIsSuccess(false);
      setIsLoading(false);
      setIsError(true);
    }

    return () => {};
  }, [
    fetchingLLM,
    fetchingSearch,
    loadingLLM,
    loadingSearch,
    llmResult,
    searchResult,
    llmSuccess,
    searchSuccess,
    llmError,
    searchError,
  ]);

  return { data, isError, isLoading, isSuccess };
};

const Page = () => {
  const router = useRouter();

  const { q, page } = router.query;

  const query = q ? String(q) : undefined;
  const pageNumber = page ? String(page) : '1';

  const { isError, isLoading, isSuccess } = useSearch(query, pageNumber);

  // const results = new Array(15).fill({
  //   caseTitle: 'John Doe vs Mike Doe',
  //   date: '1991-1-1',
  //   court: 'High Court',
  // });

  const data = {
    llmResult: null,
    searchResult: {
      search_id: '3139baa8-d6ec-4b81-8d17-5231d4fda8fd',
      filter_elements: {
        court: ['Court Of Appeal', 'Supreme Court'],
        year: ['1976', '2012', '2020'],
        area_of_law: [
          'Criminal Law And Procedure',
          'Interpretation Of Statutes',
          'Evidence',
          'Children And Young Person',
          'Appeal',
          'Criminal Law And Procedur',
          'Children And Women Law',
          'Children And Young Persons',
          'Constitutional Law',
          'Criminal Law',
        ],
      },
      documents: [
        {
          id: '31065277c948d99a28a5d0becbcb4df125e0fbaacb97fbdbc4865378083f2c3d',
          content:
            ' 1104) 361, Orisa vs The State (2018) LPELR-43896 SC page 9 - 10, Darlinton vs. FRN (2018) LPELR-43850 SC and The State vs. Fadezi (2018) LPELR-44731.\nAt common law, rape is the unlawful sexual intercourse committed by a man with a woman not his wife through force and against her will. The offence is incomplete if there is no penetration of the person into the vagina.',
          score: 0.9965288043022156,
          metadata: {
            case_title: 'Habu Idi v. The State',
            court: 'Court Of Appeal',
            year: '2020',
            area_of_law: [
              'Criminal Law And Procedure',
              'Children And Young Person',
              'Appeal',
              'Evidence',
            ],
            source_id:
              'd330f8c90dae004ddc9adba4efae3265d90b13ddf4310cb899fa4501f04b388b',
          },
          context: [
            'At common law, rape is the unlawful sexual intercourse committed by a man with a woman not his wife through force and against her will.',
          ],
        },
        {
          id: '2947b47cfda458d78ff631fb7634436d06927ac5efaa12e4ee28a7a1b8cc0750',
          content:
            " That there was penetration of the vagina of the victim no matter how slight by the accused's penis.\nIn the instant case, the Trial Court at page 154 paragraph two of the record of this appeal held:-\n“In the course of this judgment, I have held that the prosecution had established that the prosecutrix was under fourteen years of age. By Section 282 (1)(e) of the Penal Code, it is rape to have sexual intercourse with or without the consent of a girl who is under fourteen years of age. I have also found that the accused person had sexual intercourse with the prosecutrix. The cumulative effect of these findings is that the ingredients of an offence under Section 282(1)(e) of the Penal Code have been made out by the prosecution.",
          score: 0.6462035179138184,
          metadata: {
            case_title: 'Eyong Idam v. Federal Republic Of Nigeria',
            court: 'Supreme Court',
            year: '2020',
            area_of_law: [
              'Criminal Law And Procedure',
              'Constitutional Law',
              'Children And Young Persons',
              'Appeal',
            ],
            source_id:
              '1424012890eee3cc6bde1d4b838e567f23e0945b8d82939935325fbd4e3aff01',
          },
          context: [
            'By Section 282 (1)(e) of the Penal Code, it is rape to have sexual intercourse with or without the consent of a girl who is under fourteen years of age.',
          ],
        },
        {
          id: 'bc2446117f4c31ed9995b961d1c7d37fc72158ea0ef8f904cbbbe251f0627b77',
          content:
            '2 and also testified at the trial.\nCorroboration in respect of the offence of rape is evidence which tends to show that the story of the prosecutrix that the accused committed the crime is true - See Samba v. State (1993) 6 NWLR (Part 300) 399; Upahar v. State (2003) 6 NWLR (Part 816) 230.\nCorroboration need not consist of direct evidence that the accused committed the offence charged, nor need it amount to a confirmation of the whole account given by the witness/prosecutrix.',
          score: 0.48797470331192017,
          metadata: {
            case_title: 'Edwin Ezeigbo v. The State',
            court: 'Supreme Court',
            year: '2012',
            area_of_law: [
              'Children And Women Law',
              'Criminal Law',
              'Appeal',
              'Evidence',
              'Interpretation Of Statutes',
            ],
            source_id:
              'a58fc77b5a6108fe04d8709a045fe24f68e51baf6343e786f4d4111d367a29e6',
          },
          context: [
            'Corroboration in respect of the offence of rape is evidence which tends to show that the story of the prosecutrix that the accused committed the crime is true - See Samba v. State (1993) 6 NWLR (Part 300) 399; Upahar v. State (2003) 6 NWLR (Part 816) 230.',
          ],
        },
        {
          id: 'f501adf9f97d16077d2c3fc063f121c59353729bb14a70f10accdad5a314ebc3',
          content:
            '\nSection 282 provides as follows :-\n“282(1) A man is said to commit rape who, save in the case referred to in Subsection (2), has sexual intercourse with a woman in any of the following circumstances: -\n(a) against her will;\n(b) without her consent;\n(c) with her consent, when her consent has been obtained by putting her in fear of death or of hurt.\n(d) With her consent, when the man knows that he is not her husband and that her consent is given because she believes that he is another man to whom she is or believes herself to be lawfully married.\n(e) With or without her consent, when she is under fourteen years of age or of unsound mind.\n(2) Sexual intercourse by a man with his own wife is not rape, if she has attained to puberty.”\nSection 283 of the same Penal Code provides as follows:-\n“Whoever Commits rape, shall be punished with imprisonment for life or for any less term and shall also be liable to fine.',
          score: 0.469143271446228,
          metadata: {
            case_title: 'Eyong Idam v. Federal Republic Of Nigeria',
            court: 'Supreme Court',
            year: '2020',
            area_of_law: [
              'Criminal Law And Procedure',
              'Constitutional Law',
              'Children And Young Persons',
              'Appeal',
            ],
            source_id:
              '1424012890eee3cc6bde1d4b838e567f23e0945b8d82939935325fbd4e3aff01',
          },
          context: [
            '\nSection 282 provides as follows :-\n“282(1) A man is said to commit rape who, save in the case referred to in Subsection (2), has sexual intercourse with a woman in any of the following circumstances: -\n(a) against her will;\n(b) without her consent;\n(c) with her consent, when her consent has been obtained by putting her in fear of death or of hurt.',
            '(2) Sexual intercourse by a man with his own wife is not rape, if she has attained to puberty.”\nSection 283 of the same Penal Code provides as follows:-\n“Whoever Commits rape, shall be punished with imprisonment for life or for any less term and shall also be liable to fine.',
          ],
        },
        {
          id: 'a4b3fe58e7a48c963859c0257be256b1e12c0a88c74d19d9281c560e83b290ff',
          content:
            'A. (2010) 19 NWLR (Pt.1226) 364 at 381. Finally, Learned Counsel urged this Court to dismiss the appeal.\nSection 282 provides as follows :-\n“282(1) A man is said to commit rape who, save in the case referred to in Subsection (2), has sexual intercourse with a woman in any of the following circumstances: -\n(a) against her will;\n(b) without her consent;\n(c) with her consent, when her consent has been obtained by putting her in fear of death or of hurt.',
          score: 0.42310264706611633,
          metadata: {
            case_title: 'Eyong Idam v. Federal Republic Of Nigeria',
            court: 'Supreme Court',
            year: '2020',
            area_of_law: [
              'Criminal Law And Procedure',
              'Constitutional Law',
              'Children And Young Persons',
              'Appeal',
            ],
            source_id:
              '1424012890eee3cc6bde1d4b838e567f23e0945b8d82939935325fbd4e3aff01',
          },
          context: [
            'Section 282 provides as follows :-\n“282(1) A man is said to commit rape who, save in the case referred to in Subsection (2), has sexual intercourse with a woman in any of the following circumstances: -\n(a) against her will;\n(b) without her consent;\n(c) with her consent, when her consent has been obtained by putting her in fear of death or of hurt.',
          ],
        },
        {
          id: 'fc9f8f0cf322e91644d8e7355b52f4cd55565a8156660ef5068ca0e4589ba310',
          content:
            '1 did not consent to the 1st appellant having sexual intercourse with her, but there was also clear evidence that she in fact did consent.\nLearned counsel for the respondent found it difficult to support the conviction and, rightly in our view, he eventually conceded that the view of the evidence of the prosecutrix (P. W.1) in which she stated that the sexual intercourse was with her consent, the conviction could not be supported.\nIn a case of rape, the person ravished is a competent witness and her evidence is always vital in deciding the most important element in the case, namely, whether sexual intercourse was by force and without her consent.',
          score: 0.40102726221084595,
          metadata: {
            case_title: 'Ekpo And Another v. The State',
            court: 'Supreme Court',
            year: '1976',
            area_of_law: [
              'Criminal Law And Procedur',
              'Criminal Law And Procedure',
              'Children And Women Law',
            ],
            source_id:
              'b90aa7831e21c3daea589fdbb7aad18a8813ed8b432e73dd6888768c797f59df',
          },
          context: [
            'In a case of rape, the person ravished is a competent witness and her evidence is always vital in deciding the most important element in the case, namely, whether sexual intercourse was by force and without her consent.',
          ],
        },
        {
          id: 'ab7fd64d4434d7ec929f0a14137490885dd37b93c404caeb3934609be5bdb431',
          content:
            'C.:\nI had a preview of the lead judgment just delivered by my learned brother, GALUMJE, JSC, and I agree with him that this Appeal totally lacks merit. The Court of Appeal was right to affirm the decision of the trial Court, which “was well-founded on the law and the fact”. I also agree with its decision not to disturb the sentence passed by the trial Court on the Appellant. As the Court of Appeal aptly said:\nIt is common knowledge that the offence of rape is on the increase in this Country and Courts have a role to play in sending a clear message that it would not be tolerated and would be severely punished.',
          score: 0.39679282903671265,
          metadata: {
            case_title: 'Eyong Idam v. Federal Republic Of Nigeria',
            court: 'Supreme Court',
            year: '2020',
            area_of_law: [
              'Criminal Law And Procedure',
              'Constitutional Law',
              'Children And Young Persons',
              'Appeal',
            ],
            source_id:
              '1424012890eee3cc6bde1d4b838e567f23e0945b8d82939935325fbd4e3aff01',
          },
          context: [
            'As the Court of Appeal aptly said:\nIt is common knowledge that the offence of rape is on the increase in this Country and Courts have a role to play in sending a clear message that it would not be tolerated and would be severely punished.',
          ],
        },
        {
          id: 'f7531abab34277bac296bc726ead65dec9337cce8d35bd47bf7616d22b19d94b',
          content:
            ' Since there is evidence of rape, any act of trespass to the body of PW 1 in preparation to commit an offence is clearly an act of criminal force. Criminal force is defined under Section 263 of the Penal Code thus:-\n"Whoever intentionally uses force to any person without that person\'s consent: -\n(a) While preparing to commit any offence\n(b) In the course of committing any offence, or\n(c) Intending by the use of such force, he will cause injury, fear or annoyance to the person to whom the force is used is said to use criminal force to that other.”\nBy this definition, the Appellant committed criminal force against PW1. The Lower Court was therefore right when it upheld the decision of the Lower Court on this score.\nOn the issue of the sentences, I agree with the learned counsel for the Respondent that the imposition of sentence on the Appellant was purely a matter of discretion.',
          score: 0.3842654824256897,
          metadata: {
            case_title: 'Eyong Idam v. Federal Republic Of Nigeria',
            court: 'Supreme Court',
            year: '2020',
            area_of_law: [
              'Criminal Law And Procedure',
              'Constitutional Law',
              'Children And Young Persons',
              'Appeal',
            ],
            source_id:
              '1424012890eee3cc6bde1d4b838e567f23e0945b8d82939935325fbd4e3aff01',
          },
          context: [
            ' Since there is evidence of rape, any act of trespass to the body of PW 1 in preparation to commit an offence is clearly an act of criminal force.',
          ],
        },
        {
          id: 'd3e56734a7de17c351bbba611c06b72c5657b252e5143f0a650468326f34dc50',
          content:
            '5.\nTurning to the submission of counsel for appellant to the effect that neither Exhibit 2 nor PW.5 linked appellant with the commission of the offence, learned counsel submitted that the gist of the offence of rape is penetration which has been established in this case; there is no doubt that the offence of rape was established but what appellant disputes is the fact that he had not been linked with the commission of the offence as the offender.\nIt is the further contention of counsel for respondent that evidence of PW.2, an unsworn evidence of a child needed corroboration to ground a conviction and that in the instant case such corroboration exists in the evidence of PW.',
          score: 0.2606838345527649,
          metadata: {
            case_title: 'Edwin Ezeigbo v. The State',
            court: 'Supreme Court',
            year: '2012',
            area_of_law: [
              'Children And Women Law',
              'Criminal Law',
              'Appeal',
              'Evidence',
              'Interpretation Of Statutes',
            ],
            source_id:
              'a58fc77b5a6108fe04d8709a045fe24f68e51baf6343e786f4d4111d367a29e6',
          },
          context: [
            'Turning to the submission of counsel for appellant to the effect that neither Exhibit 2 nor PW.5 linked appellant with the commission of the offence, learned counsel submitted that the gist of the offence of rape is penetration which has been established in this case; there is no doubt that the offence of rape was established but what appellant disputes is the fact that he had not been linked with the commission of the offence as the offender.',
          ],
        },
        {
          id: 'a302ca1300fcc53b48bc57024b5a28fcb3e474c2ccc7b4f3073ef469bfa263fd',
          content:
            '\nFinally counsel urged the court to dismiss the appeal and affirm the conviction and sentence of appellant\nIt is settled law that for the prosecution to sustain a conviction against the appellant under Section 283 of the Penal Code, the following ingredients of the offence must be established by evidence.\n(i) That the accused had sexual intercourse with the women in question;\n(ii) That the act was done in circumstance envisaged in any of the five paragraphs of Section 282(1) of the Penal Code;\n(iii) That the woman was not the wife of the accused; or if she was the wife, she had not attained puberty;\n(iv) That there was penetration.\nHowever, Section 282(1) of the Penal Code provides as follows:-\n“A man is said to commit rape who save in the case referred to in subsection 2 had sexual intercourse with a woman in any of the following circumstances:-\n(a) Against her will,\n(b) Without her consent,\n(c) With her consent, when her consent has been obtained by putting her in fear of death or hurt,\n(d) With her consent when the man knows that he is not her husband and that her consent is given because she believes that he is another man to whom she is or believes herself to be lawfully married.\n(e) With or without her consent when she is under fourteen years of age or of unsound mind”\nLooking at the totality of the case as presented and the defence thereto, it is very clear that the fact that PW.2 was raped is not in dispute at all.',
          score: 0.21729429066181183,
          metadata: {
            case_title: 'Edwin Ezeigbo v. The State',
            court: 'Supreme Court',
            year: '2012',
            area_of_law: [
              'Children And Women Law',
              'Criminal Law',
              'Appeal',
              'Evidence',
              'Interpretation Of Statutes',
            ],
            source_id:
              'a58fc77b5a6108fe04d8709a045fe24f68e51baf6343e786f4d4111d367a29e6',
          },
          context: [
            'However, Section 282(1) of the Penal Code provides as follows:-\n“A man is said to commit rape who save in the case referred to in subsection 2 had sexual intercourse with a woman in any of the following circumstances:-\n(a) Against her will,\n(b) Without her consent,\n(c) With her consent, when her consent has been obtained by putting her in fear of death or hurt,\n(d) With her consent when the man knows that he is not her husband and that her consent is given because she believes that he is another man to whom she is or believes herself to be lawfully married.',
          ],
        },
        {
          id: '64f34bb82f4b34e2f09b4333bec9482972d646259baaa190c2da513a0533bb03',
          content:
            ' Allah NA Gani (1967) NMLR 107 and Okoyomon v. State (1972) 1 NMLR: 292.\nHowever Section 282(1) of the Panel Code provides that:\n“A man is said to commit rape who save in the case referred to in subsection 2 had sexual intercourse with a woman in any of the following circumstances:-\n(a) Against her will\n(b) Without her consent\n(c) With her consent when her consent has been obtained by putting her in fear of death or hurt.\n(d) With her consent when the man knows that he is not her husband and that her consent is given because she believes that he is another man to whom she is or believes herself to be lawfully married.\n(e) With or without her consent when she is under fourteen years of age or of unsound mind.',
          score: 0.2067938596010208,
          metadata: {
            case_title: 'Edwin Ezeigbo v. The State',
            court: 'Supreme Court',
            year: '2012',
            area_of_law: [
              'Children And Women Law',
              'Criminal Law',
              'Appeal',
              'Evidence',
              'Interpretation Of Statutes',
            ],
            source_id:
              'a58fc77b5a6108fe04d8709a045fe24f68e51baf6343e786f4d4111d367a29e6',
          },
          context: [
            'However Section 282(1) of the Panel Code provides that:\n“A man is said to commit rape who save in the case referred to in subsection 2 had sexual intercourse with a woman in any of the following circumstances:-\n(a) Against her will\n(b) Without her consent\n(c) With her consent when her consent has been obtained by putting her in fear of death or hurt.',
          ],
        },
        {
          id: '1eb3aa88e64ff3daddb9b9761afe2656d0fdc8fae63bd49b32f6c267205dd3a0',
          content:
            '”\nSection 283 of the same Penal Code provides as follows:-\n“Whoever Commits rape, shall be punished with imprisonment for life or for any less term and shall also be liable to fine.”\nFor the prosecution to prove the offence of rape, it must establish the following ingredients: -\n1. That the accused had sexual intercourse with the woman in question.\n2. That the act was done in circumstances following under any one of the five paragraphs in Section 282 (1) of the Penal Code.',
          score: 0.18900586664676666,
          metadata: {
            case_title: 'Eyong Idam v. Federal Republic Of Nigeria',
            court: 'Supreme Court',
            year: '2020',
            area_of_law: [
              'Criminal Law And Procedure',
              'Constitutional Law',
              'Children And Young Persons',
              'Appeal',
            ],
            source_id:
              '1424012890eee3cc6bde1d4b838e567f23e0945b8d82939935325fbd4e3aff01',
          },
          context: [
            '”\nSection 283 of the same Penal Code provides as follows:-\n“Whoever Commits rape, shall be punished with imprisonment for life or for any less term and shall also be liable to fine.”\nFor the prosecution to prove the offence of rape, it must establish the following ingredients: -\n1.',
          ],
        },
        {
          id: '2cc70d9e014d25ec6d18c0537326768c13103adf0b9cda6662e128508fc86d11',
          content:
            'I. Aigoro (1985) 1 NWLR (Pt.1) 143 at 148.\nIt is equally settled that where judicial discretion has been exercised bona fide uninfluenced by irrelevant consideration and not arbitrarily or illegally by the Court, the general rule is that the Appellate Court will not interfere. The punishment for rape as provided under Section 283 of the Penal Code is life imprisonment, and a mandatory sentence of fine.',
          score: 0.1296176314353943,
          metadata: {
            case_title: 'Eyong Idam v. Federal Republic Of Nigeria',
            court: 'Supreme Court',
            year: '2020',
            area_of_law: [
              'Criminal Law And Procedure',
              'Constitutional Law',
              'Children And Young Persons',
              'Appeal',
            ],
            source_id:
              '1424012890eee3cc6bde1d4b838e567f23e0945b8d82939935325fbd4e3aff01',
          },
          context: [
            'The punishment for rape as provided under Section 283 of the Penal Code is life imprisonment, and a mandatory sentence of fine.',
          ],
        },
        {
          id: 'dffcbed2d33eac13f9d7edc6c757a4bb6076c45b331669150689b7859178fd4c',
          content:
            '\nSULEIMAN GALADIMA. JSC\nThe Appellant in this appeal was arraigned before the Suleja High Court, Niger State of Nigeria on two count charge of rape, which read as follows:\n“(a). That you Edwin Ezigbo on or about the 5th of April, 2004 at old Minna Motor Park Suleja within the jurisdiction of High Court of Niger State, sitting at Suleja, had carnal knowledge of Chioma Kelechi a six years old girl being an under age girl you thereby committed an offence of rape contrary to Section 282 of Penal Code.\n(b). That you Edwin Ezigbo on or about the 4/4/2004 at old Minna Motor Park Suleja within the Jurisdiction of High Court of Niger State had carnal knowledge of Ogechi Kelechi an eight years old girl being an under age girl you thereby committed an offence of rape contrary to Section 283 of Penal Code.',
          score: 0.02381083182990551,
          metadata: {
            case_title: 'Edwin Ezeigbo v. The State',
            court: 'Supreme Court',
            year: '2012',
            area_of_law: [
              'Children And Women Law',
              'Criminal Law',
              'Appeal',
              'Evidence',
              'Interpretation Of Statutes',
            ],
            source_id:
              'a58fc77b5a6108fe04d8709a045fe24f68e51baf6343e786f4d4111d367a29e6',
          },
          context: [
            'JSC\nThe Appellant in this appeal was arraigned before the Suleja High Court, Niger State of Nigeria on two count charge of rape, which read as follows:\n“(a).',
            'That you Edwin Ezigbo on or about the 5th of April, 2004 at old Minna Motor Park Suleja within the jurisdiction of High Court of Niger State, sitting at Suleja, had carnal knowledge of Chioma Kelechi a six years old girl being an under age girl you thereby committed an offence of rape contrary to Section 282 of Penal Code.',
            'That you Edwin Ezigbo on or about the 4/4/2004 at old Minna Motor Park Suleja within the Jurisdiction of High Court of Niger State had carnal knowledge of Ogechi Kelechi an eight years old girl being an under age girl you thereby committed an offence of rape contrary to Section 283 of Penal Code.',
          ],
        },
        {
          id: 'a1ab81942c75116473e9415136c5db4b325540cbeee535c965fbcdf2aa089fe5',
          content:
            " There was blood observed in the vagina and the area of laceration of the skin.”\nClearly, this piece of evidence corroborates the evidence of PW1 that she was raped. Not only that the evidence has clearly shown that there was penetration of the prosecutrix's vagina by the Appellant's penis. I have no doubt in my mind that the Appellant committed the offence of rape.\nThe question now is whether the Appellant used force against PW 1.",
          score: 0.0216959360986948,
          metadata: {
            case_title: 'Eyong Idam v. Federal Republic Of Nigeria',
            court: 'Supreme Court',
            year: '2020',
            area_of_law: [
              'Criminal Law And Procedure',
              'Constitutional Law',
              'Children And Young Persons',
              'Appeal',
            ],
            source_id:
              '1424012890eee3cc6bde1d4b838e567f23e0945b8d82939935325fbd4e3aff01',
          },
          context: [
            'I have no doubt in my mind that the Appellant committed the offence of rape.',
          ],
        },
      ],
    },
  };

  const [filter, setFilter] = useState<{ header: string; options: string[] }[]>(
    []
  );

  return (
    <Fragment>
      <Head title={`Search Result - ${q}`} />
      <Layout>
        <SearchHeader />
        {isLoading && (
          <div className=' flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-full'>
            <Loader />
          </div>
        )}

        {!isSuccess && (
          <section className='flex justify-center items-center self-stretch py-6 '>
            <div className='px-16 max-md:px-5  mx-auto max-w-[1100px]'>
              <div className='md:grid grid-cols-12 gap-8'>
                <div className='col-span-8'>
                  <div className='flex flex-col'>
                    <h1 className='text-xx font-normal mb-6'>
                      Search result for: <span>{q}</span>
                    </h1>

                    <div className='flex gap-3'>
                      {filter
                        .filter((elem) => elem.options.length > 0)
                        .map((x) => (
                          <div key={x.header} className=''>
                            <p className='text-sm font-normal'>
                              {x.header}: {x.options.join(', ')}
                            </p>
                          </div>
                        ))}
                    </div>

                    {data.llmResult !== null && (
                      <SearchAIMetaResult
                        replies={data.llmResult?.replies}
                        meta={data.llmResult?.meta}
                      />
                    )}
                  </div>

                  <div className='my-6'>
                    {data.searchResult !== null &&
                      data.searchResult.documents.length > 0 && (
                        <Fragment>
                          <div>
                            {data.searchResult.documents?.map((data, idx) => (
                              <SearchResultMeta
                                key={data.id}
                                index={String(idx + 1)}
                                data={data}
                              />
                            ))}
                          </div>
                        </Fragment>
                      )}
                  </div>
                </div>
                <div className='col-span-4'>
                  <div className='sticky top-[68px]'>
                    <FilterSideBar
                      data={data}
                      filter={filter}
                      setFilter={setFilter}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {isError && (
          <div className='flex-1 flex justify-center items-center self-stretch py-6 '>
            <div className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10'>
                  {/* Heroicon name: outline/exclamation-triangle */}
                  <svg
                    className='h-6 w-6 text-gray-600'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z'
                    />
                  </svg>
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h3
                    className='text-lg font-medium leading-6 text-gray-900'
                    id='modal-title'>
                    Unknown error occurred.
                  </h3>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Follow these steps to resolve:
                    </p>
                    <ol className='text-sm text-gray-500 list-disc ml-8 mt-2 flex gap-2 flex-col'>
                      <li className='list-item list-disc'>
                        Retry a different search term or keyword.
                      </li>
                      <li className='list-item list-disc'>Reload the tab.</li>
                      <li className='list-item list-disc'>
                        Clear cache and reload the tab.
                      </li>
                      <li className='list-item list-disc'>
                        Close and relaunch the browser.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </Fragment>
  );
};

export default Page;
