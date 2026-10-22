# Mediline Biotex — website redesign preview

Six-page static site for client review. No build step, no dependencies to install.

**Prepared by Insprito Ventures Pvt Ltd** · [inspirito.in](https://inspirito.in)

---


## Hero button — 22 Oct 2026

Home hero button now reads **"CFA, CSA and distributor for corporate hospitals"** (was
"Appoint us as your CFA"). Still links to the Contact page. On phones the label wraps to two
centred lines; on desktop "See what we stock" sits on the line below.

---


## Responsiveness, menu and link check — 22 Oct 2026

Tested on all six pages at 17 screen sizes: phones 320–414 px (portrait and landscape),
tablets 768–1024 px, both sides of the 940 px menu switch, and desktops up to 1920 px.

**Fixed:**
- **Desktop menu never highlighted the current page.** A scroll script left over from the
  single-page preview cleared the highlight on load and on every scroll. Now stays correct.
- **Smallest phones (320 px, e.g. iPhone SE):** the email address
  operations@medilinebiotex.com could not wrap, pushing the contact blocks on Home,
  Products and Contact ~40 px wider than the screen; the About turnover chart did the same.
  Emails now wrap after the "@", and the chart fits.
- **Turnover chart tooltips** on the outer bars ran off the edge of phone screens. They now
  open inward.
- **ISO 9001 "verify" link** pointed at QRO's homepage; it now opens their certificate
  verification page.

**Hamburger menu — verified at every phone and tablet size:** opens and closes with the
button, Escape and a tap outside; locks page scroll while open; highlights the current
page; all six links, Call and WhatsApp reachable (including phone landscape); closes
itself if the window is widened to desktop; hidden from keyboard users when closed.

**Links — 283 checked:** 160 page links, 19 in-page jumps, 36 phone, 24 email and 44
external. None broken. Certificate verification pages and the Google Maps link confirmed
live; the map pin resolves to "Mediline Biotex Pvt Ltd". In-page jumps land below the
sticky header.

⚠ **Before launch:** six gallery photos are still loaded from the old WordPress site
(medilinebiotex.com/wp-content/…). When this site replaces it on the same domain those
addresses will stop working and the gallery will fall back to stock photos. Download the
six originals into `assets/` before go-live.

---


## Update — 22 Oct 2026 (client changes)

1. **Function heads** (Vishal Vinayak, Rajesh V, Gopal Samanta): short two-sentence bios;
   the "Key responsibilities" lists are gone. Team-size badges and the 30+ summary stay.
2. **Nisha**: bio now centres on carrying & forwarding operations, CSA operations and
   corporate hospital supplies, and her role as the organisation's decision maker. The
   "biography being expanded" placeholder note is removed. Updated on Team and Home.
3. **Pramod Kumar**: the Chairman's Award (FY 2010–11 and FY 2017–18) now has its own
   highlight badge, and the bio explains it: two awards at Biocon, presented by Kiran
   Mazumdar-Shaw for stellar performance. Updated on Team and Home.
4. **Home hero** headline: "CFA, CSA and distributor for corporate hospitals." Intro line,
   page title and Google description rewritten to match; headline sized to fit three lines.

Also: the closing heading on Home and About read "Looking for a CFA partner in southern
India?" — changed to "the Southern states" per the earlier no-"South India" instruction.

---


## Update — 21 Oct 2026

### Our Team — function heads from details.docx

The team grid now shows the three function heads, each with team size and key
responsibilities taken from the document:

| Head | Function | Team |
|---|---|---|
| Vishal Vinayak | Operations · Warehouse | 20+ executives |
| Rajesh V | Commercial · Hospital & CFA business operations | 8+ |
| Gopal Samanta | Financial Accounts | 3 |

A summary band below reads **30+ executives across three functions**. Pooja R, Anuradha Rai,
Pramod Kumar S and Vishal Shet were not in the document and have been removed; any of them
can be put back in a minute if the client wants.

### Bugs and errors fixed (full-site audit)

- **Stat counters showed "0" to Google and to anyone whose JavaScript failed.** All
  counters now carry their real figure in the HTML; the count-up animation still runs on top.
- **FAQ carousel on Home** started with an empty heading until the script ran. Now pre-filled.
- **Keyboard users could not open** the contact FAQ accordion, the cold-chain bands on Home,
  gallery photos or certificate thumbnails. All are now reachable with Tab and work with
  Enter/Space; the lightbox moves focus to its close button and back again. Visible focus
  rings added.
- **Closed mobile menu** was still reachable by Tab (invisible links). Now hidden until opened.
- **Hero network animation** kept running while scrolled out of view, draining battery on
  phones. It now pauses off-screen and when the tab is in the background.
- **Ticker** was read twice by screen readers (its duplicate copy is now hidden from them).
- Phone numbers no longer break across lines; every button has an explicit type; header
  navigation labelled; lightbox image no longer requests an empty URL.
- Page titles shortened to fit Google results (were 66–88 characters, now ≤ 65).

Verified: HTML validator clean on all six pages; runtime audit (overlaps, clipping,
off-screen content, every interactive widget) 0 problems at 1440, 1024, 390 and 360 px;
no console errors.

---


## Client changes — 19 Oct 2026

| Change | Where it now appears |
|---|---|
| Company name **Mediline Biotex Pvt. Ltd.** in every section | 70 mentions across all six pages, page titles, logo alt text, footer, certificate captions |
| Sales **₹28.72 Cr** + CFA operations **₹44,99,33,603** | Home stats band (now six stats), statement band, CFA capability pane, ticker; About turnover section, capability card, principal group |
| Leadership experience **35+ years** | Home and Team stats; Director's bio now reads "more than thirty-five years" |
| Branches **2 Bangalore + 1 Mangalore** | Home, About, Team, Gallery, Contact, footer, mobile drawer, ticker; Mangalore added to the Home coverage radar as a branch |
| New head office address | Footer, mobile drawer, Home contact block, Contact page office card, map embed and Directions link |

**New on About us — "2025–26 at a glance".** A two-segment bar: ₹28.72 Cr our sales
(39%) and ₹44.99 Cr CFA operations (61%), ₹73.71 Cr moved through the warehouses in total.
The copy under it states plainly that CFA volume is the principal's sale, invoiced on
their behalf, not Mediline's turnover. Presenting the ₹73.71 Cr as "turnover" would be
wrong, and a principal reading it would notice.

**Contact page** now has three office cards: head office (full new address), Hosa Road,
and Mangalore.

### Also corrected in this pass

- **Products therapy explorer.** Every one of the nine areas listed "Supplied by" companies
  that are not on the client's principal list — Viatris, Aurobindo, JB Chemicals, Coloplast,
  3BMS and others. Those were inferences from the old website, and the October correction
  never reached them because this data is built into `app.js`. They have been live since.
  Removed. Each area now ends with "Ask which brands we carry in …", linking to the
  enquiry form. **To restore named suppliers, the client needs to send which principal
  covers which therapy area.**
- **Home coverage radar** still listed Strassenburg under Karnataka CFA (it is super
  distribution) and 3BMS under All India (not a principal). Fixed.
- **Home timeline** still read "28 principals, 8 mandates". Now 23 and 5.
- **"Audited turnover"** heading removed — nobody has confirmed the figures are audited.
  It now reads "Six years of sales, in the open."

The whole build was checked for every non-client company name and every old value
(old address, 30 years, 2 offices, Private Limited): zero remain.

---

## Group company section removed — 19 Oct 2026

Medbiotrix Pharma is removed from the whole site, not just the Home section: the Home
"Group company" band, its card on About us, the 2024 entry in both timelines, the
principals marquee chip (Medbiotrix is not on the client's principal list), and the
line in Pramod Kumar's bio naming him Executive Director there.

---

## Google Map embedded — 19 Oct 2026

The Contact page map now shows the client's own Google listing, "Mediline Biotex Pvt Ltd",
resolved from https://maps.app.goo.gl/LE33mHk7Xwc3eiEB8 to its pin at
**12.9145678, 77.6769128**. Short `maps.app.goo.gl` links cannot be placed in an iframe,
so the embed uses those coordinates. That is deliberate: a text-address embed makes Google
geocode the words and can drop the pin a street away, while coordinates put it on the
listing's own spot.

The listing link itself is used for the "Directions" button, an "Open in Google Maps"
button on the map, and the Home page head office card, so visitors land on the full
listing with its photos and reviews.

**Address** now follows the client's own format, matching the Google listing:
2nd Floor, No. 51, Sarjapur Main Road, Opp. B.K. Mathrushree Apartment, Kaikondrahalli,
Bengaluru, Karnataka 560035. "Sarjapura Road" is now "Sarjapur Main Road" throughout.

---

## ⚠ Client action needed

1. **Certificates show the old address.** Both the ISO 9001:2015 and WHO-GDP certificates
   name *26/A, Hegmel House, KPTCL Layout*. The head office has moved. The client should
   notify **QRO Certification** and **UK Certification and Assessment** of the change of
   address — a mismatch between the certified site and the operating site is the kind of
   thing a surveillance audit raises. The site no longer ties either certificate to an
   address, so nothing on the page contradicts them in the meantime.
2. **PIN code.** Confirmed as 560035 in the client's corrected address.
3. **CFA figures by principal are not published.** The total (₹44.99 Cr) is on the site.
   The per-principal split (Natco ₹26.00 Cr, Cytosorbents ₹7.78 Cr, Converge ₹6.88 Cr,
   Sayre ₹3.85 Cr, Aclaris ₹0.48 Cr) is each principal's own regional sales data, and CFA
   agreements commonly carry confidentiality terms. Natco alone is 58% of CFA volume.
   If the client confirms each principal is comfortable, it is a single added chart.
4. **CFA year.** The ₹44.99 Cr is labelled FY 2025–26, to match the ₹28.72 Cr it was sent
   alongside. Please confirm.
5. **35+ years.** Applied to the "Leadership experience" stats and to the Director's bio.
   If it describes combined leadership rather than Pramod Kumar personally, his bio
   reverts to thirty years.
6. **Hosa Road and Mangalore addresses** — still needed. Both cards say "Full address to
   be confirmed".

---

## Contents

```
index.html      Home
about.html      About us
products.html   Products
team.html       Our Team
gallery.html    Gallery
contact.html    Contact us
assets/         style.css, app.js, jquery.min.js, logos, certificate images
README.md
```

Everything goes in the repository root, keeping the `assets/` folder intact.

CSS, JavaScript and the logos are now **shared external files** rather than inlined into
each page. The six pages total about 198 KB instead of the ~1.2 MB they would have been
inlined, and a visitor downloads the stylesheet and script once for the whole site.

---

## Deploying with GitHub Desktop → Cloudflare Pages

1. Copy all six `.html` files, the `assets/` folder and this README into the repository.
2. Commit, then **Push origin**.
3. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
4. Build settings: framework preset **None**, build command empty, output directory `/`.
5. **Save and Deploy.**

Cloudflare serves `index.html` at the root, so `/` is Home and `/about`, `/products`,
`/team`, `/gallery`, `/contact` are the rest.

---

## Turnover figures added (12 Oct 2026)

The six-year turnover table is now a **Financial track record** section on About us,
with a headline figure in the Home stats band.

| Financial year | Turnover | YoY |
|---|---|---|
| 2021-22 | ₹33.30 Cr | — |
| 2022-23 | ₹12.08 Cr | −64% |
| 2023-24 | ₹24.63 Cr | +104% |
| 2024-25 | ₹22.28 Cr | −9% |
| 2025-26 | ₹28.72 Cr | +29% |
| 2026-27 (Apr–Sep) | ₹18.21 Cr | 6 months |

**Two judgement calls worth reviewing with the client.**

First, the raw numbers plotted alone show a 64% collapse in 2022-23, which reads as
losing clients. It wasn't — 2021-22 was the Remdesivir allocation year. The chart
carries that explanation directly beneath it, and the framing throughout is that the
base business has roughly **2.4×'d since the post-COVID reset**, without allocation
volumes behind it. Plotted without that note, this data would damage them.

Second, the part-year bar. Six months of 2026-27 next to five full years would read
as a decline, so it is hatched, labelled "6 months", given its own key entry, and
kept out of the YoY narrative. The hero stat reframes it as the strength it is:
**H1 alone is 63% of the whole of last year**, a run rate that closes above the
COVID peak.

Publishing turnover is the client's call — it is in their MCA filings either way, and
for a B2B distributor it answers the "are you substantial enough" question before it
is asked. But they should see the chart before it goes live.

The chart is one series in one brand hue, direct-labelled on every bar, with hover
tooltips carrying the exact rupee figure, and a **"Show the figures as a table"**
toggle for anyone who wants to copy the numbers out.

---

## Logo enlarged

Header 48px → **64px**, scrolled 40px → **52px**, footer 46px → **62px**, mobile
40px → **46px**.

Two things that needed fixing as a consequence:

- Flexbox was shrinking the logo horizontally at narrow desktop widths — same height,
  less width, a visibly distorted lockup. The aspect is now locked.
- Between 940px and 1100px the six nav links plus the phone button no longer cleared
  the bigger logo, and the nav wrapped onto **three rows**. In that band the phone
  button now steps out (the number is still in the footer, and below 940px the drawer
  carries its own Call button) and the logo eases to 56px under 1020px.

---

## Every link is live

There are no `href="#"` placeholders anywhere in the build — verified
programmatically across all six pages. Every internal link resolves to a real page
or a real in-page anchor, every `assets/` reference resolves to a file that exists,
and every external link points somewhere real.

The three social icons were the last dead links. Mediline Biotex has no Facebook,
Instagram or YouTube profile I could verify, and linking to a guessed account on a
client site is worse than having none — so the row is now the two certification
**verify** links, which are real and useful to a procurement reader. There is a
small "Social profiles coming soon" line beside them. **Send me the handles and I
will put the icons back in two minutes.**

External hosts linked: `ukascert.co.uk`, `qrocert.org`, `wa.me`, `maps.google.com`,
`images.unsplash.com`, `fonts.googleapis.com`, and the current `medilinebiotex.com`
(gallery images only — see placeholders below).

---

## Responsiveness and hamburger — tested

Six pages × six viewports = 36 combinations, all passing:

| Viewport | Chrome |
|---|---|
| 1920 × 1080 | Full nav |
| 1440 × 900 | Full nav |
| 1180 × 820 | Full nav |
| 834 × 1112 | Hamburger |
| 390 × 844 | Hamburger |
| 360 × 740 | Hamburger |

Checked on every combination: no console errors, no horizontal scroll, every scroll
reveal fires, and the correct chrome shows for the breakpoint (desktop nav hidden
below 940px, burger hidden above it).

The drawer was exercised on all 18 mobile/tablet combinations: it opens, locks page
scroll, closes on **Esc**, closes on a **scrim tap**, and releases the scroll lock
afterwards. It also closes on any menu item and auto-closes if the window is resized
back above 940px.

---

## What changed in this release

### Certifications added

The ISO 9001:2015 and WHO-GDP certificates now appear in three places: a dedicated
section on About us, a trust band on Home, and the Gallery alongside the facility
photographs. Both are clickable to a full-size scan, and both link to the issuer's
own verification page.

| | WHO-GDP | ISO 9001:2015 |
|---|---|---|
| Issuer | UK Certification and Assessment Ltd | QRO Certification LLP |
| Certificate | Q-554011102025 | 305025101181Q |
| Issued | 11 October 2025 | 11 October 2025 |
| Valid until | 10 October 2028 | 10 October 2028 |
| Accreditation | UAFL | EGAC, CAB #119005, IAF MLA |
| Verify | ukascert.co.uk/verify.aspx | qrocert.org |

This was the single biggest gap in the original site. A WHO-GDP certificate is the first
thing a pharmaceutical principal looks for when evaluating a CFA partner, and it was
nowhere on the old pages.

### Principal list corrected from the client spreadsheet

The counts I had inferred from the old website were wrong. The spreadsheet gives:

- **21** companies under supply to corporate hospitals
- **5** carrying & forwarding mandates — Natco, Converge Biotech, Sayre, Aclaris, Cytosorbents India
- **3** super distribution appointments — Surishi, Strassenburg, RA-Vish Wellness
- **23** unique companies in total

Previously the site said 28 principals and 8 CFA mandates. Both are now corrected
everywhere: counters, marquees, statement bands, CFA grid, coverage radar and the
Products page.

Several names were also wrong and are fixed: Converge Bio**tech** (not Biotex),
Zydus **Lifesciences** (not Zydus Cadila), **Kiosence** Healthcare (not KIO-Science),
Iberia **Skinbrands**, Elbrit **Lifesciences**.

Companies that appeared on the old website but are **not** in the spreadsheet have been
removed: Coloplast, JB Chemicals, Aurobindo, Viatris, Bionim, Vividus, Zee Life, Sirmaxo,
Remescan, Wellness Health, 3BMS Diagnostics, VCare Medicines. If any of these are still
live relationships, send a corrected list.

### Three new pages

**About us** — the company story, the five operations, certifications in full, the
principal list grouped by relationship type, a seven-step timeline, and facilities.

**Our Team** — leadership, six function heads, a "who to contact" desk matrix, and what
a principal can expect from the team.

**Gallery** — filterable facility photographs with a lightbox, plus both certificates.

**Contact us** — four contact routes labelled by what each is for, both offices, an
embedded map, a six-category enquiry form, and five pre-answered questions.

---

## Known placeholders — client input still needed

1. **Spreadsheet header.** The first group is labelled "COMPANY(Corporate Hospitals)"
   but every entry is a pharmaceutical company, not a hospital. I have read it as
   *companies whose products we supply into corporate hospitals*. Please confirm.
2. **Hosa Road and Mangalore addresses** — only the locality is known. Both Contact cards say so openly.
3. **Drug licence number, CIN and GST** — still placeholders in the compliance accordion.
4. **Mrs. Nisha** — surname and fuller biography. Noted on the Team page.
5. **Pooja R and Anuradha Rai** — roles are described from function, not a stated job
   title. Noted on the page.
6. **Figures to confirm** — the 99.4% excursion-free rate, the 24-hour response time,
   depth-of-stock percentages on Products, and timeline years before 2025.
7. **Gallery images** are still hotlinked from the current live site, with Unsplash
   fallbacks. Download them into `assets/` before the old site is switched off — and a
   real photo shoot would serve this site better than any of them.
8. **Product brand and SKU names** are deliberately absent. Only Remdesivir is named,
   because it is documented. Any brand list must come from the client.

---

## Technical notes

**Progressive enhancement.** Every content section starts hidden and is revealed by the
scroll scanner, so a JavaScript failure would otherwise blank the page. The hiding is
gated behind an `html.fx` class added only once jQuery is confirmed and `app.js` has
parsed, and removed again if anything throws. jQuery is self-hosted. Verified: with the
script removed, zero elements stay hidden and no errors are thrown.

**One interaction layer, six pages.** The Products modules (therapy explorer, storage
matrix, ordering steps, enquiry picker) are appended to the shared script as page-specific
blocks rather than a second copy of the whole thing — a naive merge double-binds the
accordion and cancels the burger menu out.

**Parallax and sticky.** The clipping for parallax bands lives on an inner `.px-frame`,
never on the section itself: `overflow:hidden` on an ancestor silently kills
`position:sticky` on the pinned chain-of-custody section.

**Tested** in headless Chromium at 1440px and 390px across all six pages: no console
errors, no horizontal scroll, every reveal fires, and the drawer opens, locks scroll and
closes from the scrim on all six.

---

## Notes for the Astro migration

Google Sheets tabs: `principals_supply` · `principals_cfa` · `principals_super` ·
`clients` · `therapies` · `custody_steps` · `capabilities` · `leadership` · `team` ·
`certifications` · `compliance` · `gallery` · `storage_matrix` · `formats` ·
`order_steps` · `product_faq` · `contact_faq` · `timeline` · `statement_bands` · `offices`

Everything else — headings, intros, CTA labels — sits in a flat `content` key/value tab.
