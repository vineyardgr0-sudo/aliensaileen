import type { Lesson } from "@/types/lesson";

// ─────────────────────────────────────────────────────────────────
// DT_001 — Early Dating / 썸 Stage — Tone Shift
// Source: [260419] 연애 상황, [260520] Relationship-Based Scenario Ideas
// Relationships: early_stage (썸), established (couple)
// ─────────────────────────────────────────────────────────────────

const DT_001: Lesson = {
  meta: { id: "DT_001", category: "dating", lesson_number: 1, level: "beginner", topic: "early_dating_tone", status: "live", estimated_minutes: 9 },
  title: "Tone Shift in Korean Dating — 썸 to Closer",
  context: {
    description: "You went on a great date. You like them. But something about your Korean feels too formal — too much like a business meeting. In Korean dating, the distance between people is communicated through tone — not just words. The same sentence can feel warm or cold depending on how you say it.",
    location: "After a café date / Text message",
    interaction_time: "Post-date message or conversation",
    communication_style: "Emotionally warm, gradually closing distance, appropriately calibrated",
    goal: ["Express enjoyment of the date in the right emotional register", "Understand when 해요체 vs 반말 signals emotional distance", "Navigate the 말 놓기 (dropping formality) moment naturally"],
    cultural_note: "In Korean dating, tone is the primary signal of emotional distance. Using 습니다체 in a romantic context doesn't just sound formal — it sounds like you're conducting a job interview. The shift from 해요체 to 반말 is a significant relational milestone that Koreans navigate consciously.",
  },
  relationship_selection: {
    title: "What stage is this relationship?",
    description: "The same feelings produce different expressions depending on how established the relationship is.",
    options: [
      { id: "early_stage", label: "Early Stage — 썸 (Undefined)", summary: "Few dates in · Mutual interest · Careful distance", communication_traits: ["warm but measured", "emotionally cautious", "interested but not assuming", "subtle"], archetype: "early_romantic" },
      { id: "established", label: "Established — Dating / Closer", summary: "Confirmed relationship · Emotional closeness · Warmer register", communication_traits: ["emotionally open", "warmer", "comfortable", "more direct"], archetype: "established_romantic" },
    ],
  },
  decision_point: {
    variants: {
      early_stage: {
        question: "After a great date, you want to say 'Today was really fun.' Which sounds most natural for 썸 stage?",
        options: [
          { text: "오늘 진짜 재밌었어요 :)", tag: "correct", feedback: "Perfect — warm, natural 해요체 with subtle emotional warmth" },
          {
            text: "오늘 즐거웠습니다.",
            tag: "wrong",
            feedback: "Too formal — sounds like wrapping up a business meeting",
            explanation: {
              title: "습니다체 in dating = emotional wall",
              description: "After a fun date, 즐거웠습니다 creates immediate emotional distance. It's grammatically correct — but it signals formality at a moment when warmth is expected. Your date might feel like you didn't enjoy yourself, or that you're keeping them at arm's length.",
              details: ["습니다체 is for professional/formal contexts", "In dating, formal register signals low emotional investment", "The contrast between 'fun date' and 'formal language' feels incongruent"],
              natural_alternative: ["오늘 진짜 재밌었어요", "오늘 즐거웠어요 :)"],
              formality_analysis: { used: "습니다체", why_wrong: "Romantic contexts require warmer register than professional ones", recommended: "해요체" },
            },
          },
          {
            text: "오늘 재밌었어.",
            tag: "neutral",
            feedback: "Warm — but 반말 at 썸 stage assumes too much closeness",
            explanation: {
              title: "반말 before 말 놓기 can feel presumptuous",
              description: "At 썸 stage, switching to 반말 without the mutual 말 놓기 moment can feel like you're assuming intimacy that hasn't been established. It might be fine — but it's a social risk. Some people will feel it's presumptuous.",
              details: ["반말 is a milestone, not a default", "Unilateral switch to 반말 without mutual agreement feels pushy", "Better to wait for the right moment to ask '말 놓을까요?'"],
              natural_alternative: ["오늘 진짜 재밌었어요 :)", "오늘 너무 좋았어요"],
              formality_analysis: { used: "반말", why_wrong: "Appropriate eventually — but timing matters at 썸 stage", recommended: "해요체" },
            },
          },
        ],
      },
      established: {
        question: "You're in an established relationship. After a good day together, which feels most natural?",
        options: [
          { text: "오늘 너무 좋았어. 또 이런 날 만들자.", tag: "correct", feedback: "Natural — 반말 with warmth and forward-looking connection" },
          {
            text: "오늘 즐거웠어요. 다음에 또 봐요.",
            tag: "neutral",
            feedback: "Grammatically fine — but 해요체 creates unexpected distance in an established relationship",
            explanation: {
              title: "해요체 with a partner can feel emotionally distant",
              description: "In an established relationship, maintaining 해요체 can feel like emotional distance — like you're keeping them at arm's length. Your partner might feel the relationship isn't progressing, or that something is wrong emotionally.",
              details: ["해요체 is appropriate before 말 놓기 milestone", "After that milestone, 해요체 can signal emotional retreat", "Partners often unconsciously use formality to create distance when they're upset"],
              natural_alternative: ["오늘 너무 좋았어", "오늘 진짜 행복했어"],
              formality_analysis: { used: "해요체", why_wrong: "Over-formal for an established romantic relationship", recommended: "반말" },
            },
          },
          {
            text: "오늘 즐거웠습니다. 다음 만남을 기대하겠습니다.",
            tag: "wrong",
            feedback: "This sounds like closing a business contract, not ending a date",
            explanation: {
              title: "습니다체 in a romantic relationship is jarring",
              description: "Using 습니다체 with a romantic partner feels absurd — like suddenly talking to them like a client. It creates immediate emotional distance and confusion. If said sincerely, it reads as passive-aggressive. If said as a joke, it might land — but it's a gamble.",
              details: ["습니다체 signals professional, not personal relationship", "With an established partner, this registers as deliberate emotional withdrawal", "Creates confusion about relational status"],
              natural_alternative: ["오늘 너무 좋았어", "오늘 행복했어. 고마워."],
              formality_analysis: { used: "습니다체", why_wrong: "Completely inappropriate register for romantic relationship", recommended: "반말" },
            },
          },
        ],
      },
    },
  },
  vocabulary: {
    early_stage: [
      { word: "설레다", pronunciation: "/sʌl·le·da/", meaning: "To feel butterflies / excited anticipation", usage: "Use 설레요 — captures romantic excitement without being too forward.", formality: "해요체" },
      { word: "말 놓다", pronunciation: "/mal no·ta/", meaning: "To drop formal speech / switch to 반말", usage: "The relational milestone. 말 놓을까요? = 'Shall we speak casually?'" },
      { word: "자연스럽다", pronunciation: "/tɕa·yʌn·sɯ·rʌp̚·ta/", meaning: "Natural / feeling natural", usage: "자연스럽게 = naturally. Good for describing comfortable interactions." },
      { word: "어색하다", pronunciation: "/ʌ·sɛ·ka·da/", meaning: "Awkward / uncomfortable", usage: "어색해요 = It feels awkward. Honest and relatable." },
    ],
    established: [
      { word: "편하다", pronunciation: "/pʰyʌn·ha·da/", meaning: "Comfortable / at ease", usage: "너한테 제일 편해 = I'm most comfortable with you. Deep relational warmth.", formality: "반말" },
      { word: "행복하다", pronunciation: "/hɛŋ·bo·ka·da/", meaning: "Happy / content", usage: "오늘 행복했어 = Today I was happy. Simple, direct, emotionally present.", formality: "반말" },
      { word: "보고 싶다", pronunciation: "/po·go ɕip̚·ta/", meaning: "Miss you / want to see you", usage: "보고 싶어 = I miss you. The most natural expression of longing in Korean.", formality: "반말" },
      { word: "다음에 또", pronunciation: "/ta·ɯ·me to/", meaning: "Again next time", usage: "다음에 또 만나자 = Let's meet again next time. Natural closing phrase." },
    ],
  },
  phrases: {
    early_stage: [
      { korean: "오늘 진짜 재밌었어요 :)", pronunciation: "o·nɯl jin·jja tɕɛ·mi·s͈ʌ·s͈ʌ·jo", english: "Today was really fun :)", why_it_works: "진짜 adds emotional authenticity without being too forward. 해요체 is warm but maintains the appropriate distance for 썸 stage." },
      { korean: "다음에 또 만나요", pronunciation: "ta·ɯ·me to man·na·jo", english: "Let's meet again next time", why_it_works: "Natural, forward-looking, and not presumptuous. The 요 ending keeps it appropriately warm without assuming intimacy." },
      { korean: "말 놓을까요?", pronunciation: "mal no·ɯl·k͈a·jo", english: "Shall we speak more casually?", why_it_works: "This is the most important phrase in Korean dating progression. Asking permission for 말 놓기 shows emotional intelligence and respect. It's a milestone moment." },
    ],
    established: [
      { korean: "오늘 너무 좋았어. 또 이런 날 만들자.", pronunciation: "o·nɯl nʌ·mu tɕo·a·s͈ʌ. to i·rʌn nal man·dɯl·tɕa", english: "Today was so good. Let's make more days like this.", why_it_works: "반말 + 자 (let's) shows comfort and shared future-building. The warmth is in the assumption of 'we' without needing to say it." },
      { korean: "오늘도 고마워", pronunciation: "o·nɯl·do ko·ma·wʌ", english: "Thank you for today (as always)", why_it_works: "도 (also/as always) implies the gratitude isn't new — it's ongoing. Creates emotional continuity and depth with one small word." },
      { korean: "너 덕분에 요즘 좋아", pronunciation: "nʌ tʌk̚·p͈u·ne jo·dʑɯm tɕo·a", english: "Things have been good lately, because of you", why_it_works: "덕분에 appears here too — but now in 반말, directed personally. The most emotionally resonant way to say 'you've made my life better.'" },
    ],
  },
  dialogue: {
    early_stage: [
      { speaker: "YOU", side: "fan", korean: "오늘 진짜 재밌었어요. 시간 가는 줄 몰랐어요.", english: "Today was really fun. I didn't notice time passing." },
      { speaker: "THEM", side: "idol", korean: "저도요! 오늘 정말 좋았어요.", english: "Me too! Today was really good." },
      { speaker: "YOU", side: "fan", korean: "다음에 또 만나요. 말 놓을까요?", english: "Let's meet again next time. Shall we speak casually?" },
      { speaker: "THEM", side: "idol", korean: "그래요! 편하게 해요.", english: "Sure! Let's be comfortable." },
    ],
    established: [
      { speaker: "YOU", side: "fan", korean: "오늘 너무 좋았어. 항상 고마워.", english: "Today was so good. Thank you, always." },
      { speaker: "THEM", side: "idol", korean: "나도. 너 덕분에 요즘 좋아.", english: "Me too. Things have been good lately because of you." },
      { speaker: "YOU", side: "fan", korean: "또 이런 날 만들자.", english: "Let's make more days like this." },
      { speaker: "THEM", side: "idol", korean: "응, 그러자.", english: "Yeah, let's." },
    ],
  },
  tone_guidance: {
    early_stage: {
      avoid: "습니다체 in any romantic context — sounds like a job interview. Even 해요체 can feel cold if the content is too measured and controlled.",
      neutral: "Standard 해요체 without emotional markers — grammatically correct but emotionally flat. Add 진짜/정말, subtle emoji, and relational observations to add warmth.",
      correct: "해요체 + authentic emotional markers (진짜, 너무, 정말) — signals interest while respecting the undefined nature of 썸 stage. Warm but not presumptuous.",
      tone_summary: "At 썸 stage, the goal is: warm enough to show interest, restrained enough to respect undefined status. 해요체 with emotional authenticity is the calibration. Avoid both extremes — cold formality AND premature 반말.",
      spectrum: [{ label: "습니다체", position: 0, recommended: false }, { label: "해요체", position: 50, recommended: true }, { label: "반말", position: 100, recommended: false }],
    },
    established: {
      avoid: "습니다체 entirely — completely wrong register for romantic relationship. Extended 해요체 without 반말 can also signal emotional distance once the relationship is established.",
      neutral: "해요체 — fine in early stages, but once 말 놓기 has happened, extended 해요체 can feel like you're keeping emotional distance intentionally.",
      correct: "반말 with warmth markers (너무, 진짜, 고마워, 좋아) — emotionally direct, appropriately close, naturally flowing. 반말 isn't just grammar — it's intimacy made visible in language.",
      tone_summary: "In an established relationship, Korean 반말 is the language of intimacy. It doesn't just mean 'casual' — it means 'I'm fully present with you, no social distance required.' Maintaining 해요체 with a partner after 말 놓기 often signals something is wrong emotionally.",
      spectrum: [{ label: "습니다체", position: 0, recommended: false }, { label: "해요체", position: 40, recommended: false }, { label: "반말", position: 100, recommended: true }],
    },
  },
  quiz: {
    early_stage: [
      { type: "fill_blank", question: "After a great date: 'Today was really ___' (warm 해요체)", prefix: "오늘 진짜 재밌", blank: "었어요", suffix: " :)", answer: "었어요", hint: "었___요" },
      { type: "fill_blank", question: "The phrase to propose dropping formality: Shall we speak casually?", prefix: "말", blank: "놓을까요", suffix: "?", answer: "놓을까요", hint: "놓___까요" },
    ],
    established: [
      { type: "fill_blank", question: "Warm 반말 closer: 'Thank you for today (as always)'", prefix: "오늘도", blank: "고마워", suffix: "", answer: "고마워", hint: "고___워" },
      { type: "fill_blank", question: "Express gratitude through shared credit: 'Because of you, things have been good lately'", prefix: "너", blank: "덕분에", suffix: "요즘 좋아", answer: "덕분에", hint: "덕___에" },
    ],
  },
};

export default DT_001;
