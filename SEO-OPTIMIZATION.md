# What I Changed for SEO

This document explains the SEO work I did on The Qlip website in simple terms.

## The big problem I fixed

The website is a "single-page app." That means the web page you see in a browser
is built by computer code running *inside* your browser. When Google or Bing come
to read your pages, the parts of the page that are built by that code were empty —
so search engines saw a mostly blank page and had very little idea what the site
is about.

**The fix:** I now build real, complete web pages (with all the text filled in)
at the same time the site is prepared for launch. Search engines can now read
every page from top to bottom, just like a visitor's browser does.

## What I did, section by section

### 1. Every page now has its own "ID card" for search engines

Each page (Home, About, Work, Insights, and all 6 services) now has:
- A **page title** that describes what the page is for (e.g. "Software Engineering
  Services — System Architecture & APIs | The Qlip").
- A **short description** that search engines show under the link in results.
- A **canonical link**, which tells Google "this is the official address of this
  page" so it doesn't get confused by duplicate copies.

### 2. Mobile/Government/preview platforms are covered

- **Open Graph tags** — the "preview card" (title + picture) you see when someone
  shares a page on WhatsApp, LinkedIn, or Facebook.
- **Twitter card tags** — the same for X/Twitter.

### 3. Extra "maps" for Google (structured data)

I added hidden code that helps Google understand the site better:
- Who The Qlip is (an "Organization" with the company's email, phone, and social links).
- That articles are articles (with title, date, and author).
- A breadcrumb trail ("Home > Insights > Article title").
- Each service is now labelled as a "Service" Google can understand.

### 4. A blueprint of the whole site (sitemap) and a door policy (robots)

- **sitemap.xml** — a list of every page on the site, so Google can find them
  all easily and know when they were last changed.
- **robots.txt** — tells search engines which parts of the site they may look at.
  Both are generated automatically every time I build the site.

### 5. Better handling of "Page Not Found" (404)

If someone types a web address that doesn't exist, they now get a proper "Page
Not Found" page instead of a blank screen. This also helps visitors who arrive on
deep links (like a shared article) even without a trailing slash.

### 6. Friendlier pages for readers *and* search engines

- Article preview images now load lazily (only when scrolled into view), which
  makes pages faster.
- Image descriptions (alt text) were improved so search engines know what the
  pictures show, and so visitors using screen readers get meaningful text.
- Share buttons on articles were turned into proper links.

### 7. Faster loading (which search engines reward)

- The heavy libraries (3D graphics, animations, markdown) are now separated into
  their own files, so visitors who already have them don't re-download them.
- Previously unused leftover code was left in place (not in this pass).

## One important thing YOU need to do

The site's real web address (domain) is currently set to a placeholder:
`https://theqlip.com`.

Inside the `.env` file there is a line:

```env
VITE_SITE_URL=https://theqlip.com