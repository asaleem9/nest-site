"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { APP_STORE_URL } from "../lib/links";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ACTS = [
  {
    id: "track",
    accent: "honey",
    eyebrow: "One-handed, half-asleep",
    title: "Log anything in two taps.",
    body: "Bottles, nursing sides, diapers, pumping, growth, medicine — every tracker works live or after the fact, and every entry can be fixed later. Built for the hand that isn't holding the baby.",
    bullets: [
      "Live timers ride your lock screen and Dynamic Island",
      "Siri logs a bottle without unlocking anything",
      "History is editable — no data hostages, ever",
    ],
    video: "/media/sleepstart.mp4",
    poster: "/media/sleepstart-poster.jpg",
  },
  {
    id: "night",
    accent: "lavender",
    eyebrow: "The 3am test",
    title: "A tracker that respects the dark.",
    body: "One tap and the whole app red-shifts to a near-black, warm glow that won't wake anyone. It even turns itself on at night. Go on — keep scrolling.",
    bullets: [
      "Auto night mode from 9pm to 6am",
      "Every sheet and screen honors it",
      "Zero blue light between you and going back to sleep",
    ],
    video: "/media/night.mp4",
    poster: "/media/night-poster.jpg",
  },
  {
    id: "weeks",
    accent: "sage",
    eyebrow: "Weeks 1–52",
    title: "A development guide that tells the truth.",
    body: "Every week of the first year, written like an editor cares: CDC-anchored milestones, feeding and sleep norms, what's normal, and what's worth a call — never “your baby should.”",
    bullets: [
      "Milestone checklists you can tick off (confetti included)",
      "Adjusted age for babies born early",
      "12 illustrated chapters starring Pip",
    ],
    video: "/media/weeks.mp4",
    poster: "/media/weeks-poster.jpg",
    scenes: true,
  },
  {
    id: "patterns",
    accent: "ocean",
    eyebrow: "Numbers as context, not a report card",
    title: "Watch the rhythm arrive.",
    body: "Seven calm rows show the night knitting itself together. Weight plots against real WHO curves. And a daily note reminds you: you're doing fine.",
    bullets: [
      "Sleep rhythm, feeds, and WHO growth percentiles",
      "Free CSV and pediatrician-ready PDF export",
      "No comparisons, no scores, no guilt",
    ],
    video: "/media/patterns.mp4",
    poster: "/media/patterns-poster.jpg",
  },
];

const SINS = [
  {
    strike: "$120 a year to see last week",
    fix: "Nest is free forever. All of it. History, charts, export — everything.",
  },
  {
    strike: "Partner sync, sold separately",
    fix: "Invite a caregiver with a link. Two phones, one baby, zero passwords.",
  },
  {
    strike: "Your data, their business model",
    fix: "No ads, no accounts, no servers. Your data lives on your phone and your iCloud.",
  },
];

const FAQS = [
  {
    q: "Is it really free?",
    a: "Yes — every feature, forever. Nest has no servers to pay for: your data stays on your device and syncs through your own iCloud. There is nothing to upsell.",
  },
  {
    q: "How does sharing with a partner work?",
    a: "Send one invite link. When they open it, your baby appears in their app and every log syncs live between phones through iCloud — no account, no password.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. There is no sign-up, no login, and no way for us to see your data. Erasing the app's data is the only “logout” there is.",
  },
  {
    q: "Where does the development content come from?",
    a: "Milestones follow the CDC's 2022 “Learn the Signs. Act Early.” checklists; feeding and sleep norms come from the AAP, CDC, NHS and AASM; growth curves are the WHO standards. Written plainly, never alarmist.",
  },
  {
    q: "Where do I get it?",
    a: "It's out now — free on the App Store for iPhone (iOS 18 or later). No waitlist, no sign-up: download it and start logging tonight.",
  },
];

function AppStoreLink({ children }: { children: React.ReactNode }) {
  return (
    <a className="badge" href={APP_STORE_URL}>
      <img src="/media/app-icon.png" alt="" />
      {children}
    </a>
  );
}

export default function NestSite() {
  const root = useRef<HTMLDivElement>(null);
  const pipVideo = useRef<HTMLVideoElement>(null);
  const [pipLive, setPipLive] = useState(false);

  // Pip's hop loop ships as VP9-alpha webm + HEVC-alpha mov; Apple's decoders
  // only take the mov, everyone else prefers the webm. The static sticker
  // stays underneath for reduced-motion and anything that can't play either.
  useEffect(() => {
    const v = pipVideo.current;
    if (!v || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const apple = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
    const onReady = () => setPipLive(true);
    const onError = () => {
      if (v.currentSrc.endsWith(".mov")) {
        v.src = "/media/pip-loop.webm";
        v.play().catch(() => {});
      }
    };
    v.addEventListener("canplay", onReady, { once: true });
    v.addEventListener("error", onError);
    v.src = apple ? "/media/pip-loop.mov" : "/media/pip-loop.webm";
    v.play().catch(() => {});
    return () => {
      v.removeEventListener("canplay", onReady);
      v.removeEventListener("error", onError);
    };
  }, []);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const activate = (index: number) => {
        videoRefs.current.forEach((v, i) => {
          if (!v) return;
          if (i === index) {
            v.classList.add("on");
            v.play().catch(() => {});
          } else {
            v.classList.remove("on");
            v.pause();
          }
        });
      };

      // Night takeover follows the night act in BOTH motion modes —
      // it's information, not decoration.
      const nightAct = root.current?.querySelector('[data-act="night"]');
      if (nightAct) {
        ScrollTrigger.create({
          trigger: nightAct,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            document.documentElement.dataset.night = self.isActive ? "true" : "false";
          },
        });
      }

      // Act → phone screen wiring (all motion modes; opacity handled by CSS).
      gsap.utils.toArray<HTMLElement>(".act").forEach((act, i) => {
        ScrollTrigger.create({
          trigger: act,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => self.isActive && activate(i),
        });
      });
      activate(0);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Felt vignettes play only while on screen; the hatching clip has no
        // loop attribute, so it plays once and freezes on the reveal.
        gsap.utils.toArray<HTMLVideoElement>(".ambient-clip").forEach((v) => {
          ScrollTrigger.create({
            trigger: v,
            start: "top 85%",
            end: "bottom 15%",
            onToggle: (self) => {
              if (self.isActive) v.play().catch(() => {});
              else v.pause();
            },
          });
        });

        // Hero words rise from their clipping lines.
        gsap.from(".hero h1 .word", {
          yPercent: 135,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.06,
          delay: 0.15,
        });
        gsap.from(".hero-sub, .hero-cta", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.7,
        });
        gsap.from(".hero .phone", {
          y: 90,
          rotate: 6,
          opacity: 0,
          duration: 1.3,
          ease: "power3.out",
          delay: 0.35,
        });
        // Idle float, forever.
        gsap.to(".hero .phone", {
          y: -12,
          rotate: -1.2,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.7,
        });

        // Manifesto strikes reveal.
        ScrollTrigger.batch(".sin", {
          start: "top 82%",
          once: true,
          onEnter: (els) =>
            gsap.from(els, { opacity: 0, y: 40, duration: 0.8, ease: "power2.out", stagger: 0.12 }),
        });

        // Acts phone gets a gentle tilt as each act passes.
        gsap.utils.toArray<HTMLElement>(".act").forEach((act, i) => {
          gsap.fromTo(
            ".acts-phone-col .phone",
            { rotate: i % 2 === 0 ? -2 : 2 },
            {
              rotate: i % 2 === 0 ? 2 : -2,
              ease: "none",
              scrollTrigger: { trigger: act, start: "top bottom", end: "bottom top", scrub: 0.6 },
            }
          );
        });

        // Weeks scene fan drifts sideways on scroll.
        gsap.to(".scene-fan", {
          xPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: ".scene-fan", start: "top bottom", end: "bottom top", scrub: 1 },
        });

        // Pip slides in on scroll. The stage carries the slide so it works for
        // both layers; the scripted hops only drive the static sticker — the
        // loop video hops on its own.
        const pipTl = gsap.timeline({
          scrollTrigger: { trigger: ".pip-moment", start: "top 70%", end: "bottom 30%", scrub: 1 },
        });
        pipTl
          .fromTo(".pip-stage", { x: "-32vw", rotate: -6 }, { x: "0vw", rotate: 0, ease: "none" })
          .to(".pip-stage .pip-img", { y: -46, duration: 0.16, ease: "power2.out" }, 0.22)
          .to(".pip-stage .pip-img", { y: 0, duration: 0.2, ease: "bounce.out" }, 0.38)
          .to(".pip-stage .pip-img", { y: -30, duration: 0.14, ease: "power2.out" }, 0.62)
          .to(".pip-stage .pip-img", { y: 0, duration: 0.18, ease: "bounce.out" }, 0.76);

        // Section headers ease up as they arrive.
        ScrollTrigger.batch(".rise", {
          start: "top 85%",
          once: true,
          onEnter: (els) =>
            gsap.from(els, { opacity: 0, y: 34, duration: 0.9, ease: "power2.out", stagger: 0.08 }),
        });
      });

      return () => {
        document.documentElement.dataset.night = "false";
      };
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <div className="sky" aria-hidden />
      <div className="grain" aria-hidden />

      {/* ————— HERO ————— */}
      <header className="hero wrap">
        <div>
          <p className="eyebrow">Free forever · No ads · No accounts</p>
          <h1 className="display" style={{ marginTop: "1rem" }}>
            <span className="line">
              <span className="word">The&nbsp;</span>
              <span className="word">calmest&nbsp;</span>
            </span>
            <span className="line">
              <span className="word">baby&nbsp;</span>
              <span className="word">tracker&nbsp;</span>
            </span>
            <span className="line">
              <span className="word">ever&nbsp;</span>
              <span className="word">made.</span>
            </span>
          </h1>
          <p className="hero-sub muted">
            Feeds, sleep, diapers, milestones, milk stash, a sound machine and a
            week-by-week guide to the whole first year — designed for the 3am
            version of you, and shared with the people who help.
          </p>
          <div className="hero-cta">
            <AppStoreLink>Download on the App Store</AppStoreLink>
            <span className="free-line muted">Free · iPhone · iOS 18+</span>
          </div>
        </div>
        <div className="hero-phone-col">
          <div className="phone">
            <video
              src="/media/today-live.mp4"
              poster="/media/today-live-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-label="The Nest Today screen with live feeding and sleep timers"
            />
          </div>
        </div>
      </header>

      {/* ————— MANIFESTO ————— */}
      <section className="manifesto wrap">
        <p className="eyebrow rise">Why we built it</p>
        <h2 className="display rise" style={{ marginTop: "0.8rem" }}>
          Baby apps got greedy. Parents noticed.
        </h2>
        <div className="sins">
          {SINS.map((sin) => (
            <div className="sin card" key={sin.strike}>
              <span className="strike">{sin.strike}</span>
              <p className="muted">{sin.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ————— 3AM VIGNETTE ————— */}
      <section className="vignette">
        <video
          className="ambient-clip"
          src="/media/vignette-3am.mp4"
          poster="/media/vignette-3am-poster.jpg"
          muted
          loop
          playsInline
          preload="none"
          aria-label="Pip the owlet, drowsy but awake in his nest at 3am"
        />
        <div className="vignette-copy">
          <p className="eyebrow">The hour we designed for</p>
          <h2 className="display">3am, again.</h2>
          <p>One thumb, low light, zero patience for menus. Every choice in Nest starts there.</p>
        </div>
      </section>

      {/* ————— FEATURE ACTS ————— */}
      <section className="acts wrap">
        <div className="acts-grid">
          <div>
            {ACTS.map((act) => (
              <div className="act" key={act.id} data-act={act.id} data-accent={act.accent}>
                <div className="act-copy">
                  <p className="eyebrow">{act.eyebrow}</p>
                  <h3>{act.title}</h3>
                  <p className="muted">{act.body}</p>
                  <ul>
                    {act.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {act.scenes && (
                    <div className="scene-fan">
                      <img src="/media/scene-1.jpg" alt="Pip the owlet as a swaddled newborn" loading="lazy" />
                      <img src="/media/scene-6.jpg" alt="Pip trying first solid foods" loading="lazy" />
                      <img src="/media/scene-12.jpg" alt="Pip taking wobbly first steps" loading="lazy" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="acts-phone-col">
            <div className="phone">
              {ACTS.map((act, i) => (
                <video
                  key={act.id}
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={act.video}
                  poster={act.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={act.title}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ————— CAREGIVERS ————— */}
      <section className="caregivers wrap">
        <div className="caregivers-grid">
          <div>
            <p className="eyebrow rise">Caregivers</p>
            <h2 className="display rise" style={{ marginTop: "0.8rem" }}>
              Two phones, one baby.
            </h2>
            <p className="muted rise" style={{ marginTop: "1rem" }}>
              Invite a partner or grandparent with a link. Everyone logs,
              everyone sees the same day — no accounts, no passwords, nothing
              for them to set up.
            </p>
          </div>
          <div className="caregivers-video rise">
            <video
              className="ambient-clip"
              src="/media/owls-handoff.mp4"
              poster="/media/owls-handoff-poster.jpg"
              muted
              loop
              playsInline
              preload="none"
              aria-label="Two felt owls taking turns tending the same nest"
            />
          </div>
        </div>
      </section>

      {/* ————— PIP ————— */}
      <section className="pip-moment">
        <div className="wrap">
          <div className={`pip-stage${pipLive ? " has-video" : ""}`}>
            <img className="pip pip-img" src="/media/pip.png" alt="Pip, the Nest owlet mascot" />
            <video ref={pipVideo} className="pip-video" muted loop playsInline autoPlay preload="auto" aria-hidden />
          </div>
          <p className="eyebrow rise" style={{ marginTop: "2.5rem" }}>Meet Pip</p>
          <h2 className="display rise">Your guide through year one.</h2>
          <p className="muted rise">
            Pip narrates all 52 weeks of the development guide, delivers a
            genuinely useful tip every single day, and celebrates every
            milestone with confetti. Calm, honest, occasionally theatrical.
          </p>
        </div>
      </section>

      {/* ————— SIZZLE ————— */}
      <section className="sizzle wrap">
        <p className="eyebrow rise">Eighteen seconds of Nest</p>
        <h2 className="display rise" style={{ marginTop: "0.8rem", fontSize: "clamp(2rem, 4.6vw, 3.4rem)" }}>
          See it in motion.
        </h2>
        <div className="sizzle-frame rise">
          <video
            src="/media/nest-sizzle.mp4"
            poster="/media/sizzle-poster.jpg"
            controls
            muted
            playsInline
            preload="metadata"
            aria-label="Nest app promotional video"
          />
        </div>
      </section>

      {/* ————— PRIVACY ————— */}
      <section className="wrap">
        <div className="privacy">
          <p className="eyebrow" style={{ color: "inherit", opacity: 0.6 }}>The quiet part, out loud</p>
          <h2 className="display" style={{ marginTop: "0.8rem" }}>
            Your baby's data is nobody's business. Including ours.
          </h2>
          <div className="privacy-rows">
            <div>
              <h4>No servers</h4>
              <p>
                Nest has no backend. Data lives on your phone and syncs through
                your own iCloud — we couldn't read it if we wanted to.
              </p>
            </div>
            <div>
              <h4>No accounts</h4>
              <p>
                Nothing to sign up for, nothing to leak. Identity is your
                iCloud, invisible. Erase everything with one tap, any time.
              </p>
            </div>
            <div>
              <h4>No asterisks</h4>
              <p>
                Free means free: no trial, no locked history, no premium tier
                appearing after you've logged three months of nights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ————— FAQ ————— */}
      <section className="faq wrap">
        <h2 className="display rise">Fair questions.</h2>
        {FAQS.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p className="muted">{f.a}</p>
          </details>
        ))}
      </section>

      {/* ————— HATCHING ————— */}
      <section className="hatch wrap">
        <p className="eyebrow rise">Out now</p>
        <h2 className="display rise" style={{ marginTop: "0.8rem" }}>
          Hatched. Nest is on the App Store.
        </h2>
        <div className="hatch-video rise">
          <video
            className="ambient-clip"
            src="/media/hatching.mp4"
            poster="/media/hatching-poster.jpg"
            muted
            playsInline
            preload="none"
            aria-label="A felt egg cracks open and Pip peeks out"
          />
        </div>
        <div className="hatch-cta rise">
          <AppStoreLink>Get Nest free</AppStoreLink>
        </div>
      </section>

      <footer className="wrap">
        <div className="brand">
          <img src="/media/app-icon.png" alt="" />
          Nest
        </div>
        <p className="muted" style={{ fontSize: "0.9rem" }}>
          Educational content, not medical advice. Milestones: CDC&nbsp;
          {"“"}Learn the Signs. Act Early.{"”"} · Growth: WHO standards.
          {" · "}
          <a href="/support">Support</a>
          {" · "}
          <a href="/privacy">Privacy policy</a>
        </p>
      </footer>
    </div>
  );
}
