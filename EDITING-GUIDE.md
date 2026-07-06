# Editing Guide - Sivaprasad NN website

Written for the team. You do not need to be a developer. If you can edit a Word document carefully, you can edit this site. The golden rule: **change the words between the quotes, and never delete a comma, quote mark or bracket.**

Use any plain text editor. Free and good: **VS Code** (code.visualstudio.com).

---

## 1. Change a video (add / remove / reorder)

Open **`js/data.js`**. Find the `videos:` list. Each line looks like:

```js
{ id:"sGiWZ5aq0fU", title:"Carnatic Vocal Recital", group:"carnatic" },
```

- **`id`** = the code in a YouTube link. For `https://www.youtube.com/watch?v=sGiWZ5aq0fU`, the id is `sGiWZ5aq0fU`.
- **`title`** = the caption shown under the video.
- **`group`** = where it appears on the Music page. Use exactly one of: `carnatic`, `dance`, or `fusion`.

To **add** a video, copy a whole line, paste it below, and change the `id` and `title`. Keep the comma at the end.
To **remove** one, delete its whole line.

---

## 2. Change contact details, WhatsApp or social links

Open **`js/data.js`**, find `contact:` at the top. Change what is between the quotes:

```js
phone:    "+91 98201 26711",
phoneRaw: "919820126711",       // digits only - used for the WhatsApp button
email:    "sivaprasadnn@gmail.com",
instagram:"https://www.instagram.com/…",   // paste the exact profile link
facebook: "https://www.facebook.com/…",
youtube:  "https://www.youtube.com/…",
```

Leave a link as `""` (empty) to hide that social icon.

**To make the enquiry form send to a different inbox:** open `contact.html`, find `formsubmit.co/sivaprasadnn@gmail.com`, and change the email. (The first time a form is submitted, FormSubmit sends a one-time confirmation email to that address. Click the link in it once, and the form works forever after.)

---

## 3. Add or change an award

Open **`js/data.js`**, find the `awards:` list. Each line:

```js
{ yr:"2017", ti:"Award name · Awarding body, City" },
```

Copy a line, paste it in the right place (newest at the top), change the year and text. Use `·` or a comma as the separator, **never the long dash.**

---

## 4. Change a press quote

Open **`js/data.js`**, find `quotes:`. Each line:

```js
{ q:"The quote text.", by:"Publication name" },
```

---

## 5. Change wording on a page (headings, paragraphs)

Open the page's `.html` file (for example `about.html`). The text you see on the site sits between tags like `<p> … </p>` or `<h2> … </h2>`. Change only the words, not the tags.

Example:
```html
<h2 class="display">Three continents, one voice.</h2>
<p>He has performed on All India Radio and Doordarshan …</p>
```

---

## 6. Swap a photo

**Easiest way (no code):** go into the folder and replace the file with a new one **using the same filename**.

- Big banner images live in `assets/photos/hero/` (e.g. `hero-home.jpg`).
- Portraits live in `assets/photos/portrait/`.
- The Performances grid is `assets/photos/gallery/perf-01.jpg` … `perf-42.jpg`.
- The press wall is `assets/press/clip-01.jpg` … `clip-18.jpg`.

Keep new photos a sensible size (long edge around 1600px, saved as JPG) so the site stays fast.

**To add MORE gallery photos:** drop `perf-43.jpg`, `perf-44.jpg` etc. into `assets/photos/gallery/`, then open `js/data.js` and raise `galleryCount` to the new total. Same idea for press (`pressCount`).

---

## 7. Change a menu item (the top navigation)

Open **`js/components.js`**. Near the top is the `nav` list:

```js
var nav = [
  ["Home","index.html","home"],
  ["About","about.html","about"],
  …
];
```

Each row is `["Label shown", "file it links to", "id"]`. Rename a label by changing the first item. You change this **once** and it updates on every page.

---

## 8. Change colours or fonts

Open **`css/style.css`**. The colours are all named at the very top under `:root`:

```css
--maroon:#8C2A1C;   /* the main accent colour */
--ivory:#FBF7EF;    /* page background */
--gold:#B4884A;
```

Change a hex code and it updates everywhere. Fonts are set just below (`--head`, `--body`, `--serif`).

---

## Before you publish - quick check

- [ ] No long dashes in anything a visitor reads.
- [ ] If you added a price, it says `Rs.` and not the rupee symbol.
- [ ] No specific dates/years or foreign city names added to Performances or Press (visa-safe).
- [ ] You did not delete any `"`, `,`, `{`, `}` or `<tag>`.
- [ ] Open the file in a browser (double-click it) and it looks right.

Then follow **`DEPLOY-GUIDE.md`** to push it live.
