# Stage 4 — Create Post Page

Route: `/create`

---

## Page Header

- Title: "Create Post"
- Subtitle: "Compose and schedule content across all platforms"

---

## Layout

Two-column layout:
- **Left panel** (~70% width): Post Content + Media
- **Right panel** (~30% width): Post To + Schedule + Action Buttons

---

## Left Panel — Post Content

### Post Content Section
- Section title: "Post Content"
- Large `Textarea`: placeholder "What's on your mind? Write your post here..."
- Below textarea, two items on the same row:
  - Left: character counter "0 characters" (updates as user types)
  - Right: character limit badges per selected platform — "280 (Twitter)" · "2,200 (Instagram)"

### Media Section (below Post Content)
- Section title: "Media"
- Drag-and-drop zone:
  - Camera/image icon (centered)
  - Primary text: "Drag and drop images or videos here"
  - Secondary text: "or click to browse (0 files selected)"
- "+ Add Media" button at the bottom of the zone (full width, outlined)

---

## Right Panel — Post To

- Section title: "Post To"
- List of platforms as selectable rows:
  - Each row: `Checkbox` + platform icon + platform name
  - Connected accounts: checkbox is active/checkable, selected rows have a highlighted background
  - Disconnected accounts: checkbox is disabled, row shows "Connect →" link on the right
- Platforms shown: Twitter, Instagram, LinkedIn, Facebook
- Data source: `mockSocialAccounts` from `src/lib/mock-data.ts`

---

## Right Panel — Schedule

- Section title: "Schedule"
- Date `Input`: placeholder "mm/dd/yyyy" (use ShadCN `Popover` + `Calendar` for date picker)
- Time `Input`: placeholder "--:-- --"
- Below inputs: "Use optimal posting times" hint (pin icon + muted link text)

---

## Action Buttons (bottom of right panel, stacked full width)

1. "Schedule Post" — primary filled button (blue/indigo, full width)
2. "Publish Now" — outlined secondary button (full width)
3. "Save Draft" — ghost/text button (full width)

---

## Files to Create

- `src/app/create/page.tsx`
- `src/components/create-post/PostContentEditor.tsx`
- `src/components/create-post/MediaUpload.tsx`
- `src/components/create-post/PlatformSelector.tsx`
- `src/components/create-post/SchedulePicker.tsx`
