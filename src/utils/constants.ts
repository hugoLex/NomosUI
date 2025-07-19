import {
  LinkProps,
  SearchResults,
  AIResult,
  CaseResults,
  LegislationResults,
  ArticleResults,
  FilterOption,
  MenuLink,
} from "@app/types";

import { Search, Bench, Library } from "@app/components/icons";

export const searchURL = "https://lexasearch.lexanalytics.ai/api";

export const aiURL = "https://llmsearch.lexanalytics.ai/api";

export const baseURL = "https://webapp.lexanalytics.ai/api";


export const rhetorical_function_tooltips = {
  "issue formulation": "Outlines the legal questions or disputes to be resolved",
  "precedent analysis": "Examines and applies previous case decisions",
  ruling: "States the court's final determination on issues",
  "factual background": "Establishes relevant facts of the case",
  "legal reasoning": "Presents the court's analysis and rationale",
  "dissenting opinion": "Records disagreement with the majority ruling",
  "concurring opinion": "Agrees with outcome but offers different reasoning",
  "procedural history": "Tracks the case's journey through the courts",
  "statutory interpretation": "Analyzes and applies relevant legislation"
}
export const mappedAlphabets: { [key: number]: string } = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
  8: "i",
  9: "j",
  10: "k",
  11: "l",
  12: "m",
  13: "n",
  14: "o",
  15: "p",
};

export const dummyCasesResult: CaseResults = {
  search_id: "9d182815-5515-437c-bc85-66de4619fcc7",
  filter_elements: {
    court: ["Court Of Appeal", "Supreme Court", "High Court"],
    year: ["1989", "2013", "2015", "2001", "1976", "2006", "2016", "1963"],
    area_of_law: [
      "Words And Phrases",
      "Nonprofit Law",
      "Customs And Law",
      "Constitutional And Public Law",
      "T",
      "Action",
      "Interpretation Of Section",
      "Court",
      "Transportation Law",
      "Interpretation Of Statute",
      "Words And Phrase",
      "Children And Women Law",
      "Judgment And Order",
      "Ethics",
      "Administrative And Government Law",
      "Criminal Law",
      "Religion And The Law",
      "Appeal",
      "Evidence",
      "Government And Administrative Law",
      "Religion And Law",
      "Criminal Law Procedure",
      "Children And Women La",
      "Pleadings",
      "Criminal Law And Procedure",
    ],
  },
  documents: [
    {
      id: "4f9973d6db57e47b1654cfdc128873cd0e854f7de99d5c6821858f51d1dc8e26",
      content:
        " A person who unlawfully kills another in the prosecution of an unlawful purpose which act is of such a nature as to be likely to endanger life, or to cause grievous harm to some person for the purpose of facilitating either the commission of a crime or the flight of an offender who has committed or attempted to commit any such offence, is guilty of murder. (See S.316(3) and (4) Criminal Code.) In the instant case, the dividing line between armed robber and murder is very thin, if there is a dividing line at all. The P.",
      score: 0.006911509204655886,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Okosi And Anor. v. The State",
        court: "Supreme Court",
        year: "1989",
        area_of_law: ["Criminal Law And Procedure", "Evidence"],
        source_id:
          "188da74664704c4159c502a5e73777edcd48140296d82de2f663072d2d953469",
      },
      context: [
        " A person who unlawfully kills another in the prosecution of an unlawful purpose which act is of such a nature as to be likely to endanger life, or to cause grievous harm to some person for the purpose of facilitating either the commission of a crime or the flight of an offender who has committed or attempted to commit any such offence, is guilty of murder.",
        "In the instant case, the dividing line between armed robber and murder is very thin, if there is a dividing line at all.",
      ],
    },
    {
      id: "3640c43be82f7de8048530b1a738b1bb3f0e0787a9f497e9882011cf8b44eb9d",
      content:
        " See for instance Section 316 of the Criminal Code applicable to the Southern part of the country. In neither the case of attempted murder nor murder did the elements constituting the offence include the weapon used in the commission of the offence. In the same way, that the fact of a murder is provable by circumstantial evidence without the body of the deceased or trace thereof and in absence of a confessional statement by the accused, see R v. Sala (1938) 4 NACA 10; P v. Onufrejo 2yk (1955) 1 QB 388: the facts of attempted murder and murder can be proved without the weapon used in the commission of either offence.",
      score: 0.0006571555859409273,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Rev. King v. The State",
        court: "Supreme Court",
        year: "2016",
        area_of_law: [
          "Religion And The Law",
          "Religion And Law",
          "Nonprofit Law",
          "Ethics",
          "Criminal Law And Procedure",
          "Constitutional And Public Law",
          "Children And Women Law",
          "Action",
          "Appeal",
          "Pleadings",
          "Court",
          "Evidence",
          "Words And Phrases",
        ],
        source_id:
          "127847fe9ee2b542b29a3501232427a49259d8f8a77cd16bfe50f49ef391b0ba",
      },
      context: [
        "In neither the case of attempted murder nor murder did the elements constituting the offence include the weapon used in the commission of the offence.",
        "In the same way, that the fact of a murder is provable by circumstantial evidence without the body of the deceased or trace thereof and in absence of a confessional statement by the accused, see R v. Sala (1938) 4 NACA 10; P v. Onufrejo 2yk (1955) 1 QB 388: the facts of attempted murder and murder can be proved without the weapon used in the commission of either offence.",
      ],
    },
    {
      id: "cc0ec148d6a87985f6dc57f9eabe11845a0fe10d5219ba7517268022a886a139",
      content:
        '5 on the facts stated supra was not discredited. He was not even cross-examined on the material facts of identity, common design or shooting. It is sufficient if the murder was committed in the cause of prosecuting an unlawful purpose and which needs not necessarily be a felony, but must be of such a nature as likely to endanger human life. The 1st appellant in my view, was caught by the provision of Section 316(3) and (4) of the Criminal Code, which section provides:\n"316. Except as hereinafter set forth, a person who unlawfully kills another under any of the following circumstances, that is to say:\n(1) XXX XXX XXX XXX XXX XX\n(2) xxxxxxxxxxxxxxxxxxxx\n(3) if death is caused by means of an act done in the prosecution of an unlawful purpose, which act is of such nature as to be likely to enhuman life;\n(4) if the offender intends to do grievous harm to some person for the purpose of facilitating the commission of an offence which is such that the offender may be arrested without warrant, or for the purpose of facilitating the flight of an offender who has committed or attempted to commit any such offence; is guilty of murder.',
      score: 0.00037084854557178915,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Okosi And Anor. v. The State",
        court: "Supreme Court",
        year: "1989",
        area_of_law: ["Criminal Law And Procedure", "Evidence"],
        source_id:
          "188da74664704c4159c502a5e73777edcd48140296d82de2f663072d2d953469",
      },
      context: [
        "It is sufficient if the murder was committed in the cause of prosecuting an unlawful purpose and which needs not necessarily be a felony, but must be of such a nature as likely to endanger human life.",
        "Except as hereinafter set forth, a person who unlawfully kills another under any of the following circumstances, that is to say:\n(1) XXX XXX XXX XXX XXX XX\n(2) xxxxxxxxxxxxxxxxxxxx\n(3) if death is caused by means of an act done in the prosecution of an unlawful purpose, which act is of such nature as to be likely to enhuman life;\n(4) if the offender intends to do grievous harm to some person for the purpose of facilitating the commission of an offence which is such that the offender may be arrested without warrant, or for the purpose of facilitating the flight of an offender who has committed or attempted to commit any such offence; is guilty of murder.",
      ],
    },
    {
      id: "c3f285a6c1e75061161dd4020a2a9a919d6fab86dd9ce22fee788fb10d314d39",
      content:
        " Clearly, it is that section of the Criminal Code, which defines the specific intention to be established to prove a charge of murder. In Festus Amayo v. State (2001) 18 NWLR (Pt. 745) 251, this court considered section 316 of the Criminal Code, which states thus: “316. Except as hereinafter set forth, a person who unlawfully kills another under any of the following circumstances, that is to say -\n“(1) if the offender intends to cause the death of the person killed, or that of some other;\n(2) if the offender intends to do to the person killed or to some other person grievous harm.",
      score: 0.000295858655590564,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "John Agbo v. The State",
        court: "Supreme Court",
        year: "2006",
        area_of_law: [
          "Administrative And Government Law",
          "T",
          "Criminal Law",
          "Criminal Law And Procedure",
          "Children And Women Law",
          "Transportation Law",
          "Appeal",
          "Evidence",
        ],
        source_id:
          "1378577efb0bb4bbe7bd646e2fa686194cabe2fd3e4e20098918fa83617a7abf",
      },
      context: [
        " Clearly, it is that section of the Criminal Code, which defines the specific intention to be established to prove a charge of murder.",
      ],
    },
    {
      id: "5cda432fc3008ad6ce8ed245da3547ba39d1c2976f89037dc3f10de1ead77506",
      content:
        " is guilty of murder’.\nThe circumstances under which the accused killed the deceased came within the provisions of this sub-section. I am confirmed in this finding because as a woman experienced in the hazards of pregnancy if one takes her first throw of the deceased, a woman she knew to be pregnant, on the ground as a result of temper, there is no doubt that her second attack of the deceased after they had been separated and the deceased later went to take her head tie and her then throwing the deceased on the ground and kicking her on her pregnant belly was, to say the least, calculated and intended to kill the child in the womb and endanger the life of the deceased. I find the accused guilty of murder and convict her accordingly’. (italic is supplied)\nWe are satisfied, even after making allowance for the position and standing in life of the appellant, that there was not, in law, such provocation from the deceased as would justify the violent attack on the deceased and so reduce the offence to manslaughter.",
      score: 0.00029119261307641864,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Aga v. The State",
        court: "Supreme Court",
        year: "1976",
        area_of_law: [
          "Criminal Law And Procedure",
          "Customs And Law",
          "Children And Women La",
          "Interpretation Of Statute",
          "Words And Phrase",
        ],
        source_id:
          "c6da411e9166b1b6048b8c8f2d3ea01479bb05f0ddc813b312a1f1d858ba5c70",
      },
      context: [
        " is guilty of murder’.",
        "I find the accused guilty of murder and convict her accordingly’.",
      ],
    },
    {
      id: "eae044db1ad9f26956b733be08aa074fddafe6b9b3f91253205d89af556107ad",
      content:
        " Those decisions turn on the particular nature of the offence of murder. It was submitted that since, on a charge of murder, the court undoubtedly has power, under section 169 of the Criminal Procedure Act, to convict of attempted murder, it follows that an offence of which section 179 (1) of the Act does not enable the court to convict on a charge of murder cannot be one of which the subsection enables the court to convict on a charge of attempted murder, but there is a fallacy in this, in that the power to convict of an attempt is derived not from section 179 but from section 169, and that the words of section 179 are not apt to cover every case of an attempt to commit a substantive offence, as defined in section 4 of the Criminal Code.\nOur attention was drawn to R. v. Kanu (1949)12 W.",
      score: 0.0001911845029098913,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Agumadu v. The Queen",
        court: "High Court",
        year: "1963",
        area_of_law: [
          "Criminal Law And Procedure",
          "Interpretation Of Statute",
        ],
        source_id:
          "a09d2739f42d39eb2a71750d49bf5787d1a3b7e0d5f69528909dd9cfb5fa26ba",
      },
      context: [
        " Those decisions turn on the particular nature of the offence of murder.",
        "It was submitted that since, on a charge of murder, the court undoubtedly has power, under section 169 of the Criminal Procedure Act, to convict of attempted murder, it follows that an offence of which section 179 (1) of the Act does not enable the court to convict on a charge of murder cannot be one of which the subsection enables the court to convict on a charge of attempted murder, but there is a fallacy in this, in that the power to convict of an attempt is derived not from section 179 but from section 169, and that the words of section 179 are not apt to cover every case of an attempt to commit a substantive offence, as defined in section 4 of the Criminal Code.",
      ],
    },
    {
      id: "5f9e71e79e124956acdb10a5c22b27a8556fdc73b293fe8f8fcb48033b8d5a4c",
      content:
        " In the circumstances, I doubt and because I doubt the Appellant has to be given the benefit of that doubt. The available evidence is not of a quality that irresistibly compels to make an inference as to the guilt of the Appellant on the charge of conspiracy. Concomitantly, the conviction of the Appellant for the offence of conspiracy to commit murder is hereby set aside.\nWith regard to the conviction for the substantive counts of murder, the learned counsel on both sides of the divide have referred to the essential ingredients to establish in a charge of murder, namely:\n1. That the deceased is dead\n2.",
      score: 0.00012032173981424421,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Omoruyi v. The State",
        court: "Court Of Appeal",
        year: "2016",
        area_of_law: [
          "Criminal Law And Procedure",
          "Evidence",
          "Words And Phrases",
        ],
        source_id:
          "c18e73608e6568379341fd38b5da74409d204d869075a92de7a508ede0aa5130",
      },
      context: [
        "Concomitantly, the conviction of the Appellant for the offence of conspiracy to commit murder is hereby set aside.",
        "With regard to the conviction for the substantive counts of murder, the learned counsel on both sides of the divide have referred to the essential ingredients to establish in a charge of murder, namely:\n1.",
      ],
    },
    {
      id: "af1f60065f987250cb0793eb589a51dbf7c37c640453a4b5b661d0bd7aa98daa",
      content:
        '." Even in the case of ADEKUNLE v. STATE (SUPRA) which was cited by learned Counsel for the Respondent, my Lord, Mahmud Mohammed, JSC, set out the 3rd ingredients of the offence of murder as follows:-\n"(c) That the act or omission of the accused which caused the death of the deceased was intentional with knowledge that death or grievous bodily harm was its probable consequence."\nThe case which was also reported in (2006) 26 NSCQLR 1367 at PAGE 1379 - 1380, Mahmud Mohammed, JSC, said:-\n"The law is trite that where a person discharges a firearm unintentionally and without attendant criminal malice or negligence, he will be exempted from criminal responsibility both for the firing and for its consequences. See: IROMANTU v.',
      score: 0.00010598679364193231,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Ameh Richard v. The State",
        court: "Court Of Appeal",
        year: "2013",
        area_of_law: [
          "Criminal Law And Procedure",
          "Government And Administrative Law",
          "Evidence",
          "Interpretation Of Section",
          "Words And Phrases",
        ],
        source_id:
          "d905775a095923f093aa0e4897e8a20afa877a32f3ac5abdd9bd8f0cc30d8911",
      },
      context: [
        'Even in the case of ADEKUNLE v. STATE (SUPRA) which was cited by learned Counsel for the Respondent, my Lord, Mahmud Mohammed, JSC, set out the 3rd ingredients of the offence of murder as follows:-\n"(c) That the act or omission of the accused which caused the death of the deceased was intentional with knowledge that death or grievous bodily harm was its probable consequence."',
      ],
    },
    {
      id: "5d8c282efa3ef0172af500ab7c91b0c69aa09025fe84bf526f456005c052c40c",
      content:
        "\nLearned Counsel for the Respondent also reiterated the ingredients of the offence of murder by referring to the cases of Nwachukwu V The State (2002) 12 NWLR (pt.782) 543 at 568 - 569; Adava v. The State (2006) 9 NWLR (Pt.984) 152 at 167.\nThe Respondent submitted that there is no controversy as to the death of the deceased.",
      score: 0.00010046365059679374,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Oche Mattew v. The State",
        court: "Court Of Appeal",
        year: "2015",
        area_of_law: ["Criminal Law And Procedure", "Evidence"],
        source_id:
          "50a3f533d257e5245c09a5326da99de9db5242dcd04a7777c64c43fa4a94652a",
      },
      context: [
        "\nLearned Counsel for the Respondent also reiterated the ingredients of the offence of murder by referring to the cases of Nwachukwu V The State (2002) 12 NWLR (pt.782) 543 at 568 - 569; Adava v. The State (2006) 9 NWLR (Pt.984) 152 at 167.",
      ],
    },
    {
      id: "c5148c17fdde0146da26a8ac2623c1d451d2c7ba35904f5d1374edcdb5fa5692",
      content:
        '\nNow turning to the instant appeal, has the prosecution proved its case beyond reasonable doubt as to warrant a verdict of guilt against the Appellant? The Appellant was charged with an offence of murder under Section 316 of the Criminal Code Act, Cap.C38, Laws of the Federation of Nigeria, 2004 and punishable under Section 319 of the same code. Section 316 of the Criminal Code Act, provides as follows:-\n"Except as hereinafter set forth, a person who unlawfully kills another under any of the following circumstances, that is to say:-\n1. If the offender intends to cause the death of the person killed, or that of some other person;\n2. If the offender intends to do to the person killed or to some other person some grievous harm.',
      score: 6.861561996629462e-5,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Ameh Richard v. The State",
        court: "Court Of Appeal",
        year: "2013",
        area_of_law: [
          "Criminal Law And Procedure",
          "Government And Administrative Law",
          "Evidence",
          "Interpretation Of Section",
          "Words And Phrases",
        ],
        source_id:
          "d905775a095923f093aa0e4897e8a20afa877a32f3ac5abdd9bd8f0cc30d8911",
      },
      context: [
        "The Appellant was charged with an offence of murder under Section 316 of the Criminal Code Act, Cap.C38, Laws of the Federation of Nigeria, 2004 and punishable under Section 319 of the same code.",
      ],
    },
    {
      id: "0ae75a35ac020dcea9773fd2be2f669509e102a81892925d71f3bdf6ccab86cb",
      content:
        "\nMr. Familoni, learned Counsel for the Respondent submitted that it is not the law that motive and mens rea are essential ingredients of the offence of murder. According to the learned Counsel, all that the prosecution has to prove is any of the circumstances set out in Section 316 of the Criminal Code. In aid, learned Counsel cited NWALI v. THE STATE (1991) 3 NWLR (Pt.",
      score: 6.111022958066314e-5,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Ameh Richard v. The State",
        court: "Court Of Appeal",
        year: "2013",
        area_of_law: [
          "Criminal Law And Procedure",
          "Government And Administrative Law",
          "Evidence",
          "Interpretation Of Section",
          "Words And Phrases",
        ],
        source_id:
          "d905775a095923f093aa0e4897e8a20afa877a32f3ac5abdd9bd8f0cc30d8911",
      },
      context: [
        "\nMr. Familoni, learned Counsel for the Respondent submitted that it is not the law that motive and mens rea are essential ingredients of the offence of murder.",
      ],
    },
    {
      id: "edfadb3da6ca5cdd6c95c2f962489ffefb2a9aa837db3aef3b60a4b6ea70d452",
      content:
        "\nLearned counsel for the appellant argued that a sane person would not behave the way he did. He said there was no apparent reason why he should have killed his wife and in that manner. It is the law that motive is not a necessity for establishing a crime but when it is available it helps in its detection and proof. In fact part of the appellant’s statement to the police is that his wife was not co-operating with him, whatever that implied. However, the total absence of motive in the case of murder may be taken together with other circumstances which may tend to strengthen evidence of mental abnormality in order to establish insanity as required by law: see R.",
      score: 5.9880905610043555e-5,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Madjemu v. State",
        court: "Supreme Court",
        year: "2001",
        area_of_law: [
          "Criminal Law Procedure",
          "Criminal Law And Procedure",
          "Children And Women Law",
        ],
        source_id:
          "de7d68735c42674e99deb4feb46b0ab919db2c60564bc5f5c530c08749bcab48",
      },
      context: [
        "However, the total absence of motive in the case of murder may be taken together with other circumstances which may tend to strengthen evidence of mental abnormality in order to establish insanity as required by law: see R.",
      ],
    },
    {
      id: "fdf996a0e2e9241e37abcb1f9ec62e3bf3cb4aabb69913306c1fd68c4f1a039b",
      content:
        " Whether the trial court was right in convicting the Appellants for the offence of murder when it was apparent from the facts of the case and the totality of evidence adduced at the trial that the Appellant was on official assignment to the scene of conflict where the offence of murder was eventually committed.\n2. Whether the death of the victims in the afore-charge proffered against the Appellant cannot be described as collateral damages and excusable homicide instead of felonious homicide.\n3. Whether the lower court was right when it proceeded to convict and sentence the Appellant to death for the offence of murder without forensic certification and confirmation on the particular bullets that killed the victims and the guns they emanated from.",
      score: 5.142014560988173e-5,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Ameh Richard v. The State",
        court: "Court Of Appeal",
        year: "2013",
        area_of_law: [
          "Criminal Law And Procedure",
          "Government And Administrative Law",
          "Evidence",
          "Interpretation Of Section",
          "Words And Phrases",
        ],
        source_id:
          "d905775a095923f093aa0e4897e8a20afa877a32f3ac5abdd9bd8f0cc30d8911",
      },
      context: [
        " Whether the trial court was right in convicting the Appellants for the offence of murder when it was apparent from the facts of the case and the totality of evidence adduced at the trial that the Appellant was on official assignment to the scene of conflict where the offence of murder was eventually committed.",
        "Whether the lower court was right when it proceeded to convict and sentence the Appellant to death for the offence of murder without forensic certification and confirmation on the particular bullets that killed the victims and the guns they emanated from.",
      ],
    },
    {
      id: "6d1b10500126efb84a79ba31ed0eade0922e3142a72d0f160d0d96722750cd06",
      content:
        '\nIt is curious that the alleged "participes criminis" in this matter resiled from their potentially devastating evidence in the face of the Court. This is the view held by the Respondent and I must say that I share same view.\nThe Prosecution has been unable to provide direct, or circumstantial evidence pinning the Appellant to the commission of the crime of conspiracy to murder the deceased, Alhaja Kudirat Abiola. If there is anything to go by, it was PW2 who should have been charged with conspiracy to murder.\nAt page 14 paragraph 4.',
      score: 4.4586879084818065e-5,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Major Hamza Al-mustapha v. The State",
        court: "Court Of Appeal",
        year: "2013",
        area_of_law: [
          "Criminal Law And Procedure",
          "Children And Women Law",
          "Evidence",
          "Judgment And Order",
        ],
        source_id:
          "f68194033a034532c4583cee9eed79c919dafb9687470b7fc3b095f48de9e1fe",
      },
      context: [
        "The Prosecution has been unable to provide direct, or circumstantial evidence pinning the Appellant to the commission of the crime of conspiracy to murder the deceased, Alhaja Kudirat Abiola.",
        "If there is anything to go by, it was PW2 who should have been charged with conspiracy to murder.",
      ],
    },
    {
      id: "e277c63247ac65d7962b21e6727983c5a6a0768250671f61a1d464c5973940ac",
      content:
        ".”\nThe learned trial Judge then found the appellant guilty of murder but he did so after the following observations to which our attention has been specifically drawn, and these are:-\n“I have no doubt in my mind that when the accused threw the deceased on the ground and kicked her on the belly she did so with intent to prosecute an un-lawful purpose of causing the abortion of her pregnancy an act which she knew endangered life. Section 316(c) of the Criminal Code provides:\n‘Except as here-in after set forth a person who unlawfully kills another under any of the following circumstances that is to say...",
      score: 4.236889799358323e-5,
      metadata: {
        suit_number: "CA/09/1223",
        case_title: "Aga v. The State",
        court: "Supreme Court",
        year: "1976",
        area_of_law: [
          "Criminal Law And Procedure",
          "Customs And Law",
          "Children And Women La",
          "Interpretation Of Statute",
          "Words And Phrase",
        ],
        source_id:
          "c6da411e9166b1b6048b8c8f2d3ea01479bb05f0ddc813b312a1f1d858ba5c70",
      },
      context: [
        ".”\nThe learned trial Judge then found the appellant guilty of murder but he did so after the following observations to which our attention has been specifically drawn, and these are:-\n“I have no doubt in my mind that when the accused threw the deceased on the ground and kicked her on the belly she did so with intent to prosecute an un-lawful purpose of causing the abortion of her pregnancy an act which she knew endangered life.",
      ],
    },
  ],
  total_cases: 15,
};

export const dummyLegislationResult: LegislationResults = {
  search_id: "009506cf-fe7b-4097-a0d3-ecd0d1c76a4d",
  documents: [
    {
      id: "64e603f87f9261027ab86adc9c85f50a5e55d968576c8f3cd9c81662937e655e",
      content:
        "When a person who unlawfully kills another in circumstances which, but for the provisions of this section, would constitute murder does the act which causes death in the heat of passion caused by grave and sudden provocation, and before there is time for his passion to cool, he is guilty of manslaughter only.",
      score: 0.8877896,
      context: [
        "caused",
        "causes",
        "circumstances",
        "his",
        "kills",
        "only",
        "person",
        "provisions",
        "this",
        "unlawfully",
        "when",
      ],
      metadata: {
        document_title: "Criminal Code Act",
        part_title:
          "Offences against the person and Relating to Marriage and Parental Rights and Duties, and against the Reputation of Individuals",
        part: "5",
        section_number: "318",
      },
    },
  ],
  filter_elements: {
    document_title: ["Criminal Code Act"],
    section_number: ["318"],
  },
  total_legislation: 1,
};

export const dummyArticleResult: ArticleResults = {
  search_id: "009dd5f5-f820-4165-a879-e61b1b3a24f8",
  documents: [
    {
      id: "65fa19554cb3f4f7529a12f2804d06637cb45bc64f87dc75cc1303fc03fa9a15",
      content:
        " Insanity prevents the exercise of ones will and therefore a general defence in criminal law. Every person is presumed to be sane, until the contrary is proved. A person is exempted from criminal responsibility if it is proved that his insanity is such that: He did not understand what he was doing.\nHe did not know that he ought not to do the act or make the omission.\nHe was incapable of controlling his action. In this context insanity means either a state of mental disease or a state of natural mental infirmity.\nDefence of immaturity\nIt is an irrebuttable presumption of law that a child under seven years in age has no mens rea.",
      score: 0.99408895,
      context: [
        "criminal",
        "exempted",
        "exercise",
        "general",
        "his",
        "incapable",
        "insanity",
        "ones",
        "presumed",
        "prevents",
        "proved",
      ],
      metadata: {
        article_title: "Defences to Criminal Responsibility",
        year: 2018,
        author: "Learn Nigerian Law",
        area_of_law: [
          "Criminal Law, Evidence Law, Constitutional Law, Tort Law, Law of Intent ",
        ],
      },
    },
    {
      id: "b0f91fbe83d779fb8849062ea71fb94fa3ea5d90e803d8810540bbae7d852508",
      content:
        " Insanity prevents the exercise of ones will and therefore a general defence in criminal law. Every person is presumed to be sane, until the contrary is proved. A person is exempted from criminal responsibility if it is proved that his insanity is such that: He did not understand what he was doing.\nHe did not know that he ought not to do the act or make the omission.\nHe was incapable of controlling his action.",
      score: 0.99271095,
      context: [
        "criminal",
        "exempted",
        "exercise",
        "general",
        "his",
        "incapable",
        "insanity",
        "ones",
        "presumed",
        "prevents",
        "proved",
      ],
      metadata: {
        article_title: "Defences to Criminal Responsibility",
        year: 2018,
        author: "Learn Nigerian Law",
        area_of_law: [
          "Constitutional Law",
          "Criminal Law",
          "Evidence Law",
          "Law of Intent",
          "Tort Law",
        ],
      },
    },
    {
      id: "d77fc429bf294867f727377e638fc24c2a536430d7c65603c7765a8b4c998bba",
      content:
        " A person is exempted from criminal responsibility if it is proved that his insanity is such that: He did not understand what he was doing.\nHe did not know that he ought not to do the act or make the omission.\nHe was incapable of controlling his action. In this context insanity means either a state of mental disease or a state of natural mental infirmity.\nDefence of immaturity\nIt is an irrebuttable presumption of law that a child under seven years in age has no mens rea. He/she is exempted from criminal responsibility.",
      score: 0.98866826,
      context: [
        "controlling",
        "criminal",
        "doing",
        "exempted",
        "his",
        "incapable",
        "mental",
        "natural",
        "person",
        "proved",
        "responsibility",
        "this",
      ],
      metadata: {
        article_title: "Defences to Criminal Responsibility",
        year: 2018,
        author: "Learn Nigerian Law",
        area_of_law: [
          "Constitutional Law",
          "Criminal Law",
          "Evidence Law",
          "Law of Intent",
          "Tort Law",
        ],
      },
    },
    {
      id: "28529032841a458da0f7f0930bff633c393dd6f4a16ed1ef4592f4dd35750450",
      content:
        "Defences to Criminal Responsibility\nThe following defences are open to any person charged with an offence; Intention, motive\nMistake\nBona fide claim of right\nIntoxication\nInsanity\nDefence of immaturity\nProvocation\nIntention/Motive\nA person is not criminally responsible for an act or omission, which occurs independently of the exercise of his will or for an event which occurs by accident. An event occurs by accident if: It is too remote and indirect a consequence of the accused’s unlawful act or omission. A reasonable man in the shoes of the accused, would not have foreseen it as likely or probable. The accused person could not reasonably have foreseen as likely or probably. Illustration through cases: DTimbu Kohan (1968) H and W quarrelled violently. H became tired of the verbal exchanges, went outside the house and sat down. W followed H outside, berating him. It was dark. He picked up a light stick, aimed a moderate blow in the direction of W’s voice. The blow struck the little baby W was carrying in her arms on the head and killed it. Held the event is an accident in that the accused could not reasonably have foreseen it and did not in fact foresee it. State v Appoli (1970) A and B were pushing each other near a river, T warned them that they were playing a dangerous game. B pushed A further. A slipped, fell into the river and drowned. Rejecting a defence of accident, the court held that a reasonable person would have appreciated the danger of pushing another near a river in the particular circumstance. An act or omission which occurs independently out of the exercise of one’s will is an accident and this terms is in two senses. Of consequences due to some external agency over which the accused has no control e.g. a person riding a horse bolting against the will of the rider and without any fault on his part, knocks another person down.\nOf unintended consequence of a lawful or voluntary act, (e.g. where a man working with an axe and its head flies up and kills a bystander or where in a lawful game, e.g one of the parties in the boxing tournament kills his opponent.\nMistake\nMistakes as a defence to crime, are of two kinds: Mistake of law.\nMistake of facts.\nMistake of law\nIgnorance of the law does not afford any excuse for any act or omission which would otherwise constitute an offence, unless knowledge of the law by the offender is expressly declared to be an element of the offence Mistake of Law, also called ignorance of law, is an invalid defence. Except where knowledge of the law is an element of the offence charged. Thus a mistake of Law would be a valid defence in the following cases; action from a bona fide claim of right, action from execution of an erroneous sentence, process or warrant, action from Sentence or Process or warrant without jurisdiction, action from Irregular process or warrant. To avail a defence in such cases, the accused must act in good faith and in the belief that the sentence, process or warrant was issued with authority. Ogbu v R (1959) O was alleged to have given a bribe to D in order to induce him (D) to appoint O a village head and therefore a tax collector. O and D were both charged. O pleaded a mistake of law, contending that he did not know it was an offence to so bribe D and was acquitted. On appeal by the other accused (D). The Federal supreme Court expressed its opinion that it was not satisfied that the trial court was right in law in acquitting the first accused on those findings. Ignorance of law is a good defence where knowledge of the law by the offender is expressly declared to be an element of the offence. Example are: receiving stolen property, not knowing them to be stolen and ttering Counterfeit coins, not knowing them to be counterfeits. Mistake of facts\nA person who does or omits to do an act under an honest and reasonable but mistaken belief in the existence of any state of things is nor criminally responsible for the act or omission to any greater extent than if the real state of things had been such as he believed to exist, section 25, Criminal Code. Where there is a reasonable and honest mistake of fact the offence is treated as if the fact had been true. B reasonably mistakes D’s bicycle for his and takes it. The mistake must be such that any reasonable man would be likely to make the same mistake. It is a defence when the accused believes in a state of affairs, which if true, would justify the act done. In other words, an actor is not responsible for the consequence, which ultimately follow his/her act which results from a mistake on his/her part. Where Amuda shoots and kills at an object which he thinks is a dog or a ghost which turns out to be a man, he would not be treated as though he killed a dog or a ghost as the case may be. Note the limitation of the defence: the operation of this rule may be excluded by the express or implied provisions of the law relating to the subject. Bona fide claim of right\nA person is not criminally responsible as for offence relating to property, for an act done or omitted to be done by him with respect to any property in the exercise of an of right and without intention to defraud. Example: if a father takes away his illegitimate child from its mother who is reluctant to part with the child, he merely exercises his bona fide claim of right. He has a defence to child stealing. Cc. 23 & 371. Intoxication\nIf KJ allows himself to be intoxicated of his own free will, he is responsible for his acts and its consequences. Voluntary Intoxication is never an excuse in a crime. But if it is as to prevent a person from knowing what he was doing or that what he was doing was wrong; offender will be treated in the same way as a man, who is insane or under delusion as the case may be. Intoxication includes a state produced by drinking, drugs, narcotics etc. The cases where intoxication is raised as a defence are dealt with in the same way as insane. To avail a defence, therefore, the accused must show that he was so drunk at the time of the criminal act as to be incapable of forming the special intent in the crime. Intoxication is a defence if: Intoxication is caused by the negligent act of another.\nThe person charged was by reasons if intoxication insane temporarily or otherwise at the time of such act or omission.\nIn Ahmed v State 1999, Ogundare, JSC said: Intoxication per se is not a defence. To be a defence, it must be shown by the accused that the intoxication is not self-induced or that the extent of it rendered him at the time of the act or omission insane temporarily or otherwise, that is that he did not know2 what he was doing.\nIn Imo v State (1991), per Nnaemeka, JSC observed: For the defence of intoxication to be available to the accused person, as a defence, he must prove on a preponderance of evidence, that at the time of the act or omission, that is called in question, he was in such a state that he did not know that such an act or omission was wrong or did not know what he was doing. Furthermore, he has to prove either that the state of intoxication was not self induced or was caused without his consent by the malicious or neglected act of another person (s. 29 (2) (a) or that the extent of intoxication was so high that he was insane, temporarily or otherwise at the time of the act or omission (S, 29(2) (b))). There are two principles of law relating to this defence: The presumption of law that a person intends the natural consequences of his act.\nThe presumption of law that every person is sane.\nBoth presumptions are rebuttable. Evidence of drunkenness falling short of a proved incapacity in the accused to form the intent necessary to constitute the crime and merely establishing that his mind was affected by drink so that he more readily gave way to some violent passion does not rebut the presumption that a man intends the natural consequence of his act: See R v Owarey and Egbe Nkanu v State (1980). The burden of proving intoxication is on the accused person. The standard of proof is preponderance of evidence. Insanity\nYou have learned that sections 24 and 25 of the Criminal Code provide general defences to criminal responsibility. Thus no person can be held liable for acts or omissions which occur independently of the exercise of his will or by accident. Insanity prevents the exercise of ones will and therefore a general defence in criminal law. Every person is presumed to be sane, until the contrary is proved. A person is exempted from criminal responsibility if it is proved that his insanity is such that: He did not understand what he was doing.\nHe did not know that he ought not to do the act or make the omission.\nHe was incapable of controlling his action. In this context insanity means either a state of mental disease or a state of natural mental infirmity.\nDefence of immaturity\nIt is an irrebuttable presumption of law that a child under seven years in age has no mens rea. He/she is exempted from criminal responsibility. A child of 7 years and under 12 years of age is presumed to be incapable of crime unless a mischievous discretion is clearly proved. A male child under 12 years is presumed to be incapable of any offence involving sexual intercourse by him. Provocation\nThe term “provocation” used with reference to an offence of which an assault is an element, includes, except as hereinafter stated, any wrongful act, or insult of such a nature as to be likely when done to an ordinary person or in the presence of an ordinary person to another person who is under the immediate care, or to whom he stands in a conjugal, parental, filial, or fraternal, relation, or in the relation of master or servant, to deprive him of the power of self-control, and to induce him to assault the person by whom the act or insult is done or offered, (section 283 CC). A person is not criminally responsible for an assault committed upon a person who gives him provocation for the assault if he is in fact deprived by the provocation of the power of self-control, and acts upon it on the sudden and before there is time for the passion to cool; provided that the force used is not disproportionate to the provocation and is not intended and is not such as is likely to cause death or grievous harm, (section 284, CC).",
      score: 0.9459013,
      context: [
        "charged",
        "criminal",
        "criminally",
        "defences",
        "following",
        "his",
        "motive",
        "occurs",
        "open",
        "responsibility",
      ],
      metadata: {
        article_title: "Defences to Criminal Responsibility",
        year: 2018,
        author: "Learn Nigerian Law",
        area_of_law: [
          "Criminal Law, Evidence Law, Constitutional Law, Tort Law, Law of Intent ",
        ],
      },
    },
    {
      id: "bea0f3b7e421701cb735b224ef3d1fe6659b8a5ddde94a5549b3382a72d42220",
      content:
        " In this context insanity means either a state of mental disease or a state of natural mental infirmity.\nDefence of immaturity\nIt is an irrebuttable presumption of law that a child under seven years in age has no mens rea. He/she is exempted from criminal responsibility. A child of 7 years and under 12 years of age is presumed to be incapable of crime unless a mischievous discretion is clearly proved. A male child under 12 years is presumed to be incapable of any offence involving sexual intercourse by him.",
      score: 0.9341553,
      context: [
        "context",
        "exempted",
        "insanity",
        "irrebuttable",
        "means",
        "mens",
        "mental",
        "natural",
        "this",
        "years",
      ],
      metadata: {
        article_title: "Defences to Criminal Responsibility",
        year: 2018,
        author: "Learn Nigerian Law",
        area_of_law: [
          "Constitutional Law",
          "Criminal Law",
          "Evidence Law",
          "Law of Intent",
          "Tort Law",
        ],
      },
    },
  ],
  filter_elements: {
    article_title: ["Defences to Criminal Responsibility"],
    year: [2018],
    author: ["Learn Nigerian Law"],
    area_of_law: [
      "Constitutional Law",
      "Criminal Law",
      "Criminal Law, Evidence Law, Constitutional Law, Tort Law, Law of Intent ",
      "Evidence Law",
      "Law of Intent",
      "Tort Law",
    ],
  },
  total_articles: 9,
};

export const dummyLLMResult: AIResult = {
  llm: {
    replies: [
      "\n According to the provided context, the time limit for filing an election petition is 21 days after the declaration of election results, as stated in section 134(1) of the Electoral Act, 2010, as amended. Any cross-petition must also be filed within this time limit, as the Tribunal has already found that the result of the election being challenged was declared on March 28, 2015. An application for joinder submitted more than 100 days after the results were declared, as in the case of the appellants, is completely time-barred and cannot be entertained by the Tribunal. This principle of strict time limits applies to all election matters, as stated in the case of Okechukwu v. I. (Nigeria) 2016 LPELR-40385(SC). Additionally, the presentation of an election petition must be made to the secretary, as defined in paragraph 1 interpretation of the First schedule of the Electoral Act 2006, within 30 days, as stated in section 141 of the Electoral Act, 2006. Failure to do so without a valid reason may result in the petition being dismissed.",
    ],
  },
  retriever: {
    documents: [
      {
        id: "fb1489631784d2ecb1e45a7126fcd3c59efd720fddec7d669daaef3d5f77cec5",
        meta: {
          case_title: "Adetunji Akande v. I.N.E.c Ors",
          court: "Court of Appeal",
          year: "2011",
        },
      },
    ],
  },
};

export const dummyResults = new Array(15).fill({
  caseTitle: "John Doe vs Mike Doe",
  date: "1991-1-1",
  court: "High Court",
});

export const searchOptions: FilterOption[] = [
  { id: "cases", label: "Cases", options: [] },
  { id: "articles", label: "Articles", options: [] },
  { id: "legislations", label: "Legislation", options: [] },
  { id: "principles", label: "Principles", options: [] },
];

export const dummyCaseDetails = {
  caseData: {
    title: "Eyong Idam v. Federal Republic of Nigeria",
    summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus non quibusdam sit obcaecati earum illo esse iusto tempore adipisci veritatis aperiam vel, eum labore enim est placeat accusantium soluta architecto. \n Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius, ratione commodi vel sit, officiis distinctio natus temporibus rerum eveniet dolore nam aspernatur.\nDebitis sunt nam impedit eveniet possimus velit porro!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, beatae? Vero maiores enim id sequi deserunt ipsum eligendi soluta sapiente dolor sed? Amet ex facere saepe architecto necessitatibus rem similique?`,
    judgement: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut a repellat ratione nulla nobis nam voluptatum optio placeat expedita sequi, possimus illum quasi deleniti, nemo doloremque, sed cum? Architecto, sapiente. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, maiores, dicta officia consectetur, est nulla deleniti earum porro aliquam necessitatibus totam at atque. Dicta, culpa itaque tenetur dolore mollitia neque! Lorem ipsum dolor sit, amet consectetur adipisicing elit.\n Delectus totam molestias necessitatibus voluptatibus voluptates! Minus, in impedit! Incidunt quisquam earum doloribus mollitia, aspernatur quo veniam iste rem dolor ut totam. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, corrupti vero quos dolorum perspiciatis sequi voluptates quo molestiae delectus atque. \n Quas temporibus odit adipisci veniam, ea deleniti eligendi deserunt quaerat!`,
  },
  counselData: [],
  judgeData: [],
  precedentData: [
    {
      case_title: "EYONG IDAM v. FEDERAL REPUBLIC OF NIGERIA",
      caseid: 19,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) – SC. 662/2016    ",
      court_decided: "SUPREME COURT OF NIGERIA",
      date_decided: "FRIDAY,  13 MARCH, 2020",
      status: "Considered",
      treatment: "negative",
    },
    {
      case_title: "COMMISSIONER OF POLICE v. ANAYO UGWUMBA",
      caseid: 11,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) – CA/OW/508C/2018     ",
      court_decided: "COURT OF APPEAL",
      date_decided: "FRIDAY,  28 FEBRUARY, 2020",
      status: "Dismissed",
      treatment: "neutral",
    },
    {
      case_title:
        "ECONOMIC AND FINANCIAL CRIMES COMMISSION (EFCC)  v.  WOLFGANG REINL",
      caseid: 15,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) – SC. 428/2018    ",
      court_decided: "SUPREME COURT OF NIGERIA",
      date_decided: "FRIDAY,  24 JANUARY, 2020",
      status: "Considered",
      treatment: "positive",
    },
    {
      case_title: "ENGR. CHINEDUM O. ANYA  v. BARR. ONWUCHEKWA O. ANYA & ORS",
      caseid: 18,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) – SC. 116/2014  ",
      court_decided: "SUPREME COURT OF NIGERIA",
      date_decided: "FRIDAY,  24 JANUARY, 2020",
      status: "Considered",
      treatment: "neutral",
    },
    {
      case_title:
        "MR. ANTHONY IGWEMMA & ANOR  v.  CHINEDU BENJAMIN OBIDIGWE & ORS",
      caseid: 33,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) - SC.478/2019   ",
      court_decided: "SUPREME COURT OF NIGERIA",
      date_decided: "FRIDAY,  21 JUNE, 2019",
      status: "Considered",
      treatment: "positive",
    },
    {
      case_title: "HON. ADEKOLA ASHIMIYU  v.  ALHAJI OLANREWAJU BOLAJI & ORS",
      caseid: 24,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) - CA/L/226/2015   ",
      court_decided: "COURT OF APPEAL",
      date_decided: "FRIDAY,  21 FEBRUARY, 2020",
      status: "Dismissed",
      treatment: "positive",
    },
    {
      case_title: "KOLA AKANJI  v.  THE STATE",
      caseid: 28,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) - CA/IB/145C/2017    ",
      court_decided: "COURT OF APPEAL",
      date_decided: "FRIDAY,  21 FEBRUARY, 2020",
      status: "Considered",
      treatment: "positive",
    },
    {
      case_title:
        "OGBOMOSO SOUTH LOCAL GOVERNMENT  v.  ADECENTRO NIGERIA LIMITED & ORS",
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      caseid: 39,
      citation: "LEX (2020) - CA/IB/283/2009   ",
      court_decided: "COURT OF APPEAL",
      date_decided: "FRIDAY,  21 FEBRUARY, 2020",
      status: "Considered",
      treatment: "negative",
    },
    {
      case_title: "EYONG IDAM v. FEDERAL REPUBLIC OF NIGERIA",
      caseid: 19,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) – SC. 662/2016    ",
      court_decided: "SUPREME COURT OF NIGERIA",
      date_decided: "FRIDAY,  13 MARCH, 2020",
      status: "Considered",
      treatment: "neutral",
    },
    {
      case_title: "OLASUNKANMI GREG AGBABIAKA  v.  FIRST BANK OF NIGERIA PLC",
      caseid: 40,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) – SC. 6/2007   ",
      court_decided: "SUPREME COURT OF NIGERIA",
      date_decided: "FRIDAY,  28 JUNE, 2019",
      status: "Considered",
      treatment: "neutral",
    },
    {
      case_title: "EYONG IDAM v. FEDERAL REPUBLIC OF NIGERIA",
      caseid: 19,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) – SC. 662/2016    ",
      court_decided: "SUPREME COURT OF NIGERIA",
      date_decided: "FRIDAY,  13 MARCH, 2020",
      status: "Considered",
      treatment: "negative",
    },
    {
      case_title: "COMMISSIONER OF POLICE v. ANAYO UGWUMBA",
      caseid: 11,
      reason: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, autem. Consequuntur dolore numquam reiciendis, vero animi delectus perferendis molestias dicta in facere, minima fugiat exercitationem sequi tenetur? Placeat, veritatis sint!`,
      citation: "LEX (2020) – CA/OW/508C/2018     ",
      court_decided: "COURT OF APPEAL",
      date_decided: "FRIDAY,  28 FEBRUARY, 2020",
      status: "Dismissed",
      treatment: "neutral",
    },
  ],
};

export const mentionsList = [
  {
    label: "Article",
    name: "article",
  },
  {
    label: "Case",
    name: "case",
  },
  {
    label: "Legislation",
    name: "legislation",
  },
  {
    label: "Principle",
    name: "principle",
  },
];

export const menuIcon = {
  home: Search,
  library: Library,
  bench: Bench,
};

export const menuList: MenuLink[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Case Craft",
    path: "/brief_analyzer",
  },
  {
    label: "Library",
    path: "/library",
    children: [
      { label: "Cases", path: "/cases" },
      { label: "Legislations", path: "/legislations" },
      { label: "Articles", path: "/articles" },
    ],
  },
  {
    label: "Analytics",
    path: "/analytics",
    children: [
      { label: "Judges", path: "/judges" },
      { label: "Counsels", path: "/counsels" },
    ],
  },
  {
    label: "Taxonomy",
    path: "/taxonomy",
  },
];

// Sample data
export const topLevelAreas = [
  {
    id: 1,
    name: "Contract Law",
    document_breakdown: {
      case: 500,
      legislation: 50,
      article: 30,
    },
    children: [
      {
        id: 11,
        name: "Contract Formation",
        children: [
          {
            id: 111,
            name: "Offer and Acceptance",
            document_breakdown: {
              case: 100,
              legislation: 10,
              article: 5,
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Property Law",
    document_breakdown: {
      case: 300,
      legislation: 40,
      article: 20,
    },
    children: [],
  },
];

// Sample documents for concepts
export const conceptDocuments = {
  111: [
    {
      id: 1,
      title: "Smith v. Jones [2023] NGHC 123",
      type: "case",
      summary: "Leading case on offer and acceptance",
      citation: "NGHC 123",
      year: 2023,
      url: "/cases/smith-v-jones",
    },
  ],
};

// Data structure for the taxonomy
export const taxonomyData = {
  categories: [
    { id: "contract-law", name: "Contract Law" },
    { id: "property-law", name: "Property Law" },
    { id: "civil-procedure", name: "Civil Procedure" },
    { id: "customary-law", name: "Customary Law" },
    { id: "criminal-law", name: "Criminal Law" },
    { id: "electoral-law", name: "Electoral Law" },
    { id: "constitutional-law", name: "Constitutional Law" },
    { id: "inheritance-law", name: "Inheritance Law" },
    { id: "criminal-procedure", name: "Criminal Procedure" },
  ],
  subcategories: {
    "Contract Law": [
      { id: "contract-law-general", name: "Contract Law" },
      { id: "debt-recovery", name: "Debt recovery" },
      { id: "summary-judgment", name: "Summary judgment" },
      { id: "banking-contracts", name: "Banking Contracts" },
      { id: "notice-account-closure", name: "Notice of Account Closure" },
      { id: "defamation-claims", name: "Defamation Claims" },
      {
        id: "jurisdiction-contractual-disputes",
        name: "Jurisdiction in contractual disputes",
      },
      {
        id: "federal-high-court-jurisdiction",
        name: "Federal High Court jurisdiction",
      },
    ],
    "Property Law": [
      { id: "property-rights", name: "Property Rights" },
      { id: "land-tenure", name: "Land Tenure" },
      { id: "easements", name: "Easements" },
    ],
    "Civil Procedure": [
      { id: "civil-litigation", name: "Civil Litigation" },
      { id: "pre-action-protocol", name: "Pre-action Protocol" },
    ],
    // Other subcategories would be defined similarly
  },
  documents: {
    "Contract Law": [
      {
        id: "dec-oil-gas",
        name: "DEC Oil & Gas Limited v. Shell Nigeria Gas Limited",
        court: "Supreme Court of Nigeria",
        citation1: "LEX(2020)-SC.333/2010",
        citation2: "2019",
      },
      {
        id: "contract-doc-2",
        name: "Sample Contract Document 2",
        court: "Court of Appeal",
        citation1: "LEX(2019)-CA.222/2009",
        citation2: "2018",
      },
    ],
    "Debt recovery": [
      {
        id: "debt-doc-1",
        name: "Bank of Industry v. Global Manufacturing Ltd",
        court: "Federal High Court",
        citation1: "LEX(2021)-FHC.111/2015",
        citation2: "2020",
      },
    ],
    // Other documents would be defined similarly
  },
};
