import type { Lesson } from "@/types/lesson";

const WP_003: Lesson = {
  meta: {
    id: "WP_004",
    category: "workplace",
    lesson_number: 4,
    level: "intermediate",
    topic: "responding_to_feedback",
    status: "preparing",
    estimated_minutes: 10,
  },

  title: "Responding to Feedback and Voicing a Different Opinion",

  context: {
    description:
      "Someone gives you feedback on your work, and you have a different opinion about it. How you respond — both to the feedback itself and to your own disagreement — depends on who you're responding to. But the underlying shape of the response stays the same across relationships: acknowledge, then suggest, then soften. Only the degree of cushioning changes.",
    location: "Office — after a review or feedback session",
    interaction_time: "10–20 seconds",
    communication_style: "Acknowledge first, then introduce your view carefully",
    goal: [
      "Respond to feedback without sounding either passive or defensive",
      "Voice a genuinely different opinion without it being read as pushback",
      "Match the level of cushioning to the relationship — heavier upward, lighter between peers",
      "Understand why acknowledgment comes before disagreement in Korean workplace speech",
    ],
    cultural_note:
      "In many Western communication contexts, responding to feedback by quickly explaining or defending your own position is read as natural — it shows your perspective is also worth considering immediately. In Korean workplace culture, feedback functions less as pure information exchange and more as a signal about attitude and relationship. If you respond by immediately defending yourself, this can be read — independent of the actual content — as 'this person doesn't take feedback well.' That becomes a trust issue, not just a content issue. Acknowledgment first signals: I respect this relationship, and I genuinely heard you. Only then does space open up for your own view. Between peers, the same acknowledge → suggest → soften shape still applies — but the cushioning is lighter, because the hierarchy gap is smaller.",
  },

  relationship_selection: {
    title: "Who gave you the feedback?",
    description:
      "The same situation — feedback you don't fully agree with — calls for different amounts of acknowledgment and softening depending on hierarchy. The underlying acknowledge-then-suggest shape is shared either way.",
    options: [
      {
        id: "senior",
        label: "선배/상사 (Senior or supervisor)",
        summary: "A supervisor gave feedback, and you have a different idea — disagreement needs to be handled carefully.",
        communication_traits: ["습니다체/해요체 mixed", "인정 → 제안 → 완화", "appreciation before anything else"],
        archetype: "hierarchical_senior",
      },
      {
        id: "peer",
        label: "동료 (Peer colleague)",
        summary: "A colleague at your level gave feedback on your work, and you see it differently.",
        communication_traits: ["해요체", "acknowledge then suggest", "lighter cushioning than with a senior"],
        archetype: "peer_colleague",
      },
    ],
  },

  decision_point: {
    variants: {
      senior: {
        question:
          "상사가 피드백을 줬는데, 당신은 다른 생각이 있습니다. 어떻게 말하는 것이 가장 자연스러울까요?",
        options: [
          {
            text: "네, 말씀 이해했습니다. 다만 제 생각에는 이런 방법도 가능할 것 같습니다.",
            tag: "correct",
            feedback:
              "인정 → 조심스러운 제안 → 완화 표현 — the expected structure when disagreeing upward.",
          },
          {
            text: "네, 알겠습니다.",
            tag: "neutral",
            feedback:
              "Safe and respectful, but doesn't express your actual opinion at all. Acknowledgment alone is appropriate when you don't actually have a differing view to express — but repeatedly defaulting to 알겠습니다 when you do have ideas can mean your input never gets heard.",
            explanation: {
              title: "Acknowledgment without the rest of the structure",
              description:
                "네, 알겠습니다 is a perfectly polite, low-risk response. The issue is not the register — it's that it stops at step one. The situation calls for voicing a different opinion, and this response doesn't do that. If the goal is just to acknowledge and move on, this works fine. But it doesn't accomplish what this exchange actually needed.",
              details: [
                "네, 알겠습니다 is correct Korean and a safe choice in many situations",
                "It communicates compliance, not a differing view",
                "If you have an alternative idea, this response leaves it unsaid — possibly permanently",
              ],
              natural_alternative: ["네, 말씀 이해했습니다. 다만 제 생각에는 이런 방법도 가능할 것 같습니다."],
              formality_analysis: {
                used: "습니다체",
                why_wrong: "Register is correct — the structure is incomplete",
                recommended: "습니다체",
              },
            },
          },
          {
            text: "그건 아닌 것 같습니다. 이렇게 하는 게 맞습니다.",
            tag: "wrong",
            feedback:
              "Leading with direct disagreement and a flat counter-claim skips acknowledgment entirely — too confrontational toward a supervisor.",
            explanation: {
              title: "Leading with rejection skips the precondition",
              description:
                "그건 아닌 것 같습니다 as an opener immediately frames the supervisor's input as wrong, with no acknowledgment first. 이렇게 하는 게 맞습니다 is a flat assertion, without the softening that signals room for discussion. Korean workplace disagreement upward follows acknowledge → suggest → soften, not lead-with-the-objection. Even when the disagreement is reasonable, leading with rejection can register as a relationship issue before the idea is even considered — this is the core cultural point of this lesson.",
              details: [
                "그건 아닌 것 같습니다 frames the supervisor's input as wrong before anything else is said",
                "이렇게 하는 게 맞습니다 is a flat claim — missing ~것 같습니다 softening",
                "The content of the disagreement may be completely reasonable; the structure is what causes the problem",
              ],
              natural_alternative: [
                "네, 말씀 이해했습니다. 다만 제 생각에는 이런 방법도 가능할 것 같습니다.",
                "좋은 의견 감사합니다. 다만 이런 방법도 가능할 것 같습니다.",
              ],
              formality_analysis: {
                used: "습니다체",
                why_wrong: "Register is correct — but the acknowledge-first structure is missing entirely",
                recommended: "습니다체",
              },
            },
          },
        ],
      },

      peer: {
        question:
          "동료가 당신의 작업물에 피드백을 줬는데, 당신은 다른 생각이 있습니다. 어떻게 말하는 것이 가장 자연스러울까요?",
        options: [
          {
            text: "아, 그 부분 그렇게 볼 수도 있겠네요. 근데 저는 이렇게 하는 것도 괜찮을 것 같아요.",
            tag: "correct",
            feedback:
              "Acknowledges the colleague's point first, then offers an alternative with softening — the peer-level acknowledge-then-suggest.",
          },
          {
            text: "음, 다시 한 번 생각해볼게요. 감사합니다.",
            tag: "neutral",
            feedback:
              "Polite and non-confrontational, but doesn't share your actual differing view. It works if you genuinely want to think it over — but if you already have a clear alternative, this avoids the actual exchange. Between peers there's more room to share directly — defaulting to 'I'll think about it' means useful perspectives don't get shared.",
            explanation: {
              title: "Polite, but the opinion stays unsaid",
              description:
                "음, 다시 한 번 생각해볼게요. 감사합니다 is natural and pleasant — and the register is correctly calibrated for a peer. The issue is the same as with 네, 알겠습니다 toward a senior: it's a safe stopping point, not the full exchange. Between peers there's generally more room to share a differing view directly than with a senior, so defaulting to 'I'll think about it' when you already disagree means a useful perspective doesn't get shared.",
              details: [
                "음 + ~볼게요 is correctly calibrated for 동료 — soft, casual, appropriate",
                "The content stops at 'I'll consider it' — your actual alternative view is never voiced",
                "Peers generally have more room than a junior-to-senior exchange to share a differing view directly",
              ],
              natural_alternative: ["아, 그 부분 그렇게 볼 수도 있겠네요. 근데 저는 이렇게 하는 것도 괜찮을 것 같아요."],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Register is correctly calibrated for a peer — the structure stops short of voicing the opinion",
                recommended: "해요체",
              },
            },
          },
          {
            text: "그건 아닌 것 같은데요. 제가 볼 때는 이게 맞아요.",
            tag: "wrong",
            feedback:
              "Even between peers, leading with 'that's not right' and a flat counter-claim skips acknowledgment and can read as dismissive.",
            explanation: {
              title: "Flat rejection, even at peer level",
              description:
                "Peers have more room for directness than a junior-to-senior exchange, but opening with 그건 아닌 것 같은데요 still frames the colleague's feedback as simply wrong before considering it. 제가 볼 때는 이게 맞아요 is also a flat assertion of correctness. Peer feedback exchanges still benefit from acknowledge-then-suggest — the difference from senior exchanges is in degree of cushioning, not the basic shape. Repeatedly dismissing peer feedback this way can make colleagues less willing to give feedback at all.",
              details: [
                "그건 아닌 것 같은데요 frames the colleague's input as wrong before anything else",
                "제가 볼 때는 이게 맞아요 is a flat claim with no softening",
                "The acknowledge-first shape still applies between peers — only the weight of the cushioning differs",
              ],
              natural_alternative: ["아, 그 부분 그렇게 볼 수도 있겠네요. 근데 저는 이렇게 하는 것도 괜찮을 것 같아요."],
              formality_analysis: {
                used: "해요체",
                why_wrong: "Register is casual-appropriate for a peer — but acknowledgment is skipped entirely",
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
        word: "말씀 이해했습니다",
        pronunciation: "/mal·sseum i·hae·hae·sseum·ni·da/",
        meaning: "I understood what you said (humble)",
        usage:
          "Standard acknowledgment opener before introducing a differing view to a senior. 말씀 (honorific for 말) signals you are referring to a superior's words with the correct register — the first step of acknowledge → suggest → soften.",
        formality: "습니다체",
      },
      {
        word: "다만",
        pronunciation: "/da·man/",
        meaning: "however / that said",
        usage:
          "The transitional word that carries the conversation from acknowledgment to your own view. 다만 signals: I heard you, and now here is something additional — not a contradiction, an addition.",
        formality: "습니다체",
      },
      {
        word: "~것 같습니다",
        pronunciation: "/-geot ga·seum·ni·da/",
        meaning: "I think it might be...",
        usage:
          "The softening ending that frames a suggestion as a possibility rather than a claim. Without it, 이런 방법도 가능합니다 sounds like a counter-assertion. With it, the same idea sounds like an offering for consideration.",
        formality: "습니다체",
      },
      {
        word: "좋은 의견 감사합니다",
        pronunciation: "/jo·eun ui·gyeon gam·sa·ham·ni·da/",
        meaning: "Thank you for the good suggestion",
        usage:
          "An even warmer variant of the acknowledgment step — leads with explicit gratitude rather than just confirming you understood. Useful when you want the acknowledgment itself to carry more warmth before introducing your view.",
        formality: "습니다체",
      },
      {
        word: "앞으로 더 주의하겠습니다",
        pronunciation: "/a·peu·ro deo ju·ui·ha·get·seum·ni·da/",
        meaning: "I'll be more careful about this going forward",
        usage:
          "Used when the feedback is accepted rather than countered. ~겠습니다 here signals a commitment — this closing shows responsibility, which is highly valued in Korean work culture. Different context from disagreement: this is for when you agree.",
        formality: "습니다체",
      },
    ],

    peer: [
      {
        word: "그렇게 볼 수도 있겠네요",
        pronunciation: "/geu·reo·ke bol su·do it·get·ne·yo/",
        meaning: "I guess it could be seen that way too",
        usage:
          "Light acknowledgment of a colleague's perspective before offering an alternative. 볼 수도 있겠네요 (could be seen that way) is lighter than 이해했습니다 — appropriate for the smaller hierarchy gap between peers, while still doing the acknowledgment work.",
        formality: "해요체",
      },
      {
        word: "근데",
        pronunciation: "/geun·de/",
        meaning: "but / by the way (casual)",
        usage:
          "The casual transition into a differing view, appropriate between peers. 근데 carries the same bridging function as 다만 in the senior register, but with the informality that matches peer-level speech.",
        formality: "해요체",
      },
      {
        word: "~것 같아요",
        pronunciation: "/-geot ga·ta·yo/",
        meaning: "I think it might be... (해요체)",
        usage:
          "The peer-level version of the softening ending. Same function as ~것 같습니다 — frames a suggestion as a possibility — but in the register that fits a colleague rather than a supervisor.",
        formality: "해요체",
      },
      {
        word: "말씀해주셔서 감사해요",
        pronunciation: "/mal·sseum·hae·ju·syeo·seo gam·sa·hae·yo/",
        meaning: "Thanks for bringing that up",
        usage:
          "Reframes the disagreement as something useful that was raised, rather than a correction received. 말씀해주셔서 retains a touch of honorific politeness even in 해요체 — appropriate when thanking a peer for feedback specifically.",
        formality: "해요체",
      },
      {
        word: "같이 봐볼까요",
        pronunciation: "/ga·chi bwa·bol·kka·yo/",
        meaning: "Should we take a look together?",
        usage:
          "Turns a one-directional correction into a shared activity. ~까요 (shall we) invites collaboration — defuses the disagreement by making it a joint problem rather than your view versus their view.",
        formality: "해요체",
      },
    ],
  },

  phrases: {
    senior: [
      {
        korean: "네, 말씀 이해했습니다. 다만 제 생각에는 이런 방법도 가능할 것 같습니다.",
        pronunciation: "ne, mal·sseum i·hae·hae·sseum·ni·da. da·man je saeng·ga·ge·neun i·reon bang·beop·do ga·neung·hal geot ga·seum·ni·da.",
        english: "Yes, I understood what you said. That said, I think this approach might also be possible.",
        why_it_works:
          "인정 → 제안 → 완화 — the full expected structure for disagreeing with a supervisor. 네, 말씀 이해했습니다 sends the signal that the relationship and hierarchy are respected before anything else. 다만 carries the conversation forward without contradiction. ~것 같습니다 keeps the suggestion in the space of a possibility, not a claim.",
        awkward: {
          korean: "그건 아닌 것 같습니다. 이렇게 하는 게 맞습니다.",
          pronunciation: "geu·geon a·nin geot ga·seum·ni·da. i·reo·ke ha·neun ge mat·seum·ni·da.",
          label: "Incorrect register",
          why_awkward:
            "Both sentences are grammatically correct 습니다체. The problem is sequence and shape, not politeness level. Korean disagreement upward requires acknowledgment before the alternative is introduced — leading with 그건 아닌 것 같습니다 places the supervisor's input in the wrong category (rejected) before your own idea has been heard. The register is appropriate; the structure is not.",
        },
      },
      {
        korean: "좋은 의견 감사합니다. 다만 이런 방법도 가능할 것 같습니다.",
        pronunciation: "jo·eun ui·gyeon gam·sa·ham·ni·da. da·man i·reon bang·beop·do ga·neung·hal geot ga·seum·ni·da.",
        english: "Thank you for the good suggestion. That said, this approach might also be possible.",
        why_it_works:
          "Leads with explicit gratitude rather than just acknowledgment — an even warmer variant of the same acknowledge → suggest → soften structure. 좋은 의견 감사합니다 does more relational work than 말씀 이해했습니다 alone, useful when the relationship benefits from extra warmth before the differing view lands.",
        awkward: {
          korean: "그렇게 생각하실 수도 있지만, 저는 다르게 생각합니다.",
          pronunciation: "geu·reo·ke saeng·ga·ka·sil su·do it·ji·man, jeo·neun da·reu·ge saeng·ga·kam·ni·da.",
          label: "Too generic",
          why_awkward:
            "그렇게 생각하실 수도 있지만 sounds like acknowledgment, and 저는 다르게 생각합니다 is grammatically correct 습니다체. But the combination is generic — it could be said in almost any disagreement, to almost anyone, about almost anything. It doesn't credit the supervisor's specific feedback or frame your idea as an addition (다만 + ~것 같습니다). The acknowledge-suggest-soften shape is present in form but not in substance.",
        },
      },
      {
        korean: "앞으로 더 주의하겠습니다.",
        pronunciation: "a·peu·ro deo ju·ui·ha·get·seum·ni·da.",
        english: "I'll be more careful about this going forward.",
        why_it_works:
          "When the feedback is accepted rather than countered, this closing shows responsibility — highly valued in Korean work culture. ~겠습니다 here is a commitment, not a report. This phrase belongs to a different branch of the same situation: not every piece of feedback needs a counter-suggestion, and knowing when to simply commit is part of the same fluency.",
        awkward: {
          korean: "네, 그렇게 할게요.",
          pronunciation: "ne, geu·reo·ke hal·ge·yo.",
          label: "Incorrect register",
          why_awkward:
            "그렇게 할게요 is natural Korean — but 해요체 in response to a supervisor's feedback, where 습니다체 has been the register of the entire exchange, creates a register mismatch within the same conversation. ~겠습니다 also carries more weight as a commitment than ~할게요. The content is fine; the shift in register mid-conversation is what reads as off.",
        },
      },
    ],

    peer: [
      {
        korean: "아, 그 부분 그렇게 볼 수도 있겠네요. 근데 저는 이렇게 하는 것도 괜찮을 것 같아요.",
        pronunciation: "a, geu bu·bun geu·reo·ke bol su·do it·get·ne·yo. geun·de jeo·neun i·reo·ke ha·neun geot·do gwaen·cha·nul geot ga·ta·yo.",
        english: "Ah, I guess that part could be seen that way too. But I think doing it this way could also be fine.",
        why_it_works:
          "Acknowledges the colleague's framing before pivoting to an alternative — the peer-level acknowledge-then-suggest. 아 as an opener adds a moment of genuine consideration. 그렇게 볼 수도 있겠네요 is lighter than the senior-register 이해했습니다, matching the smaller hierarchy gap, while still doing the acknowledgment work before 근데 introduces the alternative.",
        awkward: {
          korean: "네, 다시 한 번 생각해보겠습니다. 감사합니다.",
          pronunciation: "ne, da·si han beon saeng·ga·kae·bo·get·seum·ni·da. gam·sa·ham·ni·da.",
          label: "Incorrect register",
          why_awkward:
            "네 + ~겠습니다 belongs to the 선배/상사 register — the same structure used earlier in this lesson for responding to a supervisor (말씀 이해했습니다, 주의하겠습니다). Used with a peer, it sounds like you're reporting to someone above you rather than talking to someone at your level. 음 + ~볼게요 is the 동료 register: a softer opener, a casual softening verb form. The content is the same — 'I'll think about it' — but ~겠습니다 turns a peer exchange into a hierarchy exchange.",
        },
      },
      {
        korean: "말씀해주셔서 감사해요. 한번 같이 봐볼까요?",
        pronunciation: "mal·sseum·hae·ju·syeo·seo gam·sa·hae·yo. han·beon ga·chi bwa·bol·kka·yo?",
        english: "Thanks for bringing that up. Should we take a look together?",
        why_it_works:
          "Reframes the disagreement as a shared problem to look at, rather than a one-sided correction in either direction. ~까요 (shall we) is an invitation, not a concession — it moves the exchange from 'who is right' to 'let's figure this out,' which is often the most natural peer-level resolution.",
        awkward: {
          korean: "그건 제가 알아서 할게요.",
          pronunciation: "geu·geon je·ga a·ra·seo hal·ge·yo.",
          label: "Focus shifted away from listener",
          why_awkward:
            "제가 알아서 할게요 (I'll handle it myself) is natural 해요체 — the register is fine. The issue is that it closes the exchange around yourself. The colleague offered feedback; this response neither acknowledges it nor builds on it — it just ends the conversation. 같이 봐볼까요 keeps the colleague in the loop; 알아서 할게요 removes them from it.",
        },
      },
      {
        korean: "그 의견도 좋은데, 이 부분은 조금 다르게 생각했어요.",
        pronunciation: "geu ui·gyeon·do jo·eun·de, i bu·bu·neun jo·geum da·reu·ge saeng·ga·kae·sseo·yo.",
        english: "That idea is good too, but I thought about this part a bit differently.",
        why_it_works:
          "Validates the colleague's input (그 의견도 좋은데) before introducing the different view — keeps the exchange collaborative. 조금 다르게 생각했어요 (I thought about it a bit differently) frames the difference as a separate train of thought, not a correction of theirs.",
        awkward: {
          korean: "그 의견은 별로인 것 같고, 제 생각이 더 나아요.",
          pronunciation: "geu ui·gyeo·neun byeol·ro·in geot gat·go, je saeng·ga·gi deo na·a·yo.",
          label: "Too casual",
          why_awkward:
            "별로인 것 같고 (not great) directly evaluates the colleague's idea negatively before offering your own, and 제 생각이 더 나아요 (my idea is better) is a comparative claim — ranking your idea above theirs. Both pieces are 해요체 and not grammatically wrong, but together they skip validation entirely and frame the exchange as a competition rather than two ideas sitting side by side.",
        },
      },
    ],
  },

  dialogue: {
    senior: [
      {
        speaker: "상사",
        side: "colleague",
        korean: "이 부분은 이렇게 진행하는 게 좋을 것 같아요.",
        english: "I think it'd be good to proceed with this part this way.",
      },
      {
        speaker: "나",
        side: "user",
        korean: "네, 말씀 이해했습니다.",
        english: "Yes, I understood what you said.",
      },
      {
        speaker: "나",
        side: "user",
        korean: "다만 제 생각에는 이런 방법도 가능할 것 같습니다.",
        english: "That said, I think this approach might also be possible.",
      },
      {
        speaker: "상사",
        side: "colleague",
        korean: "오, 그것도 괜찮은 방법이네요. 한번 검토해봅시다.",
        english: "Oh, that's also a good approach. Let's look into it.",
      },
    ],

    peer: [
      {
        speaker: "동료",
        side: "colleague",
        korean: "이 부분, 이렇게 하면 더 나을 것 같아요.",
        english: "For this part, I think it'd be better done this way.",
      },
      {
        speaker: "나",
        side: "user",
        korean: "아, 그 부분 그렇게 볼 수도 있겠네요.",
        english: "Ah, I guess that part could be seen that way too.",
      },
      {
        speaker: "나",
        side: "user",
        korean: "근데 저는 이렇게 하는 것도 괜찮을 것 같아요.",
        english: "But I think doing it this way could also be fine.",
      },
      {
        speaker: "동료",
        side: "colleague",
        korean: "오, 그것도 좋네요. 둘 다 한번 비교해볼까요?",
        english: "Oh, that's good too. Should we compare both?",
      },
    ],
  },

  tone_guidance: {
    senior: {
      avoid:
        "그건 아닌 것 같습니다. 이렇게 하는 게 맞습니다. — leads with rejection, no acknowledgment or softening.",
      neutral:
        "네, 알겠습니다. — safe, but doesn't voice the actual differing opinion.",
      correct:
        "인정 (말씀 이해했습니다) → 제안 (다만 제 생각에는) → 완화 (~것 같습니다)",
      tone_summary:
        "Disagreement upward needs all three steps — acknowledge, then propose, then soften. Skipping acknowledgment is the most common register failure here, and is the step most likely to be skipped by learners from cultures where defending one's position quickly is the norm.",
      spectrum: [
        { label: "반말", position: 0, recommended: false },
        { label: "해요체", position: 50, recommended: false },
        { label: "습니다체", position: 100, recommended: true },
      ],
    },

    peer: {
      avoid:
        "그건 아닌 것 같은데요. 제가 볼 때는 이게 맞아요. — flat rejection even between equals.",
      neutral:
        "다시 한 번 생각해볼게요. 감사합니다. — polite, but avoids sharing the actual differing view.",
      correct:
        "Light acknowledgment (그렇게 볼 수도 있겠네요) → alternative (근데 저는 ~것 같아요)",
      tone_summary:
        "The same acknowledge-then-suggest shape applies between peers, just with lighter cushioning — equals can move to the alternative faster without it feeling abrupt, but skipping acknowledgment entirely still risks the same 'relationship vs. content' problem, just at a smaller scale.",
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
        question: "Complete — acknowledgment opener before a differing view",
        prefix: "네, 말씀",
        blank: "이해했습니다",
        suffix: ". 다만 제 생각에는 이런 방법도 가능할 것 같습니다.",
        answer: "이해했습니다",
        hint: "이___했습니다",
      },
      {
        type: "fill_blank",
        question: "Complete — softening ending for a suggestion (습니다체)",
        prefix: "다만 제 생각에는 이런 방법도 가능할 것",
        blank: "같습니다",
        suffix: ".",
        answer: "같습니다",
        hint: "같___니다",
      },
    ],

    peer: [
      {
        type: "fill_blank",
        question: "Complete — light acknowledgment of a colleague's view",
        prefix: "아, 그 부분 그렇게 볼 수도",
        blank: "있겠네요",
        suffix: ".",
        answer: "있겠네요",
        hint: "있___네요",
      },
      {
        type: "fill_blank",
        question: "Complete — peer-level softening ending (해요체)",
        prefix: "근데 저는 이렇게 하는 것도 괜찮을 것",
        blank: "같아요",
        suffix: ".",
        answer: "같아요",
        hint: "같___요",
      },
    ],
  },
};

export default WP_003;
