import type { Lesson } from "@/types/lesson";

const DL_006: Lesson = {
  meta: {
    id: "DL_006",
    category: "daily",
    lesson_number: 6,
    level: "intermediate",
    topic: "meeting_mothers_in_law",
    status: "preparing",
    estimated_minutes: 10,
  },

  title: "Meeting Your Boyfriend's Mother for the First Time",

  context: {
    description:
      "You are visiting your boyfriend's home for the first time. His mother opens the door. In Korea, this moment is not just a greeting — it is an audition. She is evaluating how you carry yourself, how you speak, and whether you belong in her family. The language you use in the next few minutes will be remembered.",
    location: "Boyfriend's family home — front door, then inside",
    interaction_time: "First 10–30 minutes",
    communication_style: "Respectful warmth — never too familiar, never too stiff",
    goal: [
      "Greet correctly without overshooting formality or undershooting respect",
      "Show you understand Korean family hierarchy without being scripted",
      "Express appreciation naturally — through food, not through excessive praise",
      "Signal that you are comfortable here without acting like you already belong",
    ],
    cultural_note:
      "The 예비 시어머님 relationship carries a specific social weight in Korean culture. She is not just a mother — she is the gatekeeper of a family you are trying to enter. Excessive emotional warmth reads as performance. Excessive formality reads as distance. The target is respectful naturalness: warm enough to feel present, restrained enough to feel appropriate. Food is the safest and most natural way to show appreciation — complimenting her cooking is more meaningful than any verbal praise.",
  },

  relationship_selection: {
    title: "Who are you speaking to?",
    description:
      "The same visit, the same home, the same day. But the language shifts completely depending on who is in the room. Choose your relationship.",
    options: [
      {
        id: "future_mother_in_law",
        label: "예비 시어머님 (Boyfriend's Mother)",
        summary: "First impression — respectful warmth, appropriate distance, no overfamiliarity",
        communication_traits: ["respectful", "warm", "restrained", "careful"],
        archetype: "hierarchical_elder",
      },
      {
        id: "your_mother",
        label: "친어머니 (Your Own Mother)",
        summary: "Debrief after — the same event, completely different language",
        communication_traits: ["intimate", "unfiltered", "casual", "real"],
        archetype: "intimate_family",
      },
    ],
  },

  decision_point: {
    variants: {
      future_mother_in_law: {
        question:
          "She has just served 김치찌개 she made. You want to express that it is delicious. Which feels most natural and appropriate?",
        options: [
          {
            text: "어머님, 정말 맛있어요. 김치찌개를 이렇게 잘 끓이시는 분은 처음 봤어요.",
            tag: "correct",
            feedback:
              "Specific, warm, and grounded in the food — not in abstract praise. 어머님 as an address signals you have accepted the relationship. The compliment is particular, not performed.",
          },
          {
            text: "감사합니다. 잘 먹겠습니다.",
            tag: "neutral",
            feedback:
              "Polite and correct — but a missed opportunity. 잘 먹겠습니다 is the standard phrase before eating. It signals gratitude but not personal appreciation. She cooked for you specifically; a more personal response would land warmer.",
            explanation: {
              title: "Correct register, missed connection",
              description:
                "잘 먹겠습니다 is what you say before any meal in Korea — restaurant, family dinner, anywhere. It is always correct. But when someone has cooked for you personally on a significant first visit, the expected response is something more specific. The food is how she expressed care. Acknowledge the food, not just the meal.",
              details: [
                "잘 먹겠습니다 = 'I will eat well' — standard pre-meal phrase, not personal",
                "She cooked 김치찌개 specifically — that is a personal act",
                "A compliment about the food itself signals that you noticed her effort",
              ],
              natural_alternative: ["정말 맛있어요", "어머님 김치찌개, 정말 맛있어요"],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Register is correct — the specificity is missing",
                recommended: "해요체",
              },
            },
          },
          {
            text: "어머님, 저 사실 요리를 잘 못해서요. 이런 음식 만드시는 분이 너무 부러워요.",
            tag: "wrong",
            feedback:
              "Bringing up your own cooking ability — or inability — on a first visit shifts the focus to you. She didn't ask. And 부러워요 (I envy you) can read as either flattery or a subtle complaint. The compliment should be about her, not a detour through yourself.",
            explanation: {
              title: "The compliment became about you",
              description:
                "Starting a compliment with information about your own limitations draws attention away from her. 너무 부러워요 is casual and can feel either too intimate or faintly sycophantic. A first visit is not the moment to share personal information about yourself unprompted — it reads as nervous filling of space.",
              details: [
                "부러워요 (I envy you) is casual — better suited to a peer, not a first meeting with an elder",
                "Mentioning you can't cook introduces a personal detail she didn't ask for",
                "Compliments on a first visit should be about the person, not about yourself",
              ],
              natural_alternative: ["정말 맛있어요", "어머님, 이거 정말 맛있어요. 또 먹고 싶어요."],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Register is fine — the content redirected to the speaker",
                recommended: "해요체",
              },
            },
          },
        ],
      },

      your_mother: {
        question:
          "You are home after the visit. Your mother asks how it went. Which is most natural?",
        options: [
          {
            text: "생각보다 괜찮았어. 근데 좀 긴장했어.",
            tag: "correct",
            feedback:
              "Real and honest — the way you'd actually debrief with your own mother. 생각보다 괜찮았어 is the classic Korean understatement for 'it went well.' The follow-up 근데 좀 긴장했어 adds authenticity.",
          },
          {
            text: "어머니, 오늘 방문이 생각보다 원만하게 진행되었어요.",
            tag: "wrong",
            feedback:
              "원만하게 진행되었어요 is the language of a business report. Your mother wants to know how you actually felt — not a procedural summary of the visit.",
            explanation: {
              title: "This is your mother, not a supervisor",
              description:
                "Korean adult children use 반말 with their own parents in everyday contexts. Switching to 해요체 at home signals emotional distance — something is off. And 원만하게 진행되었어요 (it proceeded smoothly) is not how anyone describes a first family visit to someone they are close to.",
              details: [
                "반말 is the default register between adult children and their own parents",
                "원만하게 진행 is workplace language — never used in intimate family talk",
                "Your mother would find this phrasing strange before she found it polite",
              ],
              natural_alternative: ["괜찮았어", "생각보다 좋았어"],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Formal register with own mother creates distance and sounds unnatural",
                recommended: "반말",
              },
            },
          },
          {
            text: "잘 모르겠어. 어머님이 뭘 생각하시는지.",
            tag: "neutral",
            feedback:
              "Honest and real — this is what many daughters-in-law actually feel after a first visit. The uncertainty is legitimate. But as a conversation opener it leaves your mother without enough to respond to. 생각보다 괜찮았어 + 근데 걱정돼 lands more naturally.",
            explanation: {
              title: "Real feeling, incomplete sentence",
              description:
                "잘 모르겠어 is genuine — first visits are genuinely hard to read. But as an opening answer it does not give your mother a hook to respond to. Korean family conversation tends to move through statements, not open uncertainty. Start with what you observed, then add the uncertainty.",
              details: [
                "잘 모르겠어 is honest but leaves the conversation with nowhere to go",
                "Your mother will ask a follow-up — the answer is the real sentence",
                "Better to lead with what happened, then express what you don't know",
              ],
              natural_alternative: ["그냥 봐서는 잘 모르겠어", "괜찮으셨던 것 같은데, 확실히는 모르겠어"],
              formality_analysis: {
                used: "반말",
                why_wrong: "Register is correct — content is incomplete",
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
        word: "어머님",
        pronunciation: "/eo·meo·nim/",
        meaning: "Mother — honorific address for boyfriend's mother",
        usage:
          "The correct address form when speaking to your boyfriend's mother. 어머니 is the base form; 님 adds a layer of honorific distance. Using it signals you understand the relationship and have accepted a position within it.",
        formality: "해요체",
      },
      {
        word: "잘 부탁드립니다",
        pronunciation: "/jal bu·tak·deu·rim·ni·da/",
        meaning: "I ask to be received well",
        usage:
          "Standard closing phrase after 처음 뵙겠습니다. 드리다 signals the request flows upward — to an elder, not between equals. Often said with a slight bow.",
        formality: "습니다체",
      },
      {
        word: "정말 맛있어요",
        pronunciation: "/jeong·mal ma·si·sseo·yo/",
        meaning: "This is really delicious",
        usage:
          "The most natural way to compliment food in Korean. Simple, specific, and warm. In a first visit context, complimenting the food is complimenting her care — more genuine than abstract emotional praise.",
        formality: "해요체",
      },
      {
        word: "많이 배웠어요",
        pronunciation: "/ma·ni bae·wo·sseo·yo/",
        meaning: "I learned a lot",
        usage:
          "Said after receiving advice, help, or wisdom from an elder. Appropriate when 어머님 shares something — a recipe, a family story, a piece of advice. Signals you were listening and that she mattered.",
        formality: "해요체",
      },
      {
        word: "괜찮으시면",
        pronunciation: "/gwaen·cha·neu·si·myeon/",
        meaning: "If it's alright with you — polite conditional",
        usage:
          "Used before making any small request or suggestion to an elder. 괜찮으시면 제가 도와드릴게요 = 'If it's alright with you, I'd like to help.' The conditional makes the offer non-presumptuous.",
        formality: "해요체",
      },
      {
        word: "도와드릴게요",
        pronunciation: "/do·wa·deu·ril·ge·yo/",
        meaning: "I'll help you — humble offer",
        usage:
          "Humble form of helping an elder. 드릴게요 (I will give/do for you, upward) vs 줄게요 (I will give, sideways). On a first visit, offering to help with dishes or preparation signals good manners without overstepping.",
        formality: "해요체",
      },
      {
        word: "처음 뵙겠습니다",
        pronunciation: "/cheo·eum bwep·get·seum·ni·da/",
        meaning: "How do you do — ritual first-meeting phrase",
        usage:
          "The non-negotiable ritual opener for any formal first meeting with an elder. Skipping it is noticed. It tells her: I prepared for this meeting. I understand its weight.",
        formality: "습니다체",
      },
      {
        word: "또 먹고 싶어요",
        pronunciation: "/tto meok·go si·peo·yo/",
        meaning: "I want to eat this again",
        usage:
          "More powerful than 맛있어요 alone. Wanting to eat something again is an honest signal that the compliment is genuine. Korean mothers respond well to this because it implies a future return visit.",
        formality: "해요체",
      },
    ],

    your_mother: [
      {
        word: "생각보다",
        pronunciation: "/saeng·gak·bo·da/",
        meaning: "More than I expected — comparative",
        usage:
          "생각보다 괜찮았어 = 'better than I expected.' Classic Korean understatement for a positive experience. With your own mother, this is the real verdict — not the polished version you might give to others.",
        formality: "반말",
      },
      {
        word: "긴장했어",
        pronunciation: "/gin·jang·hae·sseo/",
        meaning: "I was nervous",
        usage:
          "The honest thing said to your own mother that you would not say to 어머님. Korean adult children often debrief their first visits with their own mothers in complete honesty — including the nerves. This is the register of trust.",
        formality: "반말",
      },
      {
        word: "어떡하지",
        pronunciation: "/eo·tteo·ka·ji/",
        meaning: "What do I do — worried uncertainty",
        usage:
          "A compressed expression of anxiety or uncertainty. Used with your own mother when you don't know how to handle something. It invites her to give advice without demanding it.",
        formality: "반말",
      },
      {
        word: "근데",
        pronunciation: "/geun·de/",
        meaning: "But / by the way — conversational connector",
        usage:
          "The spoken form of 그런데. Connects two thoughts naturally in casual conversation. 생각보다 괜찮았어. 근데 좀 걱정돼 — smooth, real, natural. 그런데 in this context sounds slightly formal.",
        formality: "반말",
      },
      {
        word: "좀 걱정돼",
        pronunciation: "/jom geok·jeong·dwae/",
        meaning: "I'm a little worried",
        usage:
          "Spoken worry — not performed. 좀 reduces the intensity just enough to make it conversational. 걱정돼 without 좀 sounds heavier, more distressed. With your own mother after a visit, 좀 걱정돼 is the honest middle tone.",
        formality: "반말",
      },
      {
        word: "마음에 드셨을까",
        pronunciation: "/ma·eu·me deu·syeo·sseul·kka/",
        meaning: "I wonder if she liked me",
        usage:
          "The question you actually ask your own mother after a first visit. Not 'did she like me' — the speculative form 드셨을까 softens it. You're not asking for a verdict; you're thinking out loud.",
        formality: "반말",
      },
      {
        word: "이상하게 보지 않았을까",
        pronunciation: "/i·sang·ha·ge bo·ji a·na·sseul·kka/",
        meaning: "I hope she didn't think I was strange",
        usage:
          "The real anxiety after a first visit — did I come across wrong? Said to your own mother because she is safe. This level of vulnerability has no place in the 어머님 conversation. It belongs entirely to the intimate register.",
        formality: "반말",
      },
      {
        word: "잘 보였으면 좋겠어",
        pronunciation: "/jal bo·yeo·sseu·myeon jo·ket·sseo/",
        meaning: "I hope I came across well",
        usage:
          "The hoped-for outcome, said to your own mother. 잘 보이다 = to be seen well, to make a good impression. With your own mother, you can say the quiet part out loud — that you wanted her to approve of you.",
        formality: "반말",
      },
      {
        word: "어떨 것 같아",
        pronunciation: "/eo·tteol geot ga·ta/",
        meaning: "What do you think? / How does it seem?",
        usage:
          "Asking your own mother for her read on the situation. The question assumes she knows you well enough to guess. It is a form of trust — you are telling her she has context that matters.",
        formality: "반말",
      },
    ],
  },

  phrases: {
    future_mother_in_law: [
      {
        korean: "처음 뵙겠습니다. 잘 부탁드립니다.",
        pronunciation: "cheo·eum bwep·get·seum·ni·da. jal bu·tak·deu·rim·ni·da.",
        english: "How do you do. I ask to be received well.",
        why_it_works:
          "The ritual pair that tells her you came prepared. For a 예비 며느리 (prospective daughter-in-law), this phrase is even more loaded than for a casual visitor — it signals you understand the stakes of this moment and chose to meet them correctly.",
        awkward: {
          korean: "안녕하세요~ 오늘 처음 뵙네요!",
          pronunciation: "an·nyeong·ha·se·yo~ o·neul cheo·eum bwep·ne·yo!",
          label: "Too casual",
          why_awkward:
            "안녕하세요 is correct Korean. 처음 뵙네요 is not wrong. But the ~ softening and the 네요 ending drop the register just enough to signal you treated this as a routine introduction. On a first meeting with someone evaluating whether you belong in her family, the register of a new colleague is not the register of a prospective daughter-in-law.",
        },
      },
      {
        korean: "어머님, 정말 맛있어요. 또 먹고 싶어요.",
        pronunciation: "eo·meo·nim, jeong·mal ma·si·sseo·yo. tto meok·go si·peo·yo.",
        english: "This is really delicious. I want to eat this again.",
        why_it_works:
          "Food is the primary language of care in Korean family culture. Complimenting the food specifically — and expressing that you want to eat it again — tells her that her effort registered. 또 먹고 싶어요 implies a future return, which is the best compliment a daughter-in-law can offer on a first visit.",
        awkward: {
          korean: "어머님, 요리를 너무 잘하세요! 정말 대단하세요.",
          pronunciation: "eo·meo·nim, yo·ri·reul neo·mu jal·ha·se·yo! jeong·mal dae·dan·ha·se·yo.",
          label: "Too generic",
          why_awkward:
            "요리를 잘하세요 and 대단하세요 are both grammatically correct and polite. The problem is that either phrase could be said to anyone who cooked anything. It does not respond to what she specifically made, the effort it took, or the care behind it. A compliment that could apply to any cook tells her nothing about whether you noticed her.",
        },
      },
      {
        korean: "괜찮으시면 제가 좀 도와드릴게요.",
        pronunciation: "gwaen·cha·neu·si·myeon je·ga jom do·wa·deu·ril·ge·yo.",
        english: "If it's alright with you, I'd like to help.",
        why_it_works:
          "Offering to help — with dishes, with preparation, with setting the table — is how a 예비 며느리 signals good manners without overstepping. 괜찮으시면 makes it a conditional offer, not an intrusion. She will likely decline the first time; offer again.",
        awkward: {
          korean: "제가 할게요! 어머님은 쉬세요.",
          pronunciation: "je·ga hal·ge·yo! eo·meo·nim·eun swi·se·yo.",
          label: "Incorrect register",
          why_awkward:
            "쉬세요 is a command — even a polite one. On a first visit, you are still a guest in her home. A guest does not tell the host what to do. 제가 할게요 declares without asking. 어머님은 쉬세요 directs without permission. The problem is not the politeness level — it is that you are giving instructions to someone whose home you just entered for the first time.",
        },
      },
      {
        korean: "어머님 김치찌개, 정말 맛있어요. 비법이 있으세요?",
        pronunciation: "eo·meo·nim gim·chi·jji·gae, jeong·mal ma·si·sseo·yo. bi·beop·i i·seu·se·yo?",
        english: "Your kimchi jjigae is really delicious. Do you have a secret recipe?",
        why_it_works:
          "Asking about the recipe is the highest form of food compliment in Korean culture — it signals you want to learn, you want to replicate, you want to carry this into your future. Korean mothers often share recipes with prospective daughters-in-law as a form of acceptance.",
        awkward: {
          korean: "저도 나중에 이렇게 만들어볼게요.",
          pronunciation: "jeo·do na·jung·e i·reo·ke man·deu·reo·bol·ge·yo.",
          label: "Lacks relationship specificity",
          why_awkward:
            "저도 만들어볼게요 is natural Korean and the register is appropriate. The gap is relational. In Korean family culture, asking an elder to teach you — especially about food — is how rapport is built between a mother-in-law and a daughter-in-law. 비법이 있으세요? opens that door. 저도 만들어볼게요 closes it without either of you noticing.",
        },
      },
      {
        korean: "말씀 잘 들었어요. 감사해요, 어머님.",
        pronunciation: "mal·sseum jal deu·reo·sseo·yo. gam·sa·hae·yo, eo·meo·nim.",
        english: "I took your words to heart. Thank you.",
        why_it_works:
          "Said when 어머님 shares advice, a story, or wisdom. 말씀 잘 들었어요 tells her: I was listening. Not just present — actually listening. In Korean family culture, being seen as someone who receives advice well is a significant social signal.",
        awkward: {
          korean: "네, 네. 알겠어요.",
          pronunciation: "ne, ne. al·ge·sseo·yo.",
          label: "Lacks relationship specificity",
          why_awkward:
            "네, 네. 알겠어요 is not wrong and would be fine in many contexts. But Korean elders — particularly a 시어머님 evaluating a potential daughter-in-law — notice the difference between someone who acknowledges and someone who receives. Quick 네s close the exchange. 말씀 잘 들었어요 tells her the words went somewhere.",
        },
      },
      {
        korean: "오늘 이렇게 초대해 주셔서 정말 감사드려요.",
        pronunciation: "o·neul i·reo·ke cho·dae·hae ju·syeo·seo jeong·mal gam·sa·deu·ryeo·yo.",
        english: "I'm truly grateful that you had me over today.",
        why_it_works:
          "Said when leaving. 이렇게 (like this, in this way) grounds the gratitude in the specific visit — not a generic thank-you. 드려요 (deferential) signals the thanks flows upward. A closing phrase that ends the visit on the right note without being dramatic.",
        awkward: {
          korean: "오늘 너무 좋았어요! 다음에 또 올게요~",
          pronunciation: "o·neul neo·mu jo·a·sseo·yo! da·eu·me tto ol·ge·yo~",
          label: "Lacks cultural specificity",
          why_awkward:
            "오늘 좋았어요 is grammatically fine. But in Korean visiting culture, the guest does not announce a return visit — that invitation belongs to the host. 다음에 또 올게요 with ~ sounds warm to a Korean ear shaped by peer relationships, but in an elder-junior dynamic it reads as assuming access that has not yet been granted.",
        },
      },
    ],

    your_mother: [
      {
        korean: "생각보다 괜찮았어.",
        pronunciation: "saeng·gak·bo·da gwaen·cha·na·sseo.",
        english: "Better than I expected.",
        why_it_works:
          "The real verdict, delivered to the person who gets the real verdict. 생각보다 괜찮았어 is Korean understatement — it means it went well. With your own mother you do not polish the answer. She gets the unfiltered version.",
        awkward: {
          korean: "정말 즐겁고 의미 있는 시간이었어.",
          pronunciation: "jeong·mal jeul·geop·go ui·mi·it·neun si·ga·ni·eo·sseo.",
          label: "Too formal",
          why_awkward:
            "즐겁고 의미 있는 시간이었어 is not wrong Korean — the register is 반말 and grammatically natural. But the vocabulary (즐겁다, 의미 있다) belongs to written or semi-formal registers. Your own mother does not want the polished version. She wants to know what actually happened. 생각보다 괜찮았어 is what that sounds like.",
        },
      },
      {
        korean: "근데 좀 긴장했어. 뭘 어떻게 해야 할지 모르겠더라.",
        pronunciation: "geun·de jom gin·jang·hae·sseo. mwol eo·tteo·ke hae·ya hal·ji mo·reu·get·deo·ra.",
        english: "But I was nervous. I wasn't sure what to do.",
        why_it_works:
          "The truth that you cannot say in the other room. Your own mother holds the version of you that does not have to perform. 근데 좀 긴장했어 is how you actually felt — and your mother is the person who gets to know that.",
        awkward: {
          korean: "전혀 긴장하지 않았어. 자연스럽게 잘 했어.",
          pronunciation: "jeon·hyeo gin·jang·ha·ji a·na·sseo. ja·yeon·seu·reop·ge jal·hae·sseo.",
          label: "Focus shifted away from listener",
          why_awkward:
            "전혀 긴장하지 않았어 redirects the conversation toward self-presentation rather than shared processing. Your own mother is not asking to confirm your competence — she is asking because she was thinking about you during the visit. Claiming zero nerves closes the space she opened. 긴장했어 keeps it open.",
        },
      },
      {
        korean: "어머님이 마음에 드셨을까. 걱정돼.",
        pronunciation: "eo·meo·ni·mi ma·eu·me deu·syeo·sseul·kka. geok·jeong·dwae.",
        english: "I wonder if she liked me. I'm worried.",
        why_it_works:
          "The question underneath everything. You cannot ask this in the other room. You can only ask it here. Your own mother is the person who knows you well enough to give an honest answer — or at least to sit with the uncertainty alongside you.",
        awkward: {
          korean: "어머님이 나를 좋아하실지 궁금해요.",
          pronunciation: "eo·meo·ni·mi na·reul jo·a·ha·sil·ji gung·geu·mae·yo.",
          label: "Incorrect register",
          why_awkward:
            "어머님이 나를 좋아하실지 궁금해요 uses 해요체 — the polite register — with your own mother. This is the register you just spent an hour maintaining in the other house. Carrying it home signals you have not fully switched back. Your own mother does not need 궁금해요. She gets 걱정돼.",
        },
      },
      {
        korean: "밥이 진짜 맛있었어. 김치찌개 끓이는 법 물어봤어.",
        pronunciation: "ba·bi jin·jja ma·si·sseo·sseo. gim·chi·jji·gae kkeu·ri·neun beop mu·reo·ba·sseo.",
        english: "The food was really good. I asked about the kimchi jjigae recipe.",
        why_it_works:
          "Telling your own mother what you ate and what you asked about is a form of sharing the experience. 물어봤어 (I asked) also signals to your own mother that you handled it correctly — she will approve of you asking for the recipe.",
        awkward: {
          korean: "음식은 뭐 그냥 그랬어.",
          pronunciation: "eum·si·geun mwo geu·nyang geu·rae·sseo.",
          label: "Lacks cultural specificity",
          why_awkward:
            "음식은 뭐 그냥 그랬어 is natural 반말 — the register is correct for this relationship. But in Korean family culture, food is not neutral. What a 시어머님 cooked carries relationship meaning. Dismissing it casually, even in private, misses that signal — and your own mother will notice that you missed it.",
        },
      },
      {
        korean: "이상하게 보지 않으셨으면 좋겠어.",
        pronunciation: "i·sang·ha·ge bo·ji a·neu·syeo·sseu·myeon jo·get·sseo.",
        english: "I hope she didn't think I was strange.",
        why_it_works:
          "The real fear, stated plainly to the person who can hold it. 이상하게 보이다 — to appear strange or off — is the specific anxiety of a first visit. With your own mother you name the anxiety directly. You cannot name it anywhere else.",
        awkward: {
          korean: "제가 좋은 인상을 남겼을 것 같아요.",
          pronunciation: "je·ga jo·eun in·sang·eul nam·gyeo·sseul geot ga·ta·yo.",
          label: "Focus shifted away from listener",
          why_awkward:
            "제가 좋은 인상을 남겼을 것 같아요 uses 해요체 — wrong register for a conversation with your own mother — but the deeper issue is what it does to the conversation. Claiming a confident self-assessment closes the space your mother opened by asking. It shifts from shared uncertainty to self-presentation. 이상하게 보지 않으셨으면 좋겠어 stays in the shared space.",
        },
      },
      {
        korean: "다음에 또 가도 될 것 같아?",
        pronunciation: "da·eu·me tto ga·do doel geot ga·ta?",
        english: "Do you think it's okay for me to go again?",
        why_it_works:
          "Asking your own mother whether you should return. This question only makes sense in the intimate register — you are processing the visit, checking your reading of it. Your own mother knows the family dynamics, knows you, and can give the honest answer.",
        awkward: {
          korean: "다음에는 더 잘해야겠어.",
          pronunciation: "da·eu·me·neun deo jal·hae·ya·get·sseo.",
          label: "Lacks relationship specificity",
          why_awkward:
            "다음에는 더 잘해야겠어 is natural Korean and shows self-awareness. The gap is relational. Your own mother was not there — she has a read on the family, on 시어머님, on what matters in that household. 다음에 또 가도 될 것 같아? asks for her perspective. 더 잘해야겠어 alone assumes you can evaluate it without her.",
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
        english: "How do you do. I ask to be received well.",
      },
      {
        speaker: "어머님",
        side: "other",
        korean: "어서 와요. 말은 많이 들었어요. 들어와요.",
        english: "Come in. I've heard a lot about you. Come in.",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "별거 아니지만, 작은 거 가져왔어요.",
        english: "It's nothing much, but I brought something small.",
      },
      {
        speaker: "어머님",
        side: "other",
        korean: "어머, 뭘. 고마워요. 밥 먹었어요? 앉아요.",
        english: "Oh my. Thank you. Have you eaten? Sit down.",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "어머님, 김치찌개 정말 맛있어요. 비법이 있으세요?",
        english: "Your kimchi jjigae is really delicious. Do you have a recipe?",
      },
      {
        speaker: "어머님",
        side: "other",
        korean: "별거 없어요. 자주 와요. 다음에 같이 만들어봐요.",
        english: "Nothing special. Come often. Let's make it together next time.",
      },
    ],

    your_mother: [
      {
        speaker: "어머니",
        side: "other",
        korean: "어때? 어머님이 어떠시던?",
        english: "How was it? What was she like?",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "생각보다 괜찮았어. 근데 좀 긴장했어.",
        english: "Better than I expected. But I was nervous.",
      },
      {
        speaker: "어머니",
        side: "other",
        korean: "당연하지. 밥은 뭐 먹었어?",
        english: "Of course. What did you eat?",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "김치찌개. 진짜 맛있었어. 비법 물어봤어.",
        english: "Kimchi jjigae. It was really good. I asked for the recipe.",
      },
      {
        speaker: "어머니",
        side: "other",
        korean: "잘 했다. 마음에 드셨을 거야.",
        english: "Good job. She probably liked that.",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "그랬으면 좋겠어. 이상하게 보지 않으셨으면.",
        english: "I hope so. I hope she didn't think I was strange.",
      },
    ],
  },

  tone_guidance: {
    future_mother_in_law: {
      avoid:
        "과도한 친밀감 (너무 편하게 굴기, 반말 시도) — 아직 그 관계가 아닙니다. 첫 만남에서 너무 빨리 가까워지려는 시도는 눈치 없어 보입니다. 어머님이 먼저 편하게 하라고 할 때까지 기다리세요.",
      neutral:
        "지나친 격식 (습니다체 일관 사용, 경직된 태도) — 너무 딱딱하면 긴장해 보입니다. 처음 인사는 습니다체로 시작하고, 대화가 풀리면 따뜻한 해요체로 전환하는 것이 자연스럽습니다.",
      correct:
        "정중한 자연스러움 — 처음 뵙겠습니다로 시작하고, 음식 칭찬은 구체적으로, 도움은 조건부로 제안하고, 감사 인사로 마무리. 해요체를 기본으로, 과도하지 않은 온기.",
      tone_summary:
        "예비 시어머님과의 첫 만남은 사회적 평가입니다. 목표는 '좋은 인상'이 아니라 '적절한 인상'입니다. 너무 열심히 하면 계산적으로 보입니다. 너무 안 하면 무례해 보입니다. 음식을 칭찬하고, 도움을 제안하고, 잘 들으세요.",
      spectrum: [
        { label: "반말", position: 0, recommended: false },
        { label: "해요체", position: 50, recommended: true },
        { label: "습니다체", position: 100, recommended: false },
      ],
    },

    your_mother: {
      avoid:
        "해요체나 격식 표현 — 자신의 어머니에게 이 상황을 해요체로 보고하면 감정적 거리가 느껴집니다. 그녀는 필터 없는 버전을 받을 자격이 있습니다.",
      neutral:
        "너무 긍정적인 요약 (진짜 너무 좋았어, 완전 잘 됐어) — 첫 만남 후 이렇게 말하면 어머니가 믿지 않습니다. 적당한 솔직함이 더 신뢰를 줍니다.",
      correct:
        "솔직한 반말 — 생각보다 괜찮았어, 근데 긴장했어. 어머님이 마음에 드셨을까 걱정돼. 이게 자신의 어머니에게 하는 진짜 언어입니다.",
      tone_summary:
        "자신의 어머니는 검열되지 않은 버전을 받습니다. 그녀는 당신이 얼마나 긴장했는지, 음식이 실제로 어땠는지, 당신이 잘 보였으면 하는지를 알고 싶어합니다. 반말로, 솔직하게, 과장 없이.",
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
        question: "Complete — the most natural food compliment that implies a future return",
        prefix: "정말 맛있어요. 또",
        blank: "먹고 싶어요",
        suffix: ".",
        answer: "먹고 싶어요",
        hint: "먹고 ___요",
      },
      {
        type: "fill_blank",
        question: "Complete — the polite conditional offer to help",
        prefix: "괜찮으시면 제가",
        blank: "도와드릴게요",
        suffix: ".",
        answer: "도와드릴게요",
        hint: "도와___게요",
      },
      {
        type: "fill_blank",
        question: "Complete — asking about the recipe (signals you want to learn from her)",
        prefix: "어머님 김치찌개, 정말 맛있어요. 비법이",
        blank: "있으세요",
        suffix: "?",
        answer: "있으세요",
        hint: "있___요",
      },
    ],

    your_mother: [
      {
        type: "fill_blank",
        question: "Complete — the real verdict in 반말 (Korean understatement for 'it went well')",
        prefix: "생각보다",
        blank: "괜찮았어",
        suffix: ".",
        answer: "괜찮았어",
        hint: "괜찮___어",
      },
      {
        type: "fill_blank",
        question: "Complete — the honest follow-up (what you actually felt)",
        prefix: "근데 좀",
        blank: "긴장했어",
        suffix: ".",
        answer: "긴장했어",
        hint: "긴장___어",
      },
      {
        type: "fill_blank",
        question: "Complete — the real worry, said only to your own mother",
        prefix: "어머님이 마음에 드셨을까.",
        blank: "걱정돼",
        suffix: ".",
        answer: "걱정돼",
        hint: "걱정___",
      },
    ],
  },
};

export default DL_006;
