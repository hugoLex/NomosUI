import { LinkProps, SearchResult, AIResult } from "@app/types";

export const searchURL = "https://lexasearch.lexanalytics.ai/api";

export const aiURL = "https://llmsearch.lexanalytics.ai/api";

export const dummySearchResult: SearchResult = {
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
};

export const dummyLLMResult: AIResult = {
  replies: ["What"],
  meta: {
    case_title: "john v doe",
    court: "high court",
    year: "1993",
  },
};

export const dummyResults = new Array(15).fill({
  caseTitle: "John Doe vs Mike Doe",
  date: "1991-1-1",
  court: "High Court",
});
