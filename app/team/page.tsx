import type { Metadata } from 'next';
import Image from 'next/image';
import { GPs, TEAM_FULL, VPS, VP_STATS } from '@/lib/data';
import ArrowUpRight from '@/components/ui/ArrowUpRight';
import styles from './team.module.css';

export const metadata: Metadata = {
  title: 'Team',
  description:
    "We've started, scaled, and sold companies ourselves, and we surround our founders with a deep bench of operators, advisors, and a venture partner network.",
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('');
}

export default function TeamPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <div className="eyebrow reveal">The Team</div>
          <h1 className="reveal reveal-d1">Founders backing founders.</h1>
          <p className="lede reveal reveal-d2">
            We&apos;ve started, scaled, and sold companies ourselves, and we surround our founders
            with a deep bench of operators, advisors, and a venture partner network spanning the
            markets and industries that matter to consumer.
          </p>
        </div>
      </header>

      {/* General Partners */}
      <section className="section">
        <div className="container">
          <div className="sec-eyebrow reveal">General Partners</div>
          <h2 className="sec-title reveal" style={{ marginBottom: 40 }}>
            The people behind Press On.
          </h2>

          <div className={`${styles.gpGrid} reveal`}>
            {GPs.map((gp) => (
              <div key={gp.name} className={styles.gp}>
                <div className={styles.gpPhoto}>
                  <Image
                    src={gp.headshotPath}
                    alt={gp.name}
                    fill
                    sizes="(max-width: 820px) 100vw, 50vw"
                    className={styles.gpImg}
                    priority
                  />
                </div>
                <h2 className={styles.gpName}>{gp.name}</h2>
                <div className={styles.gpRole}>{gp.role}</div>
                <p className={styles.gpBio}>{gp.bio}</p>
                <div className={styles.gpMeta}>
                  <div>
                    <div className={styles.metaLabel}>Background</div>
                    <div className={styles.chips}>
                      {gp.chips.map((ch) => (
                        <span key={ch} className={styles.chip}>{ch}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className={styles.metaLabel}>Education</div>
                    <div className={styles.chips}>
                      {gp.edu.split(' · ').map((e) => (
                        <span key={e} className={styles.chip}>{e}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <a
                  href={gp.li}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.gpLi}
                >
                  LinkedIn <ArrowUpRight className={styles.gpLiArrow} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Team */}
      <section className="section" id="fullteam" style={{ background: 'rgba(255,255,255,.02)' }}>
        <div className="container">
          <div className="sec-eyebrow reveal">The Full Team</div>
          <h2 className="sec-title reveal">Operators in every seat.</h2>

          <div className={`${styles.tmGrid} reveal`}>
            {TEAM_FULL.map((tm) => (
              <div key={tm.name} className={styles.tmCell}>
                <div className={styles.tmAvatar}>
                  {tm.headshotPath ? (
                    <Image
                      src={tm.headshotPath}
                      alt={tm.name}
                      fill
                      sizes="52px"
                      className={styles.tmAvatarImg}
                    />
                  ) : (
                    <span className={styles.tmMono}>{getInitials(tm.name)}</span>
                  )}
                </div>
                <h3 className={styles.tmName}>{tm.name}</h3>
                <div className={styles.tmRole}>{tm.role}</div>
                <div className={styles.tmPast}>
                  {tm.tags && <span className={styles.tmEdu}>{tm.tags}</span>}
                  {tm.past}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venture Partner Network */}
      <section className="section">
        <div className="container">
          <div className="sec-eyebrow reveal">Our Venture Partner Network</div>
          <h2 className="sec-title reveal" style={{ marginBottom: 40, maxWidth: '20ch' }}>
            A network that compounds for our founders.
          </h2>

          <div className={`${styles.vpStats} reveal`}>
            {VP_STATS.map((s) => (
              <div key={s.k} className={styles.vpStat}>
                <div className={`${styles.vpStatV} ${s.v.length > 10 ? styles.vpStatVSm : ''}`}>
                  {s.v}
                </div>
                <div className={styles.vpStatK}>{s.k}</div>
              </div>
            ))}
          </div>

          <p className="sec-lede reveal" style={{ marginTop: 56 }}>
            Example experts from our venture partner network:
          </p>

          <div className={`${styles.vpGrid} reveal`}>
            {VPS.map((vp) => (
              <div key={vp.name} className={styles.vp}>
                {vp.headshotPath && (
                  <div className={styles.vpAvatarWrap}>
                    <Image
                      src={vp.headshotPath}
                      alt={vp.name}
                      fill
                      sizes="48px"
                      className={styles.vpAvatarImg}
                    />
                  </div>
                )}
                <h3 className={styles.vpName}>{vp.name}</h3>
                <div className={styles.vpFocus}>{vp.focus}</div>
                <p className={styles.vpBio}>{vp.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
