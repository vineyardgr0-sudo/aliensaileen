import type { Lesson } from "@/types/lesson";

// ─────────────────────────────────────────────────────────────────
// BM_001 — First Business Meeting
// Source: [SCENARIO_260504] First Business Meeting (Upgraded v4)
// Relationships: senior_executive, familiar_client
// ─────────────────────────────────────────────────────────────────

const BM_001: Lesson = {
  meta: { id: "BM_001", category: "workplace", lesson_number: 1, level: "beginner", topic: "first_business_meeting", status: "live", estimated_minutes: 10 },
  title: "First Business Meeting — Korean Client",
  context: {
    description: "You are meeting a Korean client before the business discussion begins. The client has just arrived at the meeting room. In Korean business culture, the first 30–60 seconds are critical for emotional calibration, hierarchy awareness, and relational tone-setting — before any agenda is discussed.",
    location: "Meeting room, Korean office",
    interaction_time: "30–60 seconds",
    communication_style: "Professionally warm, hierarchy-aware, relationally intelligent",
    goal: ["Set the right relational tone before business begins", "Acknowledge the client's effort and time", "Create professional warmth without sounding scripted"],
    cultural_note: "Korean business communication often prioritizes emotional calibration before agenda discussion. Expressions like 덕분에 (thanks to you) and 바쁘신 와중에도 (despite your busy schedule) are not filler — they communicate hierarchy awareness and relational consideration.",
  },
  relationship_selection: {
    title: "Who is this client?",
    description: "The relationship changes everything — tone, vocabulary, and formality shift significantly based on seniority and familiarity.",
    options: [
      { id: "senior_executive", label: "Senior Executive Client", summary: "CEO/Director · First or formal meeting · High hierarchy", communication_traits: ["respectful", "emotionally controlled", "professionally warm", "hierarchy-aware"], archetype: "senior_formal" },
      { id: "familiar_client", label: "Familiar Client / Same Level", summary: "Similar rank · Met before · Warmer register acceptable", communication_traits: ["warmer", "conversational", "relaxed professionalism", "comfortable"], archetype: "peer_familiar" },
    ],
  },
  decision_point: {
    variants: {
      senior_executive: {
        question: "Your senior client just arrived. What do you say first?",
        options: [
          {
            text: "바쁘신 와중에도 시간 내주셔서 감사합니다",
            tag: "correct",
            feedback: "Natural — acknowledges their time, shows hierarchy awareness",
            explanation: {
              title: "바쁘신 와중에도 — Recognizing the value of their time",
              description: "This expression does more than say 'thank you.' It signals: 'I know your schedule matters. I appreciate that you chose to be here.' In Korean business culture, acknowledging effort before business begins creates relational warmth and demonstrates social intelligence.",
              details: ["Acknowledges busyness = recognizes their position and importance", "Showing appreciation before business = Korean relationship-first culture", "Sets a professionally warm tone for the entire meeting"],
              natural_alternative: ["오시느라 고생 많으셨습니다", "찾는 데 어렵진 않으셨어요?"],
              formality_analysis: { used: "습니다체", why_wrong: "", recommended: "습니다체" },
            },
          },
          {
            text: "안녕하세요. 시작할까요?",
            tag: "wrong",
            feedback: "Too abrupt — skips the relational opening entirely",
            explanation: {
              title: "Jumping to business feels cold in Korean culture",
              description: "In Korean business meetings, starting immediately with agenda discussion — without any relational warm-up — reads as socially unaware, even rude. The first 30 seconds are for relationship, not business.",
              details: ["No acknowledgment of client's effort or time", "Feels transactional and emotionally cold", "Signals lack of social calibration"],
              natural_alternative: ["바쁘신 와중에도 시간 내주셔서 감사합니다", "오시느라 고생 많으셨습니다"],
              formality_analysis: { used: "해요체", why_wrong: "Register is acceptable but the content skips the necessary relational opening", recommended: "습니다체" },
            },
          },
          {
            text: "잘 지내셨어요?",
            tag: "neutral",
            feedback: "Acceptable — but too casual for a first formal meeting",
            explanation: {
              title: "Too familiar for a first senior-level meeting",
              description: "'잘 지내셨어요?' works between people who already have a relationship. Used with a senior executive at a first meeting, it can feel like you're assuming familiarity that doesn't yet exist.",
              details: ["Implies existing social relationship", "Appropriate for second or third meeting, not the first", "Senior executives expect more formal acknowledgment initially"],
              natural_alternative: ["바쁘신 와중에도 시간 내주셔서 감사합니다", "처음 뵙겠습니다. 잘 부탁드립니다."],
              formality_analysis: { used: "해요체", why_wrong: "Content implies familiarity that doesn't exist yet", recommended: "습니다체" },
            },
          },
        ],
      },
      familiar_client: {
        question: "Your familiar client (same level, met before) just arrived. What feels most natural?",
        options: [
          {
            text: "오시느라 고생 많으셨어요. 덕분에 지난번 계약도 잘 됐어요.",
            tag: "correct",
            feedback: "Natural — warm acknowledgment + relationship continuity",
            explanation: {
              title: "덕분에 — Distributing credit creates relational warmth",
              description: "'덕분에 (thanks to you)' is not just politeness — it's a relational move. It says: 'Our success belongs to us both.' In Korean communication, openly claiming personal achievement can sound self-centered. Sharing credit creates warmth and lowers social tension.",
              details: ["덕분에 acknowledges their contribution to shared success", "Referencing past work creates continuity and trust", "해요체 is right for peer-level familiar relationships"],
              natural_alternative: ["잘 오셨어요. 덕분에 잘 진행됐어요.", "오랜만에 뵙네요. 잘 지내셨죠?"],
            },
          },
          {
            text: "왔어요? 앉아요.",
            tag: "wrong",
            feedback: "Too casual — reads as dismissive even with familiarity",
            explanation: {
              title: "반말 + command tone is jarring in professional context",
              description: "Even with familiar clients, the workplace context requires maintaining a professional register. This phrasing would only be appropriate with a very close colleague of equal or lower rank — never a client.",
              details: ["반말 command form is inappropriate with clients", "Feels dismissive regardless of familiarity", "Korean business culture maintains politeness even among peers"],
              natural_alternative: ["어서 오세요. 오시느라 고생하셨어요.", "잘 오셨어요. 앉으시죠."],
              formality_analysis: { used: "반말", why_wrong: "Client relationships always require at minimum 해요체", recommended: "해요체" },
            },
          },
          {
            text: "바쁘신 와중에도 시간 내주셔서 감사합니다.",
            tag: "neutral",
            feedback: "Polite — but slightly over-formal for a familiar relationship",
            explanation: {
              title: "습니다체 creates unnecessary distance with a familiar client",
              description: "This expression is perfect for a senior executive. With a familiar same-level client, it creates a slightly awkward formality — as if the relationship has reset, or you're being overly proper. 해요체 would feel warmer.",
              details: ["습니다체 with familiar clients can feel like a social reset", "The relationship earned a warmer register", "Not wrong — just slightly off-calibrated"],
              natural_alternative: ["오시느라 고생하셨어요. 덕분에 잘 됐어요.", "잘 오셨어요. 반가워요."],
              formality_analysis: { used: "습니다체", why_wrong: "Over-formal for an established peer relationship", recommended: "해요체" },
            },
          },
        ],
      },
    },
  },
  vocabulary: {
    senior_executive: [
      { word: "바쁘신 와중에도", pronunciation: "/pa·p͈ɯ·ɕin wa·dʑuŋ·e·do/", meaning: "Even during your busy schedule", usage: "Shows respect for their time and position. Essential in first senior meetings.", formality: "습니다체" },
      { word: "오시느라 고생하다", pronunciation: "/o·ɕi·nɯ·ra ko·sɛŋ·ha·da/", meaning: "Thank you for making the trip / You worked hard coming here", usage: "Acknowledges travel effort. Warm and considerate opening." },
      { word: "잘 부탁드립니다", pronunciation: "/tɕal pu·tak̚ tɯ·rim·ni·da/", meaning: "I look forward to working with you", usage: "Standard closing of a first introduction. Respectful and warm.", formality: "습니다체" },
      { word: "찾는 데 어렵지 않으셨어요", pronunciation: "/tɕʰan·nɯn de ʌ·rʌp̚·tɕi a·nɯ·ɕʌ·s͈ʌ·jo/", meaning: "Was it difficult to find the place?", usage: "Small-talk opener showing consideration. Creates immediate warmth." },
    ],
    familiar_client: [
      { word: "덕분에", pronunciation: "/tʌk̚·p͈u·ne/", meaning: "Thanks to you / Because of you", usage: "Distributes credit. Shows relational awareness. Use to acknowledge shared success.", formality: "해요체" },
      { word: "오랜만에", pronunciation: "/o·raen·ma·ne/", meaning: "It's been a while / Long time no see", usage: "Natural opener for returning clients. Warm and familiar." },
      { word: "잘 됐어요", pronunciation: "/tɕal dwei·s͈ʌ·jo/", meaning: "It went well / It worked out", usage: "Casual but professional way to reference positive past outcomes.", formality: "해요체" },
      { word: "잘 진행되고 있습니다", pronunciation: "/tɕal dʑin·hɛŋ·doe·go it̚·sɯm·ni·da/", meaning: "It is progressing well", usage: "More formal version. Use for formal updates to senior clients.", formality: "습니다체" },
    ],
  },
  phrases: {
    senior_executive: [
      { korean: "바쁘신 와중에도 시간 내주셔서 감사합니다", pronunciation: "pa·p͈ɯ·ɕin wa·dʑuŋ·e·do ɕi·gan nɛ·dʑu·ɕʌ·s͈ʌ kam·sa·ham·ni·da", english: "Thank you for making time despite your busy schedule", why_it_works: "The most critical phrase for senior clients. It positions you as hierarchy-aware and considerate — the two things Korean executives notice first." },
      { korean: "처음 뵙겠습니다. 잘 부탁드립니다", pronunciation: "tɕʰʌ·ɯm bwe·p̚·kes̚·sɯm·ni·da. tɕal pu·tak̚ tɯ·rim·ni·da", english: "Nice to meet you for the first time. I look forward to working with you", why_it_works: "Standard formal first introduction. 처음 뵙겠습니다 is the high-formality version of '처음 만나요' — signals you understand Korean business protocol." },
      { korean: "찾는 데 어렵진 않으셨어요?", pronunciation: "tɕʰan·nɯn de ʌ·rʌp̚·tɕin a·nɯ·ɕʌ·s͈ʌ·jo", english: "Was it difficult to find the place?", why_it_works: "Simple, warm, low-pressure opener. Creates immediate human connection before any business discussion." },
    ],
    familiar_client: [
      { korean: "오랜만에 뵙네요! 잘 지내셨죠?", pronunciation: "o·raen·ma·ne bwen·ne·jo! tɕal dʑi·nɛ·ɕʌt̚·tɕo", english: "It's been a while! You've been well, right?", why_it_works: "Warm, natural reunion opener. The rising 죠? makes it feel genuinely curious, not scripted." },
      { korean: "덕분에 지난번 계약 건도 잘 진행되고 있어요", pronunciation: "tʌk̚·p͈u·ne dʑi·nan·bʌn kjɛ·jak̚ k͈ʌn·do tɕal dʑin·hɛŋ·doe·go i·s͈ʌ·jo", english: "Thanks to you, the previous contract is also progressing well", why_it_works: "덕분에 shares credit immediately. This is the phrase that moves people — it signals relational intelligence and emotional maturity." },
      { korean: "오늘도 좋은 이야기 나눌 수 있을 것 같습니다", pronunciation: "o·nɯl·do tɕo·ɯn i·ya·gi na·nul su i·s͈ɯl gʌt̚ kat̚·sɯm·ni·da", english: "I think we'll be able to have a good conversation today too", why_it_works: "Forward-looking and warm. Creates anticipation for the meeting while reinforcing the existing positive relationship." },
    ],
  },
  dialogue: {
    senior_executive: [
      { speaker: "YOU", side: "user", korean: "바쁘신 와중에도 시간 내주셔서 감사합니다. 찾는 데 어렵진 않으셨어요?", english: "Thank you for making time despite your busy schedule. Was it difficult to find the place?" },
      { speaker: "CLIENT", side: "client", korean: "아니요, 괜찮았습니다. 잘 찾아왔어요.", english: "No, it was fine. I found it easily." },
      { speaker: "YOU", side: "user", korean: "다행입니다. 자리 앉으시겠어요? 오늘 좋은 이야기 나눌 수 있을 것 같습니다.", english: "I'm glad. Please have a seat. I think we'll be able to have a good conversation today." },
      { speaker: "CLIENT", side: "client", korean: "감사합니다. 그럼 시작해볼까요?", english: "Thank you. Shall we begin?" },
    ],
    familiar_client: [
      { speaker: "YOU", side: "user", korean: "오랜만에 뵙네요! 잘 지내셨죠?", english: "It's been a while! You've been well, right?" },
      { speaker: "CLIENT", side: "client", korean: "네, 잘 지냈어요. 요즘 바쁘셨죠?", english: "Yes, I've been well. You've been busy too, right?" },
      { speaker: "YOU", side: "user", korean: "덕분에 잘 지냈어요. 지난번 계약 건도 덕분에 잘 진행되고 있어요.", english: "Thanks to you I've been good. The previous contract is also progressing well thanks to you." },
      { speaker: "CLIENT", side: "client", korean: "다행이네요. 오늘도 잘 부탁드립니다.", english: "That's a relief. Please take care of things today as well." },
    ],
  },
  tone_guidance: {
    senior_executive: {
      avoid: "Jumping directly to business without relational warm-up. Skipping acknowledgment of their effort or time. Using 해요체 where 습니다체 is expected.",
      neutral: "Standard 해요체 greetings (안녕하세요, 잘 지내셨어요?) — grammatically fine, but missing the relational intelligence Korean executives appreciate.",
      correct: "습니다체 + relational expressions (바쁘신 와중에도, 덕분에, 오시느라 고생하셨습니다) — shows both formality awareness and emotional intelligence.",
      tone_summary: "Korean senior executives evaluate social calibration before business competence. The first 30 seconds signal whether you understand Korean relational culture. Warmth + hierarchy awareness is the combination that wins trust.",
      spectrum: [{ label: "반말", position: 0, recommended: false }, { label: "해요체", position: 40, recommended: false }, { label: "습니다체", position: 100, recommended: true }],
    },
    familiar_client: {
      avoid: "반말 in professional context — even with familiar clients. Too-formal 습니다체 that resets the relational distance you've built.",
      neutral: "Standard 해요체 greetings without relational references — polite but flat. Missing the warmth that deepens existing relationships.",
      correct: "해요체 + 덕분에 + references to past shared work — demonstrates relationship continuity and relational intelligence. The combination of warmth and professionalism.",
      tone_summary: "With familiar clients, the goal is to show the relationship has grown. 덕분에, 지난번, 오랜만에 — these signals say: 'I remember us, and I value what we've built.' That's what creates long-term client loyalty in Korean business culture.",
      spectrum: [{ label: "반말", position: 0, recommended: false }, { label: "해요체", position: 55, recommended: true }, { label: "습니다체", position: 100, recommended: false }],
    },
  },
  quiz: {
    senior_executive: [
      { type: "fill_blank", question: "Complete: Thank you for making time despite your busy schedule", prefix: "바쁘신 와중에도 시간 내주셔서", blank: "감사합니다", suffix: "", answer: "감사합니다", hint: "감___합니다" },
      { type: "fill_blank", question: "Complete: Was it difficult to find the place?", prefix: "찾는 데 어렵진", blank: "않으셨어요", suffix: "?", answer: "않으셨어요", hint: "않으___어요" },
    ],
    familiar_client: [
      { type: "fill_blank", question: "Complete: Thanks to you, it progressed well", prefix: "", blank: "덕분에", suffix: "잘 진행됐어요", answer: "덕분에", hint: "덕___에" },
      { type: "fill_blank", question: "Complete: It's been a while! — long time no see opener", prefix: "", blank: "오랜만에", suffix: "뵙네요!", answer: "오랜만에", hint: "오___만에" },
    ],
  },
};

export default BM_001;
