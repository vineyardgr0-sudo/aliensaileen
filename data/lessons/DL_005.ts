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
      "You arrive at your partner's family home for the first time. The mother opens the door. You have a few seconds to make a first impression that she will carry for a long time. In Korea, this moment is not just a greeting — it is a reading of your character, your upbringing, and your understanding of how relationships work.",
    location: "Partner's family home — front door",
    interaction_time: "5–10 seconds",
    communication_style: "Formal warmth — hierarchy first, intimacy earned later",
    goal: [
      "Use the correct register for a high-stakes first meeting",
      "Signal that you understand Korean social hierarchy without being stiff",
      "Create a warm first impression through ritual phrases, not personal expressions",
      "Show that you came prepared — not improvising",
    ],
    cultural_note:
      "In Korea, the first meeting with a partner's mother is a social evaluation. She is not just meeting you — she is deciding how to place you in the family structure. 처음 뵙겠습니다 is not a greeting. It is an acknowledgment that this moment matters. With your own mother, the opposite logic applies — the less performance, the more belonging. The same body walking through two different doors requires two completely different languages.",
  },

  relationship_selection: {
    title: "Who opens the door?",
    description:
      "The same action — arriving at a door — produces completely different language depending on the relationship behind it. Choose who you are facing.",
    options: [
      {
        id: "future_mother_in_law",
        label: "예비 장모님 (Partner's Mother)",
        summary: "First meeting — formal register, ritual phrases, respectful distance",
        communication_traits: ["formal", "hierarchical", "prepared", "restrained"],
        archetype: "hierarchical_elder",
      },
      {
        id: "your_mother",
        label: "어머니 (Your Own Mother)",
        summary: "Coming home — no performance needed, presence is enough",
        communication_traits: ["intimate", "casual", "behavioral", "unconditional"],
        archetype: "intimate_family",
      },
    ],
  },

  decision_point: {
    variants: {
      future_mother_in_law: {
        question:
          "예비 장모님 opens the door. You bow. Which is the right first sentence?",
        options: [
          {
            text: "처음 뵙겠습니다. 잘 부탁드립니다.",
            tag: "correct",
            feedback:
              "This is the phrase she was expecting. 처음 뵙겠습니다 tells her you understand the weight of this moment. 잘 부탁드립니다 places you in the right position — someone asking to be received, not assuming it.",
          },
          {
            text: "안녕하세요! 반가워요~",
            tag: "neutral",
            feedback:
              "Polite, but missing the ritual opener. Korean elders do not always say anything — but they notice when 처음 뵙겠습니다 is absent. It signals the meeting was not mentally prepared for.",
            explanation: {
              title: "The ritual phrase is not optional",
              description:
                "안녕하세요 is correct Korean. But in a first meeting with an elder, the register alone is not enough — the ritual sequence matters. 처음 뵙겠습니다 acknowledges that this is a significant social moment. Skipping it reads as casual, even if unintentionally.",
              details: [
                "처음 뵙겠습니다 signals: I know this matters, I came prepared",
                "Its absence signals: I treated this like any other greeting",
                "Korean elders notice the difference internally, even if they say nothing",
              ],
              natural_alternative: ["처음 뵙겠습니다, 반갑습니다", "처음 뵙겠습니다. 잘 부탁드립니다."],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Register is correct — but ritual sequence is missing",
                recommended: "습니다체",
              },
            },
          },
          {
            text: "어, 안녕하세요~",
            tag: "wrong",
            feedback:
              "어 as an opener undoes everything before it. No matter how good the rest of the visit is, starting with an unplanned filler word tells her: this person was not ready for this moment.",
            explanation: {
              title: "어 reads as unpreparedness",
              description:
                "어 is a hesitation particle — it fills a gap when you haven't decided what to say yet. In a first meeting with a partner's parent, there should be no gap. The first word should be deliberate. A bow in silence, then 처음 뵙겠습니다, carries far more weight than any improvised opener.",
              details: [
                "어 is what happens when you haven't prepared what to say",
                "Korean elders read the opener as a signal of how much thought you gave to this meeting",
                "Silence + bow + 처음 뵙겠습니다 is always stronger than improvising",
              ],
              natural_alternative: ["처음 뵙겠습니다", "(bow, then speak)"],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Casual hesitation filler before a formal ritual opener",
                recommended: "습니다체",
              },
            },
          },
        ],
      },

      your_mother: {
        question:
          "You arrive home. Your own mother opens the door. Which feels most natural?",
        options: [
          {
            text: "나 왔어, 엄마.",
            tag: "correct",
            feedback:
              "This is the arrival signal — not a greeting. 나 왔어 tells your mother: I'm back, I'm safe, you can stop tracking where I am. The warmth is inside the brevity.",
          },
          {
            text: "안녕하세요, 어머니.",
            tag: "wrong",
            feedback:
              "Korean mothers read formal speech from their adult children as a signal that something is off. 해요체 at home means distance, not respect. She would find this strange before she found it polite.",
            explanation: {
              title: "Formal speech at home means something is wrong",
              description:
                "In Korean family communication, 반말 is not informality — it is the register of belonging. When an adult child shifts to 해요체 with their own mother, it reads as emotional withdrawal: something happened, someone is upset, the relationship is under stress. Politeness here creates distance, not warmth.",
              details: [
                "반말 between a child and parent = the normal register of family life",
                "해요체 = emotional distance, or something has changed",
                "어머니 as a form of address signals formality — 엄마 signals home",
              ],
              natural_alternative: ["나 왔어, 엄마", "엄마, 나야"],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Formal register signals emotional distance in intimate family context",
                recommended: "반말",
              },
            },
          },
          {
            text: "처음 뵙겠습니다.",
            tag: "wrong",
            feedback:
              "처음 뵙겠습니다 literally means you are meeting someone for the first time. Your mother would not know whether to laugh or worry.",
            explanation: {
              title: "You cannot introduce yourself to your own mother",
              description:
                "This phrase exists to mark the beginning of a relationship with someone you have never met. Using it with someone who has known you your entire life removes all relational context. It is not just wrong register — it is a category error.",
              details: [
                "처음 뵙겠습니다 = this is our first meeting",
                "Used with your own mother, it signals either a joke or a rupture",
                "Register alone cannot fix a phrase that is contextually impossible",
              ],
              natural_alternative: ["나 왔어, 엄마", "엄마, 나야"],
              formality_analysis: {
                used: "습니다체",
                why_wrong: "First-meeting phrase used with someone who has known you your whole life",
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
        meaning: "This is our first meeting (ritual acknowledgment)",
        usage:
          "Not just a greeting — a declaration that you understand the significance of this moment. Delivered with a bow. The first social test of a first meeting. Skipping it is remembered.",
        formality: "습니다체",
      },
      {
        word: "잘 부탁드립니다",
        pronunciation: "/jal bu·tak·deu·rim·ni·da/",
        meaning: "I ask to be received well going forward",
        usage:
          "Paired with 처음 뵙겠습니다. Positions you as the one asking to enter the relationship — not assuming a place in it. 드리다 signals the direction: you are giving deference upward.",
        formality: "습니다체",
      },
      {
        word: "감사드립니다",
        pronunciation: "/gam·sa·deu·rim·ni·da/",
        meaning: "I am grateful (directional deference form)",
        usage:
          "감사합니다 is neutral. 감사드립니다 is directional — the 드리다 signals that the gratitude flows upward, toward an elder. The difference is subtle in sound but significant in social meaning.",
        formality: "습니다체",
      },
      {
        word: "말씀",
        pronunciation: "/mal·sseum/",
        meaning: "Words — honorific form of 말",
        usage:
          "말씀 많이 들었습니다 is not just 'I've heard about you.' It signals that your partner spoke of her with enough warmth that it reached you — and that you use the correct honorific register when referring to what she said.",
        formality: "습니다체",
      },
      {
        word: "별거 아니지만",
        pronunciation: "/byeol·geo a·ni·ji·man/",
        meaning: "It is nothing special, but...",
        usage:
          "Korean gift-giving etiquette requires downplaying your own offering. This is not false modesty — it is a social signal that you are not trying to impress or obligate. The phrase invites her to receive the gift comfortably.",
        formality: "습니다체",
      },
      {
        word: "인사드리다",
        pronunciation: "/in·sa·deu·ri·da/",
        meaning: "To offer a greeting — humble directional form",
        usage:
          "인사하다 = to greet. 인사드리다 = to greet an elder or superior. The 드리다 suffix marks the direction — upward. Used by a son-in-law to express intent to visit and greet her regularly.",
        formality: "습니다체",
      },
      {
        word: "뵙다",
        pronunciation: "/bwep·da/",
        meaning: "To see / meet — honorific of 보다",
        usage:
          "만나다 is neutral. 뵙다 is used only when the person you are meeting holds higher social position. 이렇게 뵙게 되어 — 'to have come to meet you in this way' — grounds the greeting in the specific reality of this moment.",
        formality: "습니다체",
      },
      {
        word: "진심으로",
        pronunciation: "/jin·si·meu·ro/",
        meaning: "Sincerely — from the heart",
        usage:
          "Adds emotional weight to a formal phrase without breaking the register. 진심으로 감사드립니다 does not just thank her — it tells her that the gratitude is not performed. In a context where everything can read as scripted, 진심으로 makes the gap.",
        formality: "습니다체",
      },
    ],

    your_mother: [
      {
        word: "나 왔어",
        pronunciation: "/na wa·sseo/",
        meaning: "I'm back — arrival signal",
        usage:
          "Not a greeting. A check-in. Two words that close the loop on wherever you were. Your mother has been tracking your absence without necessarily saying so — 나 왔어 tells her the tracking can stop.",
        formality: "반말",
      },
      {
        word: "밥은",
        pronunciation: "/ba·beun/",
        meaning: "Food? — compressed care question",
        usage:
          "밥은? is a health check disguised as a food question. In Korean family logic, eating is the most basic form of self-care. When a mother asks 밥은?, she is asking: are you managing yourself out there? The question is about more than the meal.",
        formality: "반말",
      },
      {
        word: "어디야",
        pronunciation: "/eo·di·ya/",
        meaning: "Where are you? — worry encoded as location",
        usage:
          "어디야 is not surveillance. It is a mother's way of placing her child on a mental map. When she knows where you are, the worry decreases. The question is never really about geography — it is about safety.",
        formality: "반말",
      },
      {
        word: "왜 이렇게",
        pronunciation: "/wae i·reo·ke/",
        meaning: "Why like this — care as complaint",
        usage:
          "왜 이렇게 늦게 와 is not a scolding — it is relief. Korean mothers do not say 'I was worried.' They say what your lateness did to their evening. The emotion is real; the form is a complaint. Reading the complaint as care is a fluency skill.",
        formality: "반말",
      },
      {
        word: "걱정 마",
        pronunciation: "/geok·jeong ma/",
        meaning: "Stop worrying — compressed reassurance",
        usage:
          "걱정하지 마 with 하지 included feels slightly deliberate. 걱정 마 without it is spoken — the way you'd say it mid-conversation, in passing, when you want her to actually stop. The compression is not laziness — it is intimacy.",
        formality: "반말",
      },
      {
        word: "아프지 마",
        pronunciation: "/a·peu·ji ma/",
        meaning: "Don't get sick — the highest care signal",
        usage:
          "This is what Korean mothers say when they mean something too large to say directly. Not 'I love you' — 아프지 마. Health is the container for everything else: love, worry, presence, the future. Three syllables carry all of it.",
        formality: "반말",
      },
      {
        word: "엄마",
        pronunciation: "/eom·ma/",
        meaning: "Mom — intimate address, not formal",
        usage:
          "어머니 is for ceremony, for introducing her to others, for formal contexts. 엄마 is for home. The difference is not just vocabulary — it is a signal of where you are in the relationship. 엄마 says: I am in the space where I don't have to perform.",
        formality: "반말",
      },
      {
        word: "나 여기 있어",
        pronunciation: "/na yeo·gi it·seo/",
        meaning: "I'm right here — presence as reassurance",
        usage:
          "In Korean family dynamics, being physically near is a form of emotional communication. 나 여기 있어 tells your mother: you don't have to track me right now. I am in the same space. It is a small phrase that closes a large loop.",
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
          "The phrase pair that tells her you prepared. 처음 뵙겠습니다 acknowledges the weight of the moment. 잘 부탁드립니다 positions you correctly — asking to be received, not assuming a welcome. Together they signal: I know the rules.",
        awkward: {
          korean: "안녕하세요! 처음 만나서 반가워요~",
          pronunciation: "an·nyeong·ha·se·yo! cheo·eum man·na·seo ban·ga·wo·yo~",
          label: "Incorrect register",
          why_awkward:
            "안녕하세요 and 반가워요 are both correct Korean. The register gap is the verb: 만나다 is the neutral form of 'to meet'; 뵙다 is the honorific. On a first meeting with a partner's parent, using 만나다 signals you did not distinguish who you are speaking to. The phrase is not unnatural — it is contextually incorrect.",
        },
      },
      {
        korean: "말씀 많이 들었습니다. OO이가 참 배려심이 많더라고요.",
        pronunciation: "mal·sseum ma·ni deu·reot·seum·ni·da. OO·i·ga cham bae·ryeo·si·mi man·ta·ro·go·yo.",
        english: "I have heard so much about you. He is truly a considerate person.",
        why_it_works:
          "말씀 많이 들었습니다 alone tells her you heard about her. Adding OO이가 참 배려심이 많더라고요 completes the thought in the way Korean first-meeting culture expects: you compliment her son's character, which indirectly credits her as the person who shaped it. She receives the praise without it being said directly to her — the most natural way to acknowledge a mother's influence.",
        awkward: {
          korean: "잘 키워주셔서 감사합니다.",
          pronunciation: "jal ki·wo·ju·syeo·seo gam·sa·ham·ni·da.",
          label: "Too generic",
          why_awkward:
            "잘 키워주셔서 감사합니다 is a positive expression and not incorrect. The issue is timing. On a first meeting, it can feel premature — it assumes a depth of family relationship that has not yet been established. The same gratitude lands more naturally when it goes through the son's character: OO이가 참 바르고 배려심이 많더라고요 credits her without naming the credit directly.",
        },
      },
      {
        korean: "초대해 주셔서 진심으로 감사드립니다.",
        pronunciation: "cho·dae·hae ju·syeo·seo jin·si·meu·ro gam·sa·deu·rim·ni·da.",
        english: "I am sincerely grateful that you have invited me.",
        why_it_works:
          "감사드립니다 flows the gratitude in the right direction — upward. 진심으로 makes it felt rather than formal. Together they say: this is not a scripted thank-you. I mean it. The phrase acknowledges she made space for you.",
        awkward: {
          korean: "와줘서 감사해요.",
          pronunciation: "wa·ju·seo gam·sa·hae·yo.",
          label: "Incorrect register",
          why_awkward:
            "와줘서 감사해요 is grammatically natural. The issue is directional. 와줘서 thanks someone for coming to you — but she is the host and you are the guest who arrived at her home. The social positions are reversed. 초대해 주셔서 correctly places her as the one who extended hospitality, and you as the one who received it.",
        },
      },
      {
        korean: "별거 아니지만, 작은 선물을 가져왔습니다.",
        pronunciation: "byeol·geo a·ni·ji·man, ja·geun seon·mu·reul ga·jyeo·wat·seum·ni·da.",
        english: "It's nothing much, but I brought a small gift.",
        why_it_works:
          "Korean gift-giving requires you to make the gift easy to receive. 별거 아니지만 removes any pressure of obligation. It says: I brought this because I wanted to, not to impress you. The phrase invites her to accept it without feeling indebted.",
        awkward: {
          korean: "선물 사왔어요. 마음에 드셨으면 좋겠어요.",
          pronunciation: "seon·mul sa·wa·sseo·yo. ma·eu·me deu·syeo·sseu·myeon jo·ket·sseo·yo.",
          label: "Lacks cultural specificity",
          why_awkward:
            "선물 사왔어요 is correct Korean and the register is appropriate. The missing piece is cultural. In Korean gift-giving, downplaying the gift before presenting it — 별거 아니지만 — is not false modesty. It is the expected social signal that tells the receiver: you are not obligated. Without it, the gift arrives with implicit pressure.",
        },
      },
      {
        korean: "이렇게 뵙게 되어 정말 반갑습니다.",
        pronunciation: "i·reo·ke bwep·ge doe·eo jeong·mal ban·gap·seum·ni·da.",
        english: "I am truly glad to be meeting you like this.",
        why_it_works:
          "이렇게 (like this — in this specific moment, in this way) makes the phrase land in reality rather than floating as a formality. More honest than a generic 반갑습니다. It says: this particular meeting, this particular moment, actually matters to me.",
        awkward: {
          korean: "만나서 너무 반가워요!",
          pronunciation: "man·na·seo neo·mu ban·ga·wo·yo!",
          label: "Too casual",
          why_awkward:
            "만나서 반가워요 is natural Korean. The issues are two: 만나다 instead of 뵙다 (see phrase 1), and 너무 as an intensifier in a formal first meeting. 너무 belongs to casual speech — it reads as uncontrolled enthusiasm in a context where measured warmth is expected. 정말 is the appropriate intensifier here.",
        },
      },
      {
        korean: "OO이가 저를 많이 챙겨줘서 항상 고맙게 생각하고 있습니다.",
        pronunciation: "OO·i·ga jeo·reul ma·ni chaeng·gyeo·jweo·seo hang·sang go·map·ge saeng·ga·ka·go it·seum·ni·da.",
        english: "He takes such good care of me — I am always grateful.",
        why_it_works:
          "This is the highest-value phrase pattern for a first meeting with a partner's mother. It compliments her son's character, credits her influence indirectly, and expresses gratitude — all without overstating the relationship. 항상 고맙게 생각하고 있습니다 is more measured than 정말 감사해요, which suits the formality of a first meeting. The mother hears: my son is doing well, and this person notices.",
        awkward: {
          korean: "이렇게 키워주신 덕분에 저도 많이 배우고 있습니다.",
          pronunciation: "i·reo·ke ki·wo·ju·sin deok·bu·ne jeo·do ma·ni bae·u·go it·seum·ni·da.",
          label: "Too generic",
          why_awkward:
            "덕분에 can be excellent in this context. The issue is the framing. 이렇게 키워주신 덕분에 names her parenting directly — which can feel slightly presumptuous on a first meeting, as if you are evaluating her role before having earned that perspective. 덕분에 저도 많이 배우고 있습니다 alone — gratitude focused on what you receive from him — is more natural and less assumptive.",
        },
      },
    ],

    your_mother: [
      {
        korean: "나 왔어.",
        pronunciation: "na wa·sseo.",
        english: "I'm home.",
        why_it_works:
          "The arrival signal, not a greeting. In Korean households, 나 왔어 closes the loop on wherever you were. Your mother does not need fanfare — she needs to know you're back. Two words accomplish everything.",
        awkward: {
          korean: "어머니, 귀가하였습니다.",
          pronunciation: "eo·meo·ni, gwi·ga·ha·yeot·seum·ni·da.",
          label: "Too formal",
          why_awkward:
            "귀가하였습니다 is grammatically correct Korean. The issue is register and context. 귀가 belongs to written or official language — a company notification, a formal document. 하였습니다 is the formal past tense. Neither belongs in a home. Said to your own mother at the door, it would sound like a joke before it sounded like a greeting.",
        },
      },
      {
        korean: "밥은?",
        pronunciation: "ba·beun?",
        english: "Have you eaten?",
        why_it_works:
          "A Korean mother's first question is rarely about the meal. 밥은? is a check on whether you are managing yourself — eating, resting, keeping to a routine. The question is care compressed into one syllable plus a topic marker.",
        awkward: {
          korean: "식사는 하셨나요?",
          pronunciation: "sik·sa·neun ha·syeon·na·yo?",
          label: "Incorrect register",
          why_awkward:
            "식사는 하셨나요 uses 식사 (the formal word for meal) and 하셨나요 (honorific past question form). Both are correct Korean — in the right relationship. This is the register of a junior speaking to a superior, or a staff member asking a customer. With your own mother, it applies a social distance that does not exist between you. The care in the question disappears behind the formality.",
        },
      },
      {
        korean: "어디야?",
        pronunciation: "eo·di·ya?",
        english: "Where are you?",
        why_it_works:
          "Korean mothers track their children's location not as control but as anxiety management. Knowing where you are reduces the background worry. 어디야 is not a demand for accountability — it is a request to be placed on her mental map so she can stop imagining where you might be.",
        awkward: {
          korean: "현재 위치가 어디세요?",
          pronunciation: "hyeon·jae wi·chi·ga eo·di·se·yo?",
          label: "Too formal",
          why_awkward:
            "현재 위치가 어디세요 is grammatically correct. 어디세요 is polite Korean. But 현재 위치 (current location) is the vocabulary of navigation systems and official forms. Combined with 어디세요, the phrase creates a bureaucratic distance in a conversation that should have none. Your own mother asks 어디야. The formal version answers a different question in a different relationship.",
        },
      },
      {
        korean: "왜 이렇게 늦게 와.",
        pronunciation: "wae i·reo·ke neut·ge wa.",
        english: "Why are you so late.",
        why_it_works:
          "The complaint is the relief. Korean mothers express worry as reaction — not as confession. 왜 이렇게 늦게 와 means: I tracked every hour you were gone. The period at the end is not a typo. This is not a question she needs you to answer.",
        awkward: {
          korean: "당신이 늦어서 매우 걱정했습니다.",
          pronunciation: "dang·sin·i neu·jeo·seo mae·u geok·jeong·haet·seum·ni·da.",
          label: "Incorrect register",
          why_awkward:
            "당신이 늦어서 매우 걱정했습니다 has two problems. First, 당신 is a formal pronoun that is almost never used between family members in natural Korean — it creates the distance of a stranger or a formal letter. Second, Korean mothers do not name their worry directly. The behavioral expression (왜 이렇게 늦게 와) is the real language. Saying 걱정했습니다 explicitly is both the wrong register and the wrong mode of expression for this relationship.",
        },
      },
      {
        korean: "나 여기 있어. 걱정 마.",
        pronunciation: "na yeo·gi it·seo. geok·jeong ma.",
        english: "I'm right here. Stop worrying.",
        why_it_works:
          "Location plus instruction. 나 여기 있어 tells her the tracking can stop. 걱정 마 — without 하지, compressed — is the spoken form: faster, more real, less deliberate. Together the two sentences close her anxiety loop completely.",
        awkward: {
          korean: "저는 괜찮습니다. 걱정하지 마십시오.",
          pronunciation: "jeo·neun gwaen·chan·seum·ni·da. geok·jeong·ha·ji ma·sip·si·o.",
          label: "Too formal",
          why_awkward:
            "저는 괜찮습니다 and 걱정하지 마십시오 are grammatically correct. 마십시오 is the highest-formality imperative — found in public announcements, safety signs, and official notices. 저는 instead of 나는 already signals a formal register. Together, the two sentences apply institutional-level formality to a moment of family reassurance. The message is correct. The register makes it unrecognizable as something said between a child and a parent.",
        },
      },
      {
        korean: "아프지 마.",
        pronunciation: "a·peu·ji ma.",
        english: "Don't get sick.",
        why_it_works:
          "This is Korean for 'I love you' — in the register that Korean family actually uses. Health is not a practical concern here. It is a container for everything a mother carries about her child's future: safety, longevity, being okay when she is not there to check. 아프지 마 holds all of it.",
        awkward: {
          korean: "건강에 유의하시기 바랍니다.",
          pronunciation: "geon·gang·e yu·ui·ha·si·gi ba·ram·ni·da.",
          label: "Too formal",
          why_awkward:
            "건강에 유의하시기 바랍니다 is correct Korean. 유의하시기 바랍니다 is the standard closing formula of official health notices, corporate wellness emails, and public service messages. It carries no emotional weight by design — it is built for broadcast, not for family. 아프지 마 carries all the weight because it comes from a specific person to a specific person. The same literal meaning. Completely different relational function.",
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
        korean: "어서 와요. 말은 많이 들었어요. 반가워요.",
        english: "Come in. I've heard so much about you. I'm glad you're here.",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "별거 아니지만, 작은 선물을 가져왔습니다.",
        english: "It's nothing much, but I brought a small gift.",
      },
      {
        speaker: "어머님",
        side: "other",
        korean: "어머, 뭘. 고마워요. 들어와서 앉아요.",
        english: "Oh my. Thank you. Come in and sit down.",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "말씀 많이 들었습니다. 이렇게 뵙게 되어 정말 반갑습니다.",
        english: "I've heard so much about you. I'm truly glad to be meeting you like this.",
      },
      {
        speaker: "어머님",
        side: "other",
        korean: "저도 반가워요. 자주 와요. 밥은 먹었어요?",
        english: "I'm glad to meet you too. Come often. Have you eaten?",
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
        korean: "어, 왔어? 밥은?",
        english: "Oh, you're back? Have you eaten?",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "응, 대충 먹었어. 엄마 얼굴 보고 싶어서 왔어.",
        english: "Yeah, sort of. I came because I wanted to see you.",
      },
      {
        speaker: "어머니",
        side: "other",
        korean: "또 대충 먹었냐. 냉장고에 반찬 있잖아. 먹어.",
        english: "Again with 'sort of.' There's side dishes in the fridge. Eat.",
      },
      {
        speaker: "YOU",
        side: "user",
        korean: "알겠어. 아프지 마, 엄마.",
        english: "Okay. Don't get sick, Mom.",
      },
      {
        speaker: "어머니",
        side: "other",
        korean: "알았어. 너나 챙겨 먹어. 자주 와.",
        english: "I know. You take care of yourself. Come more often.",
      },
    ],
  },

  tone_guidance: {
    future_mother_in_law: {
      avoid:
        "반말 or casual 해요체 as an opener — signals you didn't prepare for the social weight of this moment. First impressions in Korean family culture are read carefully and remembered.",
      neutral:
        "해요체 without 처음 뵙겠습니다 — technically correct, but missing the ritual sequence. The phrases she was waiting for are absent. She will not say anything, but she will notice.",
      correct:
        "습니다체 ritual opener (처음 뵙겠습니다. 잘 부탁드립니다.) followed by warm 해요체 — you entered correctly, and now the conversation can breathe.",
      tone_summary:
        "The first meeting with a partner's mother is a social evaluation disguised as a greeting. Formal respect is the entry point — you earn warmth through it, not around it. 처음 뵙겠습니다 is not optional. Everything after it can be warmer.",
      spectrum: [
        { label: "반말", position: 0, recommended: false },
        { label: "해요체", position: 50, recommended: false },
        { label: "습니다체", position: 100, recommended: true },
      ],
    },

    your_mother: {
      avoid:
        "습니다체 — at home with your own mother, formal speech signals distance or conflict. It reads as something being wrong before she even asks.",
      neutral:
        "해요체 — possible, but slightly formal for a daily return home. Reads as a little distant from the register she expects from you.",
      correct:
        "반말 — the language of belonging. No performance, no register negotiation. Just presence. 나 왔어 is enough.",
      tone_summary:
        "With your own mother, 반말 is not casual speech — it is the register of family. The moment you switch to anything more formal, the relationship feels like it has shifted. She does not need ceremony. She needs you to be home.",
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
        question: "Complete the ritual first-meeting opener",
        prefix: "처음",
        blank: "뵙겠습니다",
        suffix: ". 잘 부탁드립니다.",
        answer: "뵙겠습니다",
        hint: "뵙___습니다",
      },
      {
        type: "fill_blank",
        question: "Complete — 'I've heard so much about you' (use the honorific word for 말)",
        prefix: "",
        blank: "말씀",
        suffix: " 많이 들었습니다.",
        answer: "말씀",
        hint: "말__",
      },
      {
        type: "fill_blank",
        question: "Complete — 'I am sincerely grateful' (deferential form)",
        prefix: "진심으로 감사",
        blank: "드립니다",
        suffix: ".",
        answer: "드립니다",
        hint: "드___니다",
      },
    ],

    your_mother: [
      {
        type: "fill_blank",
        question: "Complete the natural arriving-home signal",
        prefix: "나",
        blank: "왔어",
        suffix: ", 엄마.",
        answer: "왔어",
        hint: "왔__",
      },
      {
        type: "fill_blank",
        question: "Complete the compressed care question — one word",
        prefix: "",
        blank: "밥은",
        suffix: "?",
        answer: "밥은",
        hint: "밥__",
      },
      {
        type: "fill_blank",
        question: "Complete — 'Don't get sick' in 반말",
        prefix: "아프지",
        blank: "마",
        suffix: ".",
        answer: "마",
        hint: "마",
      },
    ],
  },
};

export default DL_005;
