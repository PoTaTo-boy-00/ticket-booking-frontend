'use client';

import LoginButton from "@/components/Auth/LoginButton";
import { useUser } from "@/hooks/auth/useUserCreds";
import Link from "next/link";
import style from "./page.module.css";
const techStack = [
  "Next.js", "Express", "TypeScript", "Prisma",
  "PostgreSQL", "Redis", "BullMQ", "Socket.IO","OAuth"
];

// tripled for seamless infinite loop
const carouselItems = [...techStack, ...techStack, ...techStack];

export default function Home() {
  const { data: session } = useUser();

  return (
    <>
    
      <div className={style.page}>

        {/* HERO */}
        <section className={style.hero}>
          <div className={style["hero-eyebrow"]}>
            <span className={style["hero-eyebrow-dot"]} />
            Real-time ticket booking
          </div>
          <h1 className={style["hero-heading"]}>
            Seats claimed in<br />
            <em>real time</em>.
          </h1>
          <p className={style["hero-sub"]}>
            A booking system that handles concurrency honestly — live seat maps,
            collision-safe holds, and self-expiring reservations.
          </p>
          <div className={style["hero-actions"]}>
            {session ? (
              <Link href="/event/dec542cd-1afa-42b1-a143-f6fd8cfb4352" className={style["btn-primary"]}>
                Book tickets →
              </Link>
            ) : (
              <LoginButton  />
            )}
            <a href="#features" className={style["btn-ghost"]}>See how it works</a>
          </div>
        </section>

        {/* STATS */}
        <div className={style.stats}>
          <div className={style.stat}>
            <div className={style["stat-num"]}>15 sec</div>
            <div className={style["stat-label"]}>Reservation window</div>
          </div>
          <div className={style.stat}>
            <div className={style["stat-num"]}>&lt; 50 ms</div>
            <div className={style["stat-label"]}>Avg. seat sync latency</div>
          </div>
          <div className={style.stat}>
            <div className={style["stat-num"]}>0</div>
            <div className={style["stat-label"]}>Double bookings</div>
          </div>
        </div>

        {/* INFINITE CAROUSEL */}
        <div className={style["carousel-section"]}>
          <p className={style["carousel-label"]}>Built with</p>
          <div className={style["carousel-viewport"]}>
            <div className={style["carousel-track"]}>
              {carouselItems.map((tech, i) => {
                const mod = i % 3;
                const cls =
                  mod === 0 ? 'carousel-pill carousel-pill-outline' :
                  mod === 1 ? 'carousel-pill carousel-pill-filled' :
                              'carousel-pill carousel-pill-solid';
                return <span className={cls} key={i}>{tech}</span>;
              })}
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <section className={style["features-section"]} id="features">
          <p className={style["features-kicker"]}>How it works</p>
          <h2 className={style["features-title"]}>Three hard problems,<br />solved properly.</h2>

          <div className={style["features-list"]}>
            {[
              {
                idx: '01',
                tag: 'Socket.IO',
                sub: 'Live sync',
                name: 'Seat map updates instantly',
                body: 'Every hold, release, and confirmed booking broadcasts to all connected clients the moment it happens. No polling interval, no stale reads — the map is always current.',
              },
              {
                idx: '02',
                tag: 'Optimistic locking',
                sub: 'Concurrency',
                name: 'Double bookings are impossible',
                body: 'A version field on every seat row means two simultaneous requests cannot both succeed. The second writer sees a conflict at the database layer before a ticket is ever issued.',
              },
              {
                idx: '03',
                tag: 'BullMQ · Redis',
                sub: 'Expiry',
                name: 'Abandoned holds release themselves',
                body: 'A background job counts down from 15 minutes the moment a seat is held. If payment never completes, the seat silently returns to inventory — no cron, no manual cleanup.',
              },
            ].map((f) => (
              <div className={style["feature-row"]} key={f.idx}>
                <span className={style["feature-index"]}>{f.idx}</span>
                <div className={style["feature-name"]}>
                  <span className={style["feature-name-sub"]}>{f.sub}</span>
                  {f.name}
                </div>
                <div className={style["feature-body"]}>
                  {f.body}
                  <span className={style["feature-tag"]}>{f.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER CTA */}
        <div className={style["footer-cta"]}>
          <div className={style["footer-cta-inner"]}>
            <p className={style["footer-cta-text"]}>
              Ready to see a seat get<br />
              <em>claimed live?</em>
            </p>
            {session ? (
              <Link href="/event/dec542cd-1afa-42b1-a143-f6fd8cfb4352" className={style["btn-light"]}>
                Open the event →
              </Link>
            ) : (
              <a className={style["btn-light"]} href="#">Sign in to start</a>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <footer className={style["footer"]}>
          <span>Real-time ticketing</span>
          <span>Next.js · Socket.IO · BullMQ</span>
        </footer>
      </div>

<style>
  {`
  .carousel-pill {
          flex-shrink: 0;
          padding: 10px 26px;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
          cursor: default;
          user-select: none;
        }
        .carousel-pill-outline {
          border: 1px solid #DDD6FE;
          color: #5B21B6;
          background: #fff;
        }
        .carousel-pill-filled {
          background: #EDE9FE;
          border: 1px solid #C4B5FD;
          color: #6D28D9;
        }
        .carousel-pill-solid {
          background: #7C3AED;
          color: #fff;
          border: 1px solid #7C3AED;
        }
  `}
</style>

      
    </>
  );
}