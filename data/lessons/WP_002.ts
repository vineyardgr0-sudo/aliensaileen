import type { Lesson } from "@/types/lesson";

const WP_002: Lesson = {
  meta: {
    id: "WP_002",
    category: "workplace",
    lesson_number: 2,
    level: "intermediate",
    topic: "forms_of_address",
    status: "preparing",
    estimated_minutes: 10,
  },

  title: "호칭 정하기 — Settling on Forms of Address",

  context: {
    description:
      "You are unsure of someone's exact title, or whether 씨 is appropriate to use with them. In Korean workplaces, the term of address you choose functions as an instant hierarchy signal — before a single sentence of actual content is exchanged, the address term itself has already communicated where you think the relationship stands.",
    location: "Office — first interaction with a new colleague",
    interaction_time: "First 30–60 seconds",
    communication_style: "Ask before assuming — let the other person define the relationship",
    goal: [
      "Understand why address terms carry more weight than grammar in Korean workplaces",
      "Know when to ask rather than guess an address term",
      "Recognize the difference between traditional 직함+님 culture and flat 님 culture",
      "Use 저, 실례지만 어떻게 불러드리면 될까요? as the core transferable skill",
    ],
    cultural_note:
      "Korean workplace address culture is not monolithic. Some startups use a 님 culture — attaching 님 directly to first names (e.g., 민수님) regardless of rank, as a deliberate flattening of hierarchy. Other companies remain more traditional, where 직함+님 is expected for seniors and 씨 is reserved for peers. Because address norms vary by company, the safest and most broadly correct move — regardless of which culture you are in — is to ask before choosing. Asking itself signals awareness that hierarchy and address conventions are not assumed but confirmed.",
  },

  relationship_selection: {
    title: "Who are you trying to address?",
    description:
      "The risk of getting 호칭 wrong — and the safest fallback — depends on whether the other person is senior to you or a peer, and whether the company's address culture is already known.",
    options: [
      {
        id: "senior",
        label: "선배/상사 (Senior colleague)",
        summary: "Someone whose exact title you are unsure of, but who is clearly senior to you.",
        communication_traits: [
          "deferential",
          "ask before assuming",
          "직함+님 once title is known",
        ],
        archetype: "hierarchical_senior",
      },
      {
        id: "peer",
        label: "동료 (Peer colleague)",
        summary: "Someone at the same level, where 씨, 이름+님, or a first name could all be reasonable depending on company culture.",
        communication_traits: [
          "씨 as safe default",
          "이름+님 in 님-culture companies",
          "asking preference shows consideration",
        ],
        archetype: "peer_colleague",
      },
    ],
  },

  decision_point: {
    variants: {
      senior: {
        question:
          "직함을 잘 모르는 선배에게 처음 말을 걸 때, 어떻게 부르는 것이 가장 안전할까요?",
        options: [
          {
            text: "저, 실례지만 어떻게 불러드리면 될까요?",
            tag: "correct",
            feedback:
              "Asking directly hands the decision to the other person — the safest possible move when hierarchy or company address culture is unclear. Works in both traditional title-based companies and flat 님-culture startups.",
          },
          {
            text: "저기요, 잠시 시간 괜찮으세요?",
            tag: "awkward",
            feedback:
              "Avoids the title problem in the moment, but 저기요 is a generic attention-getter used with strangers or in service encounters — not how you address a colleague you will be working with.",
            explanation: {
              title: "Avoids the relationship rather than building it",
              description:
                "저기요 is not impolite. The problem is that it treats a future coworker like an anonymous person whose name or role does not matter. In a workplace, colleagues are expected to establish a stable way of addressing one another. Using 저기요 repeatedly signals that you are avoiding that step.",
              details: [
                "저기요 is appropriate for strangers or service interactions — not ongoing colleague relationships",
                "The problem is not politeness — it is the absence of relationship acknowledgment",
                "Repeated use with the same colleague starts to feel oddly distant over time",
              ],
              natural_alternative: ["저, 실례지만 어떻게 불러드리면 될까요?"],
            },
          },
          {
            text: "김민수 씨, 혹시 시간 괜찮으세요?",
            tag: "inappropriate",
            feedback:
              "씨 toward someone whose seniority is unknown assumes a peer-level relationship — and that the workplace accepts a 씨-based culture. If either assumption is wrong, the address term may feel inappropriate before the conversation even begins.",
            explanation: {
              title: "A relationship decision made without enough information",
              description:
                "The issue here is not grammar. 혹시 시간 괜찮으세요 is polite Korean. The problem is the address term 씨, which carries a specific social meaning: I have assessed your rank, and I have placed you at peer level or below. If that assessment is wrong — the person is senior, or the company uses titles — the assumption is already embedded in the address before a word of content has been exchanged.",
              details: [
                "씨 signals peer-level status — using it assumes a conclusion about hierarchy you do not yet have",
                "If the person is senior or the company uses titles, the assumption is inappropriate regardless of how polite the rest of the sentence is",
                "The issue is making a relationship decision without enough information",
              ],
              natural_alternative: ["저, 실례지만 어떻게 불러드리면 될까요?"],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Register is fine — the address term makes an unsupported social assumption",
                recommended: "해요체",
              },
            },
          },
        ],
      },

      peer: {
        question:
          "같은 직급의 동료에게 호칭을 정할 때, 어떻게 부르는 것이 가장 자연스러울까요?",
        options: [
          {
            text: "민수 씨, 이거 같이 봐주실 수 있어요?",
            tag: "correct",
            feedback:
              "이름+씨 with 해요체 is the standard, comfortable register between peers in traditional company cultures — and remains a safe, neutral choice even if you are unsure whether the company leans toward a 님 culture.",
          },
          {
            text: "민수님, 이거 같이 봐주실 수 있어요?",
            tag: "acceptable",
            feedback:
              "Not wrong — but whether this feels natural depends entirely on company culture. In startups with a deliberate 님 culture, this is perfectly correct. In more traditional offices, it can read as slightly more formal or 'startup-like' between same-level colleagues.",
            explanation: {
              title: "No universal answer — depends on company culture",
              description:
                "이름+님 attached directly to a first name is the standard in startups and companies with a deliberate 님 culture, where it is used to flatten hierarchy — everyone, regardless of rank, is addressed as 이름+님. In more traditional offices, 님 directly after a first name between same-level colleagues can read as slightly more formal compared to 씨. This is a case where there genuinely is not one universal correct answer — the right choice depends on which address culture the workplace has adopted.",
              details: [
                "이름+님 is the norm in startups with a 님 culture — correct in those contexts",
                "In traditional offices, 씨 is more natural between same-level peers",
                "Neither is grammatically wrong — the gap is cultural fit",
              ],
              natural_alternative: [
                "민수 씨, 이거 같이 봐주실 수 있어요? (safer default if culture is unknown)",
              ],
            },
          },
          {
            text: "김민수 씨, 이거 같이 봐주실 수 있으십니까?",
            tag: "awkward",
            feedback:
              "Using the full name+씨 with a colleague is uncommon in everyday office conversation. Combined with –습니까, the most formal speech style in Korean, it creates unnecessary social distance between peers.",
            explanation: {
              title: "Speech style suggests a different setting entirely",
              description:
                "–습니까 is a highly formal speech style usually reserved for official announcements, military contexts, customer service, or presentations. 해요체 is the natural register between colleagues. Combining 전체 이름+씨 with –습니까 signals an institutional formality that does not match the relationship — coworker asking coworker for help.",
              details: [
                "전체 이름+씨 (full name + 씨) is uncommon in everyday colleague conversation",
                "–습니까 belongs to official, presentation, or military contexts — not to peer requests",
                "The combination signals the wrong social setting for the actual relationship",
              ],
              natural_alternative: ["민수 씨, 이거 같이 봐주실 수 있어요?"],
              formality_analysis: {
                used: "습니다체",
                why_wrong: "습니다체 is appropriate for senior-directed speech or formal contexts — too formal for a peer request",
                recommended: "해요체",
              },
            },
          },
          {
            text: "어이, 이것 좀 봐줘.",
            tag: "inappropriate",
            feedback:
              "반말 with no address term assumes a closeness and mutual agreement on 반말 that has not been established — regardless of whether the company uses 씨 or 님 culture.",
            explanation: {
              title: "Assumes the wrong level of closeness",
              description:
                "The issue is not only 반말. It drops both the respectful address term (씨 or 님) and the honorific speech level (해요체), assuming a level of intimacy that peer relationships do not automatically carry. Even same-rank colleagues typically maintain 해요체 with 씨 or 님 unless 반말 has been explicitly agreed upon. 어이 as an address term is associated with very casual or even rude contexts in any company culture.",
              details: [
                "Dropping both address term and honorific assumes unestablished closeness",
                "어이 is associated with rude or overly casual address in Korean workplace contexts",
                "Even close colleagues typically wait for explicit mutual agreement before using 반말",
              ],
              natural_alternative: ["민수 씨, 이거 같이 봐주실 수 있어요?"],
              formality_analysis: {
                used: "반말",
                why_wrong: "반말 assumes established intimacy that has not been agreed upon between colleagues",
                recommended: "해요체",
              },
            },
          },
        ],
      },
    },
  },

  vocabulary: {
    senior: [
      {
        word: "실례지만",
        pronunciation: "/sil·lye·ji·man/",
        meaning: "Excuse me, but... — standard softener before a delicate request",
        usage:
          "Used before asking a potentially sensitive question — in this case, how to address someone. Signals that you are aware the question has weight before you ask it. Works with any sentence that could feel intrusive or presumptuous.",
        formality: "해요체",
      },
      {
        word: "불러드리다",
        pronunciation: "/bul·leo·deu·ri·da/",
        meaning: "To address (someone) — humble directional form",
        usage:
          "불러드리다 = 부르다 (to call/address) + 드리다 (humble, directional upward). The 드리다 signals the act flows toward the other person respectfully. In 어떻게 불러드리면 될까요, it asks what form of address you should give them — letting them define it.",
        formality: "해요체",
      },
      {
        word: "저,",
        pronunciation: "/jeo,/",
        meaning: "Um... — hesitation marker before a delicate question",
        usage:
          "저, as an opener (with a brief pause) softens the transition into a question that could otherwise feel abrupt. Different from 저 (I, first-person pronoun) — here it functions as a voiced hesitation, signaling politeness before something sensitive.",
        formality: "해요체",
      },
      {
        word: "팀장님",
        pronunciation: "/tim·jang·nim/",
        meaning: "Team Leader (honorific) — title + 님",
        usage:
          "직함 + 님 is the standard safe address structure once a title is known in traditional company cultures. 팀장 = team leader. 님 is the honorific suffix. Do not use until you know the actual title — guessing the wrong one can be more awkward than asking.",
        formality: "해요체",
      },
      {
        word: "직함",
        pronunciation: "/ji·kham/",
        meaning: "Job title — official organizational title",
        usage:
          "The official rank or title a person holds in a company. In Korean workplaces, 직함 is the primary basis for address terms in traditional cultures. Knowing someone's 직함 determines how to address them and how much deference to show.",
        formality: "해요체",
      },
    ],

    peer: [
      {
        word: "씨",
        pronunciation: "/ssi/",
        meaning: "Mr./Ms. (neutral, peer-level) — standard address suffix",
        usage:
          "이름 + 씨 is the standard address form for peers in traditional Korean workplaces. Not honorific, not casual — neutral. Appropriate for same-level colleagues when the company culture is not known. Precedes or follows the first name depending on context.",
        formality: "해요체",
      },
      {
        word: "님",
        pronunciation: "/nim/",
        meaning: "Honorific suffix — attached to names or titles",
        usage:
          "In traditional workplace culture, 님 follows job titles (팀장님, 과장님). In 님-culture startups, 님 is attached directly to first names (민수님) for everyone regardless of rank, as a deliberate flattening gesture. Which usage applies depends on the company.",
        formality: "해요체",
      },
      {
        word: "같이 봐주다",
        pronunciation: "/ga·chi bwa·ju·da/",
        meaning: "To take a look together — collaborative request phrasing",
        usage:
          "A common peer-to-peer request phrase. 같이 (together) makes the request feel collaborative rather than directive. 봐주다 (to look at something for someone) is softer than 보다 (to look). Together they are the natural phrasing for 'can you look at this with me?'",
        formality: "해요체",
      },
      {
        word: "편하세요?",
        pronunciation: "/pyeon·ha·se·yo?/",
        meaning: "Is it comfortable/preferred? — polite preference check",
        usage:
          "Used in 어떻게 불러드리는 게 편하세요? — 'what form of address is most comfortable for you?' Between peers, 편하세요 is warmer and more collaborative than formal phrasing, making the question feel like a genuine preference check rather than a bureaucratic request.",
        formality: "해요체",
      },
      {
        word: "호칭",
        pronunciation: "/ho·ching/",
        meaning: "Form of address — the term used to address or refer to someone",
        usage:
          "호칭 encompasses all terms of address: titles, names, suffixes, and pronouns. In Korean workplaces, 호칭 is not purely linguistic — it encodes hierarchy, relationship, and company culture simultaneously. Getting 호칭 wrong is a social signal before any content is exchanged.",
        formality: "해요체",
      },
    ],
  },

  phrases: {
    senior: [
      {
        korean: "저, 실례지만 어떻게 불러드리면 될까요?",
        pronunciation: "jeo, sil·lye·ji·man eo·tteo·ke bul·leo·deu·ri·myeon doel·kka·yo?",
        english: "Um, excuse me — how should I address you?",
        why_it_works:
          "The safest opener when hierarchy or company address culture is unclear. 저, adds a brief hesitation that signals awareness before a delicate question. 실례지만 frames it as something you know requires permission. 불러드리면 places the decision with the other person. All three elements together communicate: I know this question has weight, and I am not assuming the answer.",
        awkward: {
          korean: "저기요, 어떻게 부르면 될까요?",
          pronunciation: "jeo·gi·yo, eo·tteo·ke bu·reu·myeon doel·kka·yo?",
          label: "Too generic",
          why_awkward:
            "저기요 is a stranger-address term — used to flag down someone you do not know, typically in service or public contexts. Using it with a colleague signals no relationship exists. 부르다 instead of 불러드리다 also drops the humble direction — the question is no longer asking what you should give them, but what form works. Both together remove the relational awareness that makes the correct phrase work.",
        },
      },
      {
        korean: "팀장님, 잠시 시간 괜찮으실까요?",
        pronunciation: "tim·jang·nim, jam·si si·ga·ni gwaen·cha·neu·sil·kka·yo?",
        english: "Team Leader, do you have a moment?",
        why_it_works:
          "직함+님 is the standard safe address structure once the title is confirmed in traditional company cultures. 잠시 (briefly) signals you are aware of their time. 실까요 (the tentative form) is softer than 세요? — appropriate when making a request of someone senior. Use this after establishing the address term — not before.",
        awkward: {
          korean: "선배님, 잠시 시간 괜찮으세요?",
          pronunciation: "seon·bae·nim, jam·si si·ga·ni gwaen·cha·neu·se·yo?",
          label: "Too generic",
          why_awkward:
            "선배님 is a safe fallback when no specific title is known — but it is a category term (person who entered before me), not a title. In traditional companies, specific titles (팀장님, 과장님) are preferred over category terms once you know them. 선배님 works if the specific title is truly unknown, but is less precise than asking and then using the actual title.",
        },
      },
      {
        korean: "앞으로 어떻게 불러드리면 좋을지 여쭤봐도 될까요?",
        pronunciation: "a·peu·ro eo·tteo·ke bul·leo·deu·ri·myeon jo·eul·ji yeo·jjwo·bwa·do doel·kka·yo?",
        english: "May I ask how I should address you going forward?",
        why_it_works:
          "A more deliberate version for first meetings — frames it as an ongoing relationship question rather than a one-time fix. 앞으로 (going forward) signals you are thinking about the relationship long-term. 여쭤봐도 될까요 is the humble form of asking permission to ask — appropriate when the question itself carries relational weight.",
        awkward: {
          korean: "어떻게 부를까요?",
          pronunciation: "eo·tteo·ke bu·reul·kka·yo?",
          label: "Too casual",
          why_awkward:
            "어떻게 부를까요 drops all the softening layers — 저,, 실례지만, the humble 불러드리다, and the permission-asking structure. The result is grammatically natural but socially abrupt — it puts the question to someone senior without the framing that signals awareness of the relationship dynamic.",
        },
      },
    ],

    peer: [
      {
        korean: "민수 씨, 이거 같이 봐주실 수 있어요?",
        pronunciation: "min·su ssi, i·geo ga·chi bwa·ju·sil su i·sseo·yo?",
        english: "Min-su, could you take a look at this with me?",
        why_it_works:
          "이름+씨 with 해요체 — comfortable default between same-rank colleagues in traditional cultures, and a safe fallback when company address culture is unclear. 같이 봐주실 수 있어요 is collaborative and polite without being formal — the right register for a peer-to-peer request.",
        awkward: {
          korean: "민수야, 이거 좀 봐줘.",
          pronunciation: "min·su·ya, i·geo jom bwa·jwo.",
          label: "Too casual",
          why_awkward:
            "–야 is the 반말 vocative particle — used to call someone's attention in casual or intimate contexts. 이거 좀 봐줘 is also 반말. Both together assume a level of closeness that has not been established. This register is natural between close friends, but between colleagues who have not agreed on 반말, it skips the relationship-building step entirely.",
        },
      },
      {
        korean: "혹시 어떻게 불러드리는 게 편하세요?",
        pronunciation: "hok·si eo·tteo·ke bul·leo·deu·ri·neun ge pyeon·ha·se·yo?",
        english: "By the way, what would you prefer I call you?",
        why_it_works:
          "Even between peers, asking shows consideration — especially useful in newer companies, startups, or mixed-culture teams where the norm is not immediately obvious. 혹시 softens the question so it does not feel like a formal inquiry. 편하세요 frames it as a preference rather than a rule, making the exchange feel collaborative.",
        awkward: {
          korean: "뭐라고 부르면 돼요?",
          pronunciation: "mwo·ra·go bu·reu·myeon dwae·yo?",
          label: "Too generic",
          why_awkward:
            "뭐라고 부르면 돼요 is direct and natural Korean, but the tone is more casual than careful. 혹시 어떻게 불러드리는 게 편하세요 treats the question as something the other person gets to decide — 뭐라고 부르면 돼요 treats it more like a practical logistics question. Between peers the gap is small, but the latter is more considerate.",
        },
      },
      {
        korean: "그냥 이름으로 불러도 괜찮을까요?",
        pronunciation: "geu·nyang i·reu·meu·ro bul·leo·do gwaen·cha·neul·kka·yo?",
        english: "Would it be okay if I just called you by your name?",
        why_it_works:
          "Offers a lighter, more informal option while still framing it as a question — keeping the peer relationship collaborative rather than one-sided. 그냥 (just, simply) signals you are suggesting something natural, not asking permission for something presumptuous. Appropriate once you have already established basic rapport.",
        awkward: {
          korean: "그냥 이름으로 부를게요.",
          pronunciation: "geu·nyang i·reu·meu·ro bu·reul·ge·yo.",
          label: "Lacks relationship specificity",
          why_awkward:
            "부를게요 (I will call you) is a declaration rather than a question — it does not give the other person a choice. The difference between 불러도 괜찮을까요 and 부를게요 is the difference between checking and informing. Between colleagues who have not yet established this norm, checking is more appropriate.",
        },
      },
    ],
  },

  dialogue: {
    senior: [
      {
        speaker: "나",
        side: "user",
        korean: "저, 실례지만 어떻게 불러드리면 될까요?",
        english: "Um, excuse me — how should I address you?",
      },
      {
        speaker: "선배",
        side: "colleague",
        korean: "아, 저는 팀장이에요. 팀장님이라고 불러주시면 돼요.",
        english: "Oh, I'm the team leader. You can just call me Team Leader.",
      },
      {
        speaker: "나",
        side: "user",
        korean: "네, 알겠습니다. 팀장님, 잘 부탁드립니다.",
        english: "Okay, understood. Team Leader, looking forward to working with you.",
      },
      {
        speaker: "선배",
        side: "colleague",
        korean: "네, 저도요. 편하게 물어보세요.",
        english: "Likewise. Feel free to ask me anything.",
      },
    ],

    peer: [
      {
        speaker: "나",
        side: "user",
        korean: "민수 씨, 이거 같이 봐주실 수 있어요?",
        english: "Min-su, could you take a look at this with me?",
      },
      {
        speaker: "동료",
        side: "colleague",
        korean: "네, 잠시만요. 어떤 부분이요?",
        english: "Sure, one moment. Which part?",
      },
      {
        speaker: "나",
        side: "user",
        korean: "이 표 부분이요. 혹시 어떻게 불러드리는 게 편하세요? 그냥 이름으로 불러도 괜찮을까요?",
        english: "This table part. By the way, what would you prefer I call you? Is it okay if I just use your name?",
      },
      {
        speaker: "동료",
        side: "colleague",
        korean: "네, 편하게 부르세요!",
        english: "Sure, feel free!",
      },
    ],
  },

  tone_guidance: {
    senior: {
      avoid:
        "씨 toward someone whose seniority is unknown — or 저기요 as a long-term substitute for an actual address term. Both signal either wrong assumptions or deliberate avoidance.",
      neutral:
        "저기요, 잠시 시간 괜찮으세요? — avoids the wrong assumption in the moment, but treats the colleague as an anonymous person rather than building a relationship.",
      correct:
        "저, 실례지만 어떻게 불러드리면 될까요? — asks directly, lets the other person define the relationship, works in both traditional and 님-culture workplaces.",
      tone_summary:
        "When in doubt, ask. The hesitation marker 저, and the humble verb 불러드리다 together signal awareness that this is a delicate question — and that awareness is itself the correct social move. Letting the other person choose the address term is read as respect for hierarchy, not as uncertainty.",
      spectrum: [
        { label: "반말", position: 0, recommended: false },
        { label: "해요체", position: 50, recommended: true },
        { label: "습니다체", position: 100, recommended: false },
      ],
    },

    peer: {
      avoid:
        "반말 with no address term at all — assumes unestablished closeness regardless of company culture. 어이 as an address term is additionally associated with rude or overly casual contexts.",
      neutral:
        "이름+님 — correct in startups with a 님 culture, but may read as slightly more formal or ideologically 'startup-like' in traditional offices between same-level colleagues.",
      correct:
        "이름+씨 with 해요체 as safe default. Alternatively, 이름+님 if the company has an established 님 culture. Asking about preference (혹시 어떻게 불러드리는 게 편하세요?) is good practice in either case.",
      tone_summary:
        "There is no single universal answer for peer address terms — it depends on company culture. 이름+씨 is the safer default when the norm is unknown. Once the norm is established, following it consistently matters more than the specific form. Asking shows you understand that address culture is company-specific, not universal.",
      spectrum: [
        { label: "반말", position: 0, recommended: false },
        { label: "해요체", position: 50, recommended: true },
        { label: "습니다체", position: 100, recommended: false },
      ],
    },
  },

  quiz: {
    senior: [
      {
        type: "fill_blank",
        question: "Complete — the safest opener when a senior's title is unknown",
        prefix: "저, 실례지만 어떻게",
        blank: "불러드리면",
        suffix: " 될까요?",
        answer: "불러드리면",
        hint: "불러___면",
      },
      {
        type: "fill_blank",
        question: "Complete — title + honorific suffix for a team leader (after title is confirmed)",
        prefix: "",
        blank: "팀장님",
        suffix: ", 잠시 시간 괜찮으실까요?",
        answer: "팀장님",
        hint: "팀장___",
      },
    ],

    peer: [
      {
        type: "fill_blank",
        question: "Complete — standard peer address suffix in traditional companies",
        prefix: "민수",
        blank: "씨",
        suffix: ", 이거 같이 봐주실 수 있어요?",
        answer: "씨",
        hint: "___",
      },
      {
        type: "fill_blank",
        question: "Complete — polite way to offer using just a first name (question form)",
        prefix: "그냥 이름으로",
        blank: "불러도",
        suffix: " 괜찮을까요?",
        answer: "불러도",
        hint: "불러___",
      },
    ],
  },
};

export default WP_002;
