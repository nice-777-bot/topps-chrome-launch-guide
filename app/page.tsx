import type { ReactNode } from "react";
import data from "@/data/launch-data.json";
import Countdown from "./countdown";

function Window({ id, title, children }: Readonly<{
  id: string;
  title: string;
  children: ReactNode;
}>) {
  return (
    <section className="window" aria-labelledby={`${id}-title`} id={id}>
      <div className="title-bar">
        <div className="title-bar-row">
          <div className="title-bar-controls is-left" aria-hidden="true">
            <span className="title-box close-box" />
          </div>
          <div className="title-bar-text"><h2 id={`${id}-title`}>{title}</h2></div>
          <div className="title-bar-controls is-right" aria-hidden="true">
            <span className="title-box zoom-box" />
            <span className="title-box collapse-box" />
          </div>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </section>
  );
}

function StatusBadge({ status }: Readonly<{ status: string }>) {
  const label = status === "live" ? "LIVE" : status === "closed" ? "CLOSED" : "AT LAUNCH";
  return (
    <span className={`landing-badge${status === "live" ? " is-live" : status === "closed" ? " is-closed" : ""}`}>
      {label}
    </span>
  );
}

export default function Home() {
  // Abbreviate the frozen display date without reinterpreting its weekday or timezone.
  const [, releaseDay, , releaseTime] = data.release.datetimeHuman.split(", ");
  const shortDay = releaseDay.replace(/^(\w{3})\w*/, "$1");
  const verifiedDate = data.unofficialDisclaimer.match(/checked (.+)\.$/)?.[1]
    .replace(/^(\w{3})\w*/, "$1");
  const landingPage = data.links[0];

  return (
    <>
      <header className="landing-menubar launch-menubar">
        <span className="brand-name">Chrome Launch Guide</span>
        <time dateTime={data.release.datetimeISO}>{`${shortDay} — ${releaseTime}`}</time>
      </header>

      <main className="landing-stage">
        <section className="landing-hero" aria-labelledby="guide-title">
          <p className="eyebrow">{data.product.toUpperCase()}</p>
          <h1 id="guide-title">Your launch-day field guide.</h1>
          <p className="hero-summary">{data.release.summary}</p>
          <div className="release-details">
            <time dateTime={data.release.datetimeISO}>{data.release.datetimeHuman}</time>
            <p>{data.release.timezoneNote}</p>
          </div>
        </section>

        <Window id="countdown" title="Countdown">
          <Countdown datetimeISO={data.release.datetimeISO} />
          <div className="launch-action">
            <p>The clock is doing its part.</p>
            <a className="button primary" href={landingPage.url} target="_blank" rel="noopener noreferrer">Open launch page</a>
          </div>
        </Window>

        <Window id="boxes" title="The Four Boxes">
          <ul className="landing-programs box-grid">
            {data.boxes.map((box) => (
              <li key={box.name}>
                <h3>{box.name}</h3>
                <div className="box-price">{box.price}</div>
                <div className="channel-line">
                  <span>{box.channel}</span><StatusBadge status={box.status} />
                </div>
                <p>{box.channelNote}</p>
                <a className="url-link" href={box.url} target="_blank" rel="noopener noreferrer">{box.url}</a>
              </li>
            ))}
          </ul>
        </Window>

        <Window id="prep" title={`Before ${releaseTime.replace(" ET", "")}`}>
          <ol className="prep-list" role="list">
            {data.prep.map((step, index) => (
              <li key={step}>
                <span className="tour-num" aria-hidden="true">{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </Window>

        <Window id="sale-time" title={`At ${releaseTime}`}>
          <p className="draw-definition">A draw is a lottery, not a queue.</p>
          <div className="sale-panels">
            {Object.entries(data.saleTime).map(([key, sale]) => (
              <section className="wizard-sheet sale-panel" key={key} aria-labelledby={`${key}-title`}>
                <h3 id={`${key}-title`}>{sale.title}</h3>
                <ol className="sale-steps">
                  {sale.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </section>
            ))}
          </div>
        </Window>

        <Window id="after" title="After you submit">
          <ul className="after-list">
            {data.after.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Window>

        <Window id="links" title="All the links">
          <div className="file-list">
            <div className="file-list-heading" aria-hidden="true">Name / address <span>Status</span></div>
            <ul>
              {data.links.map((link) => (
                <li className="file-row" key={link.url}>
                  <span className="file-icon" aria-hidden="true" />
                  <div className="file-details">
                    <div className="file-title">
                      <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                      <StatusBadge status={link.status} />
                    </div>
                    <p className="file-note">{link.note}</p>
                    <a className="url-link" href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Window>

        <Window id="checklist" title="The checklist">
          <p className="chases">{data.chases}</p>
        </Window>

        <footer className="status-bar launch-footer">
          <p>{data.unofficialDisclaimer}</p>
          {verifiedDate && <span className="verified-badge">{`Verified ${verifiedDate}`}</span>}
        </footer>
      </main>
    </>
  );
}
