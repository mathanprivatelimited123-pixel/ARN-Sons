# ARN & Sons — Earth Moving Equipment Rental & Construction Materials Website

A complete, responsive, conversion-focused website for an Earth Moving Equipment Rental & Construction Materials Supply business serving **Thevur, Edappadi, and Komarapalayam**, Tamil Nadu.

Built with plain **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build step, no backend required.

---

## 1. Project Structure

```
earth-moving-website/
│
├── index.html          # All page content/sections
├── style.css            # All styling (navy + sky-blue theme)
├── script.js            # Navigation, WhatsApp links, form validation, animations
├── README.md
│
└── images/
    ├── logo.png
    ├── hero.jpg
    ├── jcb.jpg
    ├── sany-excavator.jpg
    ├── avtr-2820.jpg
    ├── tipper.jpg
    ├── tractor.jpg
    ├── psand.jpg
    ├── msand.jpg
    ├── white-psand.jpg
    ├── white-msand.jpg
    ├── black-psand.jpg
    ├── black-msand.jpg
    ├── powder.jpg
    ├── sand.jpg
    ├── jalli-3-4.jpg
    ├── jalli-1-2-half.jpg
    ├── jalli-1-2.jpg
    └── jalli-1-4.jpg
```

---

## 2. Running Locally

No build tools needed. Two options:

**Option A — just open it:**
Double-click `index.html` to open it directly in your browser.

**Option B — local server (recommended, avoids any path issues):**
```bash
cd earth-moving-website
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## 3. Replacing the Placeholder Images

Every image in `/images` is currently a **generated placeholder** (solid color with a label) so the site works out of the box. Replace each file with a real photo **using the exact same filename** and the site will update automatically:

| File | Replace with a photo of... |
|---|---|
| `logo.png` | Your company logo (square, transparent background ideal) |
| `hero.jpg` | Wide construction site photo — excavator/JCB in action |
| `jcb.jpg` | A JCB machine |
| `sany-excavator.jpg` | A SANY or HITACHI excavator |
| `avtr-2820.jpg` | The Ashok Leyland AVTR 2820 |
| `tipper.jpg` | A 6-wheel tipper truck |
| `tractor.jpg` | A tractor |
| `psand.jpg` / `msand.jpg` / etc. | Close-up photos of each sand/material type |
| `jalli-3-4.jpg` | 3/4 inch jalli (crushed stone aggregate) |
| `jalli-1-2-half.jpg` | 1½ inch jalli |
| `jalli-1-2.jpg` | 1/2 inch jalli |
| `jalli-1-4.jpg` | 1/4 inch jalli |
| `owner.jpg` | A portrait photo of the owner (4:5 ratio works best) |

Recommended sizes: hero.jpg ~1600×900px, equipment photos ~800×600px, material photos ~500×400px. Compress images (e.g. via [squoosh.app](https://squoosh.app)) before uploading for best performance.

---

## 4. Editing Content

All text lives directly in `index.html` — no CMS, no data files. Search for the section you want to change:

- **Phone/WhatsApp number** — search for `919944251427` and `99442 51427` (both appear multiple times: header, hero, big CTA, footer, floating buttons, and inside `script.js` as `WHATSAPP_NUMBER`).
- **Service areas** — search for `Thevur`, `Edappadi`, `Komarapalayam`.
- **Equipment list / materials list** — see the `#equipment` and `#materials` sections.

### To change the WhatsApp/phone number everywhere:
1. In `script.js`, update `const WHATSAPP_NUMBER = "919944251427";`
2. In `index.html`, replace all instances of `tel:+919944251427`, `919944251427`, and the display text `99442 51427`.

---

## 5. How the WhatsApp Enquiry Buttons Work

All "Enquire Now," "Get Price," and the contact form use a single reusable function in `script.js`:

```js
function sendWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/919944251427?text=${encoded}`, "_blank", "noopener");
}
```

- Equipment cards pass a `data-name="JCB"` attribute → opens WhatsApp with:
  *"Hello, I am interested in JCB. Please share availability and rental details."*
- Material cards pass a `data-name="M Sand"` attribute → opens WhatsApp with:
  *"Hello, I would like to know the price and availability of M Sand."*
- The contact form validates Name, Phone, Service, and Message client-side, then builds a formatted WhatsApp message from all fields (no server/backend involved — this is intentional, per the project brief).

---

## 6. Deployment

### GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set source to the `main` branch, root folder.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Netlify
1. Drag and drop the `earth-moving-website` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Done — no build settings needed (static site).

### Vercel
1. Run `vercel` inside the project folder (with the Vercel CLI installed), or import the repo via the Vercel dashboard.
2. Framework preset: **Other** / static — no build command needed.

---

## 7. Notes on Content Accuracy

Per the business's instructions, this site **intentionally does not include**:
- Made-up prices (all pricing uses "Contact for Price" / "Get a Quote" via WhatsApp/call)
- Fake customer reviews or testimonials
- Invented awards, certifications, or "years in business" claims
- An email address or exact street address (not provided)
- Service claims outside Thevur, Edappadi, Komarapalayam and "nearby areas depending on availability"

If any of this information becomes available, search `index.html` for the relevant section and add it directly.

---

## 8. Accessibility & Performance

- Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Single `<h1>` on the homepage, clear heading hierarchy
- Visible keyboard focus states on all interactive elements
- ARIA labels on the mobile menu button and floating action buttons
- All images have descriptive `alt` text
- Below-the-fold images use `loading="lazy"`
- No heavy JS frameworks or libraries — only Font Awesome (icons) and Google Fonts loaded from CDN
- Respects `prefers-reduced-motion`

---

## 9. Browser Support

Tested against modern evergreen browsers (Chrome, Safari, Firefox, Edge) on both desktop and mobile. Uses standard CSS Grid/Flexbox and vanilla JS `IntersectionObserver` (supported in all browsers released after 2019).
