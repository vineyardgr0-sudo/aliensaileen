import type { Lesson } from "@/types/lesson";

const DL_005: Lesson = {
  meta: {
    id: "DL_005",
    category: "daily",
    lesson_number: 5,
    level: "intermediate",
    topic: "meeting_partners_mother",
    status: "preparing",
    estimated_minutes: 10,
  },

  title: "Meeting Your Partner's Mother for the First Time",

  context: {
    description:
      "You arrive at your partner's family home for the first time. The mother opens the door. You have 5–10 seconds to make a first impression. In Korea, this moment carries enormous social weight — how you speak in this window signals your upbringing, your character, and your respect for the family hierarchy.",
    location: "Partner's family home — front door",
    interaction_time: "5–10 seconds",
    communication_style: "Formal warmth — hierarchy acknowledged, emotion present",
    goal: [
      "Greet in the correct register for the relationship",
      "Signal respect without sounding stiff or scripted",
      "Create a warm first impression within the appropriate formality level",
      "Show cultural literacy through the right ritual phrases",
    ],
    cultural_note:
      "In Korea, meeting your partner's mother for the first time carries significant social weight. 처음 뵙겠습니다 is the non-negotiable ritual opener — skipping it signals poor upbringing even if she seems warm. Formality is expected first; you earn casualness over time. With your own mother, the opposite is true — 반말 is the language of belonging. The same greeting lands completely differently depending on who opens the door.",
  },

  relationship_selection: {
    title: "Who opens the door?",
    description:
      "The same moment — arriving at the door — requires a completely different register depending on who is standing there. Select who you are greeting today.",
    options: [
      {
        id: "future_mother_in_law",
        label: "예비 장모님 (Partner's Mother)",
        summary: "High-stakes first meeting — hierarchical, formal warmth expected",
        communication_traits: ["formal", "hierarchical", "respectful", "careful"],
        archetype: "hierarchical_elder",
      },
      {
        id: "your_mother",
        label: "어머니 (Your Own Mother)",
        summary: "Deep intimacy — no formality needed, pure unconditional warmth",
        communication_traits: ["intimate", "casual", "warm", "unconditional"],
        archetype: "intimate_family",
      },
    ],
  },

  decision_point: {
    variants: {
      future_mother_in_law: {
        question:
          "예비 장모님 opens the door. You bow. Which expression is most appropriate as your first words?",
        options: [
          {
            text: "처음 뵙겠습니다. 잘 부탁드립니다.",
            tag: "correct",
            feedback:
              "Perfect — the ritual first-meeting phrase pair. Formal respect with genuine warmth. This is exactly what Korean elders expect.",
          },
          {
            text: "안녕하세요! 반가워요~",
            tag: "neutral",
            feedback:
              "Safe, but missing the ritual opener. Korean elders notice when 처음 뵙겠습니다 is skipped — it signals the meeting wasn't mentally prepared for.",
            explanation: {
              title: "해요체 works, but the opener matters",
              description:
                "안녕하세요 is technically correct. But skipping 처음 뵙겠습니다 omits the ritual acknowledgment of a first meeting — which Korean elders notice and internally note.",
              details: [
                "처음 뵙겠습니다 = 'I am meeting you for the first time' — a ritual phrase, not just a greeting",
                "Omitting it reads as though you didn't prepare for the significance of this meeting",
                "Works only if your partner told you in advance that their mother is very casual",
              ],
              natural_alternative: ["처음 뵙겠습니다, 반갑습니다", "처음 뵙겠습니다. 잘 부탁드립니다."],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Not wrong — just missing the essential ritual first-meeting phrase",
                recommended: "습니다체",
              },
            },
          },
          {
            text: "어, 안녕하세요~",
            tag: "wrong",
            feedback:
              "어 as a opener signals lack of mental preparation. In a high-stakes first meeting, even silence + a bow is better than a casual filler word.",
            explanation: {
              title: "어 signals you weren't ready",
              description:
                "어 is an informal hesitation particle — the Korean equivalent of 'uh' as a greeting. Starting a high-stakes first meeting this way communicates that you haven't mentally prepared for the significance of the moment.",
              details: [
                "어 is a casual hesitation filler — inappropriate as a formal opener",
                "Korean elders read this as lack of preparation or indifference",
                "A bow in silence followed by 처음 뵙겠습니다 is far stronger",
              ],
              natural_alternative: ["처음 뵙겠습니다", "(bow first, then speak)"],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Casual hesitation opener in a maximum-formality context",
                recommended: "습니다체",
              },
            },
          },
        ],
      },

      your_mother: {
        question:
          "You arrive home and your own mother opens the door. Which feels most natural as your first words?",
        options: [
          {
            text: "나 왔어, 엄마.",
            tag: "correct",
            feedback:
              "Natural and warm — pure intimacy. This is exactly what returning home to your mother sounds like in Korean.",
          },
          {
            text: "안녕하세요, 어머니.",
            tag: "wrong",
            feedback:
              "Too formal for your own mother. 해요체 with your own mother signals emotional distance — she would find this strange or cold.",
            explanation: {
              title: "Formal speech with your own mother creates distance",
              description:
                "In Korean family dynamics, 반말 with parents is the norm for intimate relationships. Using 해요체 with your own mother signals emotional withdrawal — as if something is wrong between you.",
              details: [
                "Korean children use 반말 with parents in everyday intimate settings",
                "해요체 at home can signal you're upset, emotionally distant, or trying to create space",
                "어머니 is used for formal occasions — or when addressing someone else's mother",
              ],
              natural_alternative: ["나 왔어, 엄마", "엄마, 나야"],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Formal register creates unnatural emotional distance with intimate family",
                recommended: "반말",
              },
            },
          },
          {
            text: "처음 뵙겠습니다.",
            tag: "wrong",
            feedback:
              "This phrase means 'I am meeting you for the first time.' Using it with your own mother would be bizarre — a joke, or a sign something is very wrong.",
            explanation: {
              title: "처음 뵙겠습니다 is for strangers — not your mother",
              description:
                "This ritual phrase literally acknowledges that you are meeting someone for the first time. Using it with someone you've known your entire life would be deeply strange — either a dark joke or a signal of complete emotional rupture.",
              details: [
                "처음 뵙겠습니다 = formal first-meeting phrase for strangers and elders",
                "Using it with your own mother is the equivalent of introducing yourself to her",
                "She would laugh, worry, or both — not a natural greeting in any circumstance",
              ],
              natural_alternative: ["나 왔어, 엄마", "엄마, 나야"],
              formality_analysis: {
                used: "습니다체",
                why_wrong: "First-meeting formal phrase used with someone you've known your whole life",
                recommended: "반말",
              },
            },
          },
        ],
      },
    },
  },

  vocabulary: {
    future_mother_in_law: [
      {
        word: "처음 뵙겠습니다",
        pronunciation: "/cheo·eum bwep·get·seum·ni·da/",
        meaning: "How do you do (ritual first-meeting phrase)",
        usage:
          "Non-negotiable opener for formal first meetings with elders. Always delivered with a bow. Skipping it is noticed and remembered.",
        formality: "습니다체",
      },
      {
        word: "잘 부탁드립니다",
        pronunciation: "/jal bu·tak·deu·rim·ni·da/",
        meaning: "I look forward to your kind regard",
        usage:
          "Paired with 처음 뵙겠습니다. 드리다 (humble giving verb) signals you are in the lower social position — essential with elders.",
        formality: "습니다체",
      },
      {
        word: "감사드립니다",
        pronunciation: "/gam·sa·deu·rim·ni·da/",
        meaning: "I am grateful (deferential form)",
        usage:
          "More deferential than 감사합니다. 드리다 replaces 하다 when showing deference to an elder. The correct choice for a formal first visit.",
        formality: "습니다체",
      },
      {
        word: "말씀",
        pronunciation: "/mal·sseum/",
        meaning: "Words / speech (honorific of 말)",
        usage:
          "말씀 많이 들었습니다 = 'I have heard a great deal about you.' Using 말씀 instead of 말 signals you are applying the correct honorific register.",
        formality: "습니다체",
      },
      {
        word: "별거 아니지만",
        pronunciation: "/byeol·geo a·ni·ji·man/",
        meaning: "It is nothing special, but...",
        usage:
          "Real Korean gift-giving humility phrase. What native speakers actually say on a first visit — more natural than 변변찮은 거지만 in spoken Korean.",
        formality: "습니다체",
      },
      {
        word: "인사드리다",
        pronunciation: "/in·sa·deu·ri·da/",
        meaning: "To offer a greeting (humbly)",
        usage:
          "Humble form of 인사하다. Used when greeting an elder or superior — 드리다 signals you are the one giving deference. Natural in son-in-law speech.",
        formality: "습니다체",
      },
      {
        word: "뵙다",
        pronunciation: "/bwep·da/",
        meaning: "To meet / see (honorific of 보다)",
        usage:
          "Honorific form of 보다/만나다. Used exclusively when meeting elders or superiors. 이렇게 뵙게 되어 = 'to have come to meet you like this.'",
        formality: "습니다체",
      },
      {
        word: "진심으로",
        pronunciation: "/jin·si·meu·ro/",
        meaning: "Sincerely / from the heart",
        usage:
          "Adds genuine sincerity without breaking formal register. 진심으로 감사드립니다 lands warmer than plain 감사드립니다 — appropriate for a significant first meeting.",
        formality: "습니다체",
      },
    ],

    your_mother: [
      {
        word: "나 왔어",
        pronunciation: "/na wa·sseo/",
        meaning: "I'm home",
        usage:
          "Arrival signal in Korean family life. Not a greeting — a safety confirmation. Two words that tell your mother: I am back, I am fine, you can stop waiting.",
        formality: "반말",
      },
      {
        word: "밥은",
        pronunciation: "/ba·beun/",
        meaning: "Food? / Have you eaten?",
        usage:
          "One-word health check. In Korean family communication, eating = wellbeing. 밥은? is never about food — it is a compressed question meaning: are you taking care of yourself? The shorter it gets, the closer the relationship.",
        formality: "반말",
      },
      {
        word: "어디야",
        pronunciation: "/eo·di·ya/",
        meaning: "Where are you?",
        usage:
          "Location check that encodes worry. 어디야 is not surveillance — it is the Korean mother's way of saying she needs to place you somewhere safe in her mind. The question functions as a worry management system.",
        formality: "반말",
      },
      {
        word: "왜 이렇게",
        pronunciation: "/wae i·reo·ke/",
        meaning: "Why like this / why so —",
        usage:
          "Opener for mild scolding. 왜 이렇게 늦게 와 = 'why are you so late.' In Korean mother-son communication, this phrasing is not a question — it is relief expressed as complaint. The care is inside the scolding.",
        formality: "반말",
      },
      {
        word: "걱정 마",
        pronunciation: "/geok·jeong ma/",
        meaning: "Stop worrying",
        usage:
          "A son's reassurance to his mother. Compressed form of 걱정하지 마 — the 하지 is dropped in natural spoken 반말. Shorter = more real. 걱정 마 is spoken; 걱정하지 마 is slightly performed.",
        formality: "반말",
      },
      {
        word: "아프지 마",
        pronunciation: "/a·peu·ji ma/",
        meaning: "Don't get sick",
        usage:
          "The highest-register care expression in Korean mother language. Health is the central value in Korean family communication — 아프지 마 is what Korean mothers say instead of 'I love you.' Three syllables. Everything in them.",
        formality: "반말",
      },
      {
        word: "엄마",
        pronunciation: "/eom·ma/",
        meaning: "Mom",
        usage:
          "Intimate address term for one's own mother. Using 어머니 with your own mother in everyday speech signals emotional distance — as if something is wrong. 엄마 is the default register between a mother and her adult child at home.",
        formality: "반말",
      },
      {
        word: "나 여기 있어",
        pronunciation: "/na yeo·gi it·seo/",
        meaning: "I'm right here",
        usage:
          "Presence confirmation. In Korean family dynamics, physically confirming your location is a form of emotional reassurance. It means: I am close, I have not disappeared, you do not need to worry about where I am.",
        formality: "반말",
      },
    ],
  },

  phrases: {
    future_mother_in_law: [
      {
        korean: "처음 뵙겠습니다. 잘 부탁드립니다.",
        pronunciation: "cheo·eum bwep·get·seum·ni·da. jal bu·tak·deu·rim·ni·da.",
        english: "How do you do. I look forward to your kind regard.",
        why_it_works:
          "The non-negotiable ritual pair. 처음 뵙겠습니다 marks the formality of the moment. 잘 부탁드립니다 signals humility and future goodwill. Skipping either one is noticed by Korean elders.",
        awkward: {
          korean: "안녕하세요! 처음 만나서 반가워요~",
          pronunciation: "an·nyeong·ha·se·yo! cheo·eum man·na·seo ban·ga·wo·yo~",
          why_awkward:
            "만나서 반가워요 uses 만나다 (casual verb) instead of 뵙다 (honorific). On a high-stakes first meeting, this registers as someone who does not know the rules — or did not prepare.",
        },
      },
      {
        korean: "말씀 많이 들었습니다.",
        pronunciation: "mal·sseum ma·ni deu·reot·seum·ni·da.",
        english: "I have heard a great deal about you.",
        why_it_works:
          "말씀 (honorific for 말) signals you are applying the correct register. Tells her your partner has spoken of her with warmth — a quiet compliment within formal speech.",
        awkward: {
          korean: "얘기 많이 들었어요.",
          pronunciation: "yae·gi ma·ni deu·reo·sseo·yo.",
          why_awkward:
            "얘기 is casual vocabulary — the informal shortening of 이야기. Using it instead of 말씀 with an elder signals you missed the register. The meaning is identical; the respect level is not.",
        },
      },
      {
        korean: "초대해 주셔서 진심으로 감사드립니다.",
        pronunciation: "cho·dae·hae ju·syeo·seo jin·si·meu·ro gam·sa·deu·rim·ni·da.",
        english: "I am sincerely grateful that you have invited me into your home.",
        why_it_works:
          "감사드립니다 is more deferential than 감사합니다 — 드리다 signals you are the one giving deference. 진심으로 adds sincerity without breaking formal register.",
        awkward: {
          korean: "와줘서 감사해요.",
          pronunciation: "wa·ju·seo gam·sa·hae·yo.",
          why_awkward:
            "와줘서 inverts the relationship — it thanks her for coming to you, when she is the host. This is a factual error in social positioning. 초대해 주셔서 correctly places her as the one giving, you as the one receiving.",
        },
      },
      {
        korean: "별거 아니지만, 작은 선물을 가져왔습니다.",
        pronunciation: "byeol·geo a·ni·ji·man, ja·geun seon·mu·reul ga·jyeo·wat·seum·ni·da.",
        english: "It is nothing special, but I have brought a small gift.",
        why_it_works:
          "Real Korean gift-giving humility — 별거 아니지만 is what native speakers actually say on a first visit. Downplaying the gift is ritual respect, not false modesty.",
        awkward: {
          korean: "선물 사왔어요. 마음에 드셨으면 좋겠어요.",
          pronunciation: "seon·mul sa·wa·sseo·yo. ma·eu·me deu·syeo·sseu·myeon jo·ket·sseo·yo.",
          why_awkward:
            "Saying 선물 사왔어요 without a humility phrase sounds direct and slightly boastful in Korean culture. Skipping 별거 아니지만 removes the ritual modesty that is expected — even required — when presenting a gift to an elder.",
        },
      },
      {
        korean: "이렇게 뵙게 되어 정말 반갑습니다.",
        pronunciation: "i·reo·ke bwep·ge doe·eo jeong·mal ban·gap·seum·ni·da.",
        english: "I am truly glad to be meeting you like this.",
        why_it_works:
          "이렇게 grounds the greeting in the present moment. More natural in spoken Korean than 뵙게 되어 alone — it acknowledges the shared situation.",
        awkward: {
          korean: "만나서 너무 반가워요!",
          pronunciation: "man·na·seo neo·mu ban·ga·wo·yo!",
          why_awkward:
            "너무 반가워요 reads as overly enthusiastic without the weight of a formal first meeting. 너무 in this register feels emotionally uncontrolled — Korean formal speech values restraint over enthusiasm.",
        },
      },
      {
        korean: "앞으로도 자주 인사드릴 수 있으면 좋겠습니다.",
        pronunciation: "a·peu·ro·do ja·ju in·sa·deu·ril su i·seu·myeon jo·ket·seum·ni·da.",
        english: "I hope I will have the chance to greet you often going forward.",
        why_it_works:
          "인사드리다 (to offer a greeting, humbly) is the natural phrase for a son-in-law expressing intent to visit respectfully. Avoids 관계 wording — warm and real.",
        awkward: {
          korean: "앞으로 잘 지내봐요.",
          pronunciation: "a·peu·ro jal ji·nae·bwa·yo.",
          why_awkward:
            "잘 지내봐요 uses 봐요 — a casual softening ending suited to peers. Said to an elder on a first meeting, it undercuts the formality and sounds like something said to a new coworker, not a partner's parent.",
        },
      },
    ],
    your_mother: [
      {
        korean: "나 왔어.",
        pronunciation: "na wa·sseo.",
        english: "I'm home.",
        why_it_works:
          "Arrival announcement in 반말 — no greeting, no fanfare. In Korean households, this two-word signal is how a son tells his mother he is safe. The brevity is not coldness — it is the language of belonging.",
        awkward: {
          korean: "어머니, 귀가하였습니다.",
          pronunciation: "eo·meo·ni, gwi·ga·ha·yeot·seum·ni·da.",
          why_awkward:
            "귀가하였습니다 is written bureaucratic Korean — the kind you'd find in an official report. Said to your own mother at home, it would feel either like a joke or a sign of serious emotional distance. 나 왔어 is the only real answer here.",
        },
      },
      {
        korean: "밥은?",
        pronunciation: "ba·beun?",
        english: "Food?",
        why_it_works:
          "One word, maximum meaning. A Korean mother asking 밥은? is not asking about a meal — she is running a health check. Eating = wellbeing in Korean family logic. The shorter the question, the more familiar the relationship.",
        awkward: {
          korean: "식사는 하셨나요?",
          pronunciation: "sik·sa·neun ha·syeon·na·yo?",
          why_awkward:
            "식사 (formal: meal) and 하셨나요 (honorific past question) belong to a different social situation — a junior asking a superior, or a waiter asking a customer. Said by a son to his own mother, it creates absurd formality in a space designed for none.",
        },
      },
      {
        korean: "어디야?",
        pronunciation: "eo·di·ya?",
        english: "Where are you?",
        why_it_works:
          "Location check disguised as a simple question. In Korean mother–son communication, 어디야 is not surveillance — it is worry encoded as control. The question means: I need to know you are somewhere safe.",
        awkward: {
          korean: "현재 위치가 어디세요?",
          pronunciation: "hyeon·jae wi·chi·ga eo·di·se·yo?",
          why_awkward:
            "현재 위치 (current location) is the language of GPS navigation or a police report. 어디세요 is honorific. Using both with your own mother removes every trace of intimacy — she would wonder if she was being formally interrogated.",
        },
      },
      {
        korean: "왜 이렇게 늦게 와.",
        pronunciation: "wae i·reo·ke neut·ge wa.",
        english: "Why are you so late.",
        why_it_works:
          "Mild scolding that functions as relief. Korean mothers do not say 'I was worried about you' — they say this instead. The complaint is the care. No question mark: it is not a question, it is an exhale.",
        awkward: {
          korean: "당신이 늦어서 매우 걱정했습니다.",
          pronunciation: "dang·sin·i neu·jeo·seo mae·u geok·jeong·haet·seum·ni·da.",
          why_awkward:
            "당신 (formal 'you') is never used between family members in Korean — it is distancing and stiff, more fitting between strangers or in formal writing. Korean mothers express worry as behavior (scolding, commands), not as direct emotional statements.",
        },
      },
      {
        korean: "나 여기 있어. 걱정 마.",
        pronunciation: "na yeo·gi it·seo. geok·jeong ma.",
        english: "I'm right here. Stop worrying.",
        why_it_works:
          "Presence confirmation — the Korean son's way of saying 'I'm fine' without saying it. 걱정 마 (stop worrying) without 하지 is more compressed and more real. Spoken, not performed.",
        awkward: {
          korean: "저는 괜찮습니다. 걱정하지 마십시오.",
          pronunciation: "jeo·neun gwaen·chan·seum·ni·da. geok·jeong·ha·ji ma·sip·si·o.",
          why_awkward:
            "마십시오 is the highest-formality command form — used in public announcements and official signs. Telling your own mother 걱정하지 마십시오 is the verbal equivalent of sending her a formal notice. The intimacy collapses completely.",
        },
      },
      {
        korean: "아프지 마.",
        pronunciation: "a·peu·ji ma.",
        english: "Don't get sick.",
        why_it_works:
          "The highest expression of care in Korean mother language. Not 'I love you' — 아프지 마. Health is the central value in Korean family communication. Three syllables. Everything in them.",
        awkward: {
          korean: "건강에 유의하시기 바랍니다.",
          pronunciation: "geon·gang·e yu·ui·ha·si·gi ba·ram·ni·da.",
          why_awkward:
            "유의하시기 바랍니다 is the language of public health campaigns and institutional notices — the Korean equivalent of 'Please be advised to maintain your health.' Said to a family member, it has zero emotional content. 아프지 마 has all of it.",
        },
      },
    ],
  },

  dialogue: {
    future_mother_in_law: [
      {
        speaker: "YOU",
        side: "user",
        korean: "처음 뵙겠습니다. 잘 부탁드립니다.",
        english: "How do you do. I humbly ask for your kind regard.",
      },
      {
        speaker: "어머님",
        side: "other",
        korean: "어서 와요. 말은 많이 들었어요. 반가워요.",
        english: "Come in. I've heard so much about you. I'm glad you're here.",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "감사합니다. 변변찮은 거지만 가져왔습니다.",
        english: "Thank you. It's nothing much, but I brought this.",
      },
      {
        speaker: "어머님",
        side: "other",
        korean: "어머, 뭘 이런 걸. 고마워요. 들어와서 앉아요.",
        english: "Oh my, you didn't need to. Thank you. Come in and sit down.",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "말씀 많이 들었습니다. 뵙게 되어서 정말 반갑습니다.",
        english: "I've heard so much about you. I'm truly glad to meet you.",
      },
      {
        speaker: "어머님",
        side: "other",
        korean: "저도 반가워요. 자주 와요. 밥은 먹었어요?",
        english: "I'm glad to meet you too. Come over often. Have you eaten?",
      },
    ],

    your_mother: [
      {
        speaker: "YOU",
        side: "user",
        korean: "나 왔어, 엄마.",
        english: "I'm home, Mom.",
      },
      {
        speaker: "어머니",
        side: "other",
        korean: "어, 왔어? 밥은 먹었어?",
        english: "Oh, you're back? Have you eaten?",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "응, 먹었어. 엄마 얼굴 보고 싶어서 왔어.",
        english: "Yeah, I ate. I came because I wanted to see you.",
      },
      {
        speaker: "어머니",
        side: "other",
        korean: "그래? 고생 많았어. 들어와서 쉬어.",
        english: "Really? You must be tired. Come in and rest.",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "응. 보고 싶었어.",
        english: "Yeah. I missed you.",
      },
      {
        speaker: "어머니",
        side: "other",
        korean: "나도. 자주 와. 여기 네 집이야.",
        english: "Me too. Come more often. This is your home.",
      },
    ],
  },

  tone_guidance: {
    future_mother_in_law: {
      avoid:
        "반말 (나 왔어, 반가워) — Signals a complete lack of situational awareness. Would be read as disrespectful or as someone raised without manners.",
      neutral:
        "해요체 without 처음 뵙겠습니다 (안녕하세요, 반가워요) — Safe but missing the ritual acknowledgment. Korean elders notice and internally note when 처음 뵙겠습니다 is skipped.",
      correct:
        "습니다체 ritual opener + 해요체 follow-up (처음 뵙겠습니다. 잘 부탁드립니다. → 말씀 많이 들었어요.) — Formal respect as the entry point, with human warmth woven in.",
      tone_summary:
        "With a partner's mother, formal respect is non-negotiable as the entry point. You earn casualness over time — you don't start there. Begin with 습니다체 ritual phrases, then shift naturally to warmer 해요체 as the atmosphere relaxes.",
      spectrum: [
        { label: "반말", position: 0, recommended: false },
        { label: "해요체", position: 50, recommended: false },
        { label: "습니다체", position: 100, recommended: true },
      ],
    },

    your_mother: {
      avoid:
        "습니다체 (처음 뵙겠습니다, 감사합니다) — Creates a strange, cold emotional distance. If used sincerely, signals something is seriously wrong in the relationship.",
      neutral:
        "해요체 (어머니, 왔어요) — Technically correct but feels oddly formal between a child and their own mother in a daily arrival context.",
      correct:
        "반말 (나 왔어, 엄마. 보고 싶었어.) — Unconditional intimacy. No register distance, no performance — just presence and warmth.",
      tone_summary:
        "With your own mother, 반말 is the language of belonging. Formal register creates distance — even a well-intentioned 해요체 can read as emotional withdrawal. The simpler and more direct, the warmer it lands.",
      spectrum: [
        { label: "반말", position: 0, recommended: true },
        { label: "해요체", position: 50, recommended: false },
        { label: "습니다체", position: 100, recommended: false },
      ],
    },
  },

  quiz: {
    future_mother_in_law: [
      {
        type: "fill_blank",
        question: "Complete the ritual first-meeting opener — 'How do you do'",
        prefix: "처음",
        blank: "뵙겠습니다",
        suffix: ".",
        answer: "뵙겠습니다",
        hint: "뵙___습니다",
      },
      {
        type: "fill_blank",
        question: "Complete — 'I humbly ask for your kind regard'",
        prefix: "잘 부탁",
        blank: "드립니다",
        suffix: ".",
        answer: "드립니다",
        hint: "드___니다",
      },
      {
        type: "fill_blank",
        question: "Complete — 'I've heard so much about you' (honorific form)",
        prefix: "말씀 많이",
        blank: "들었습니다",
        suffix: ".",
        answer: "들었습니다",
        hint: "들었___니다",
      },
    ],

    your_mother: [
      {
        type: "fill_blank",
        question: "Complete the natural arriving-home phrase — 'I'm home, Mom'",
        prefix: "나",
        blank: "왔어",
        suffix: ", 엄마.",
        answer: "왔어",
        hint: "왔__",
      },
      {
        type: "fill_blank",
        question: "Complete — 'I missed you' in 반말",
        prefix: "보고",
        blank: "싶었어",
        suffix: ".",
        answer: "싶었어",
        hint: "싶___어",
      },
      {
        type: "fill_blank",
        question: "Complete — 'I came because I wanted to see your face'",
        prefix: "엄마 얼굴 보고 싶어서",
        blank: "왔어",
        suffix: ".",
        answer: "왔어",
        hint: "왔__",
      },
    ],
  },
};

export default DL_005;
