# TransylvaniaTrivia Landing Page - Design Guidelines

## Design Approach
**Reference-Based with Gothic Entertainment Aesthetic** - Drawing inspiration from event promotion sites, gaming interfaces, and neon-noir aesthetics. The vampire/Transylvania theme demands bold, atmospheric design with modern neon accents matching the logo's purple, cyan, and orange/yellow palette.

## Core Design Principles
1. **Theatrical Drama**: Embrace gothic maximalism with sharp contrasts and bold visual hierarchy
2. **Energy & Excitement**: Neon-inspired treatments create urgency and entertainment value
3. **Information Clarity**: Despite thematic styling, rules and format must be crystal clear

## Typography System
- **Display Font**: Gothic/blackletter-style for "TransylvaniaTrivia" branding moments (Google Fonts: Creepster, Nosifer, or Eater)
- **Headings**: Bold sans-serif with sharp edges (Bebas Neue or Oswald) - all caps for section headers
- **Body Text**: Clean, readable sans-serif (Inter or Roboto) for rules, format details
- **Hierarchy**: Display (4xl-6xl) → Section Headings (3xl-4xl) → Subsections (xl-2xl) → Body (base-lg)

## Layout System
**Spacing**: Use Tailwind units of 4, 8, 12, 16, 20, 24 for consistent rhythm (p-4, gap-8, my-12, etc.)
**Container**: max-w-7xl for main content, full-width for hero and atmospheric sections

## Page Structure & Sections

### 1. Hero Section (80vh)
- **Layout**: Centered content with logo prominently displayed
- **Elements**: 
  - TransylvaniaTrivia logo (large, 300-400px width on desktop)
  - Tagline: "Quiz Night at Insomnia Restaurant"
  - Event date/time/location (if available)
  - Primary CTA button: "Join the Battle" with blur background treatment
- **Image**: Full-screen atmospheric background - dark gothic architecture, Transylvania castle silhouette, or foggy mysterious atmosphere with neon glow accents

### 2. Prizes Showcase (multi-column on desktop)
- **Layout**: 3-column grid (lg:grid-cols-3, stacks mobile)
- **Cards**: Each prize as visual card with rank badge
  - 1st Place: Champagne bottle icon + description
  - 2nd Place: Beer bucket icon + description
  - 3rd Place: Shots icon + description
- **Styling**: Elevated cards with neon border accents, trophy/medal iconography

### 3. The Rules (2-column on desktop)
- **Layout**: Grid with rule cards (md:grid-cols-2)
- **Elements**: Numbered rule cards (1-4)
  - Large number badge for each rule
  - Clear title and description
  - Icons: Phone slash, joker card, dice/wager, party popper

### 4. Quiz Format Breakdown
- **Layout**: Timeline/progression visualization
- **Structure**: 
  - Vertical flow showing Rounds 1-5 + Break + Final Gamble
  - Each round as expanded card with:
    - Round number and name
    - Question count badge
    - Description paragraph
  - Break highlighted distinctly (different treatment)
- **Spacing**: Generous vertical spacing (space-y-8 to space-y-12)

### 5. Special Mechanics (3-column on desktop)
- **Layout**: lg:grid-cols-3 feature cards
- **Cards**: 
  - "The Joker" - joker card visual, doubling mechanic
  - "The Final Gamble" - chips/wager visual, betting rules
  - "Swap & Mark" - paper/pen visual, grading system
- **Iconography**: Use Heroicons for supplementary icons (check, x-mark, arrow-path)

### 6. Event Details & CTA
- **Layout**: 2-column split (md:grid-cols-2)
- **Left**: Insomnia restaurant info, address, contact
- **Right**: Sign-up CTA, social media links
- **Footer**: Standard footer with quick links, social icons

## Component Library

**Buttons**
- Primary: Large, bold with neon glow effect treatment
- Secondary: Outlined style with hover states
- Sizes: lg (px-8 py-4), xl (px-10 py-5) for hero CTA

**Cards**
- Base padding: p-6 to p-8
- Border radius: rounded-lg to rounded-xl
- Elevation: Distinct shadows for hierarchy
- Neon accents: Border treatments on hover/focus

**Badges**
- Round badges for numbers: w-12 h-12 for rule numbers
- Pill badges for tags: px-4 py-2 for "10 Questions" counts

**Icons**
- Library: Heroicons via CDN
- Sizes: w-6 h-6 for inline, w-12 h-12 for feature cards
- Custom: <!-- CUSTOM ICON: vampire fangs, bat silhouette, joker card -->

## Images & Visual Assets

**Required Images**:
1. **Hero Background**: Dark atmospheric Transylvania castle/gothic architecture with fog - full viewport width
2. **Section Backgrounds**: Subtle texture overlays for cards (optional scattered use)
3. **Logo**: User-provided TransylvaniaTrivia logo (already attached)

**Image Treatment**: Apply subtle overlays to ensure text readability, use vignette effects on hero

## Responsive Behavior
- Mobile (base): Single column stacking, reduced font sizes, compressed spacing
- Tablet (md): 2-column grids, medium spacing
- Desktop (lg/xl): Full multi-column layouts, maximum spacing, dramatic visual treatments

## Animations
**Minimal, purposeful only**:
- Fade-in on scroll for section reveals (subtle)
- Neon glow pulse on CTA button (gentle)
- Card hover elevations
- NO complex scroll-triggered animations

## Accessibility
- Maintain 4.5:1 contrast ratios on all text
- Focus states clearly visible with outline offsets
- Alt text on all decorative and informational images
- Semantic HTML structure throughout