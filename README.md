# RoamPlan — Itinerary Planner

A free static travel planner for GitHub Pages. Organize a one-day trip or a multi-day journey, edit every stop, track visits, mark crowd estimates, balance famous landmarks with hidden gems, and open places or day routes in Google Maps.

## Features
- Create multiple trips with an origin, destination, date and up to 14 days.
- Optional full-day starter schedule including breakfast, travel buffers, lunch, afternoon activities, downtime and dinner.
- Add, edit, reorder and delete stops; set times, duration, notes, place type and estimated crowd level.
- Mark each stop visited and track day/trip progress.
- Open individual destinations or multi-stop daily driving directions in Google Maps. No Maps API key required.
- Share a trip via a URL fragment; import shared plans as a copy.
- Export an itinerary to JSON for backup or transfer.
- Responsive layout; no build step, account, backend, or paid hosting required.

## Deploy on GitHub Pages
This repository uses the `dev` default branch. A workflow is included at `.github/workflows/pages.yml` and runs after pushes to `dev`.

1. In repository **Settings → Pages**, choose **GitHub Actions** as the build and deployment source.
2. Open the **Actions** tab and check the “Deploy RoamPlan to GitHub Pages” workflow.
3. After a successful deployment, visit **https://yashaswipratick.github.io/Itenary-planer/**.

## Use locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` in the project root.

## Storage and privacy
Trips are saved in this browser's `localStorage`; there is no server sync. Use Share or Export to transfer a plan to another device. Anyone with a share URL can read the itinerary encoded in it, so don't include sensitive information in shared links.

Crowd levels are user-entered estimates, not live crowd data. This app does not fetch live opening hours, prices, traffic or availability. Check local information before setting off.

## License
MIT. See [LICENSE](LICENSE).

## Destination explorer

The **Explore places** link opens a separate destination library at `destinations.html`. It currently includes a Coorg/Kodagu guide grouped into practical regional circuits, with country → state → city/area selectors, place search, offbeat labels, nearby pairing suggestions, Google Maps search links, and dedicated detail pages at `place.html?id=<place-id>`.

- Destination data lives in `destinations-data.js`; the guide works as a static GitHub Pages site and requires no server or paid API key.
- Place detail pages include a locally written overview, suggested visit time, best-time guidance, practical access notes and related places.
- Where a standalone Wikipedia article is available, the detail page requests the article's introductory extract from Wikipedia and links to the full article. If no dedicated article is available or Wikipedia cannot be reached, the page clearly shows a fallback note rather than inventing a Wikipedia summary.
- Nearby pairings are curated regional suggestions, not real-time routing or distance estimates. Verify opening hours, permissions, road access, weather and safety locally.

### Coorg and Kerala-border additions

The destination catalogue also includes the Kabbe Betta View and Thadiyandamol hiking area in Kodagu, while Kalanki, Alakapuri Waterfalls, Areekamala Viewpoint and Ezharakund Waterfalls are kept in a separate **Beyond Coorg: Kerala border escapes** collection because they are in Kannur district, Kerala. Nalknad Palace is a single existing entry and is cross-linked with the nearby Kodagu hill sites. State and area filters distinguish Karnataka from Kerala; the border collection is not represented as part of Coorg itself. The suggested links are curated regional pairings, not live routing-distance calculations.


## Build an itinerary from the destination library

On the itinerary planner page, use **Choose destinations** in the Day by day section to browse the curated destination catalog without leaving the planner. Search by place name or area, filter to all places, Coorg/Karnataka, Kerala border escapes, or a specific regional group, select one or more places, choose a trip day, set a starting time and duration, and add them to the active itinerary. The planner avoids duplicate places and tries to schedule around existing stops, meal breaks and buffers. Untouched generic sightseeing placeholders are replaced when real curated destinations are added to that day.

Each selected stop retains its place ID, map search, area/state, and a brief place overview. The **Maps** and **Place guide** links open the location or detail page. Mark a stop visited using its check control; it remains in the itinerary with an **Already visited** status, and the day/trip progress counters update. Trip and visited state remain in this browser's localStorage.


### Route-aware day planning

The destination picker uses curated route circuits instead of exposing the entire Coorg/nearby-region catalogue for a single day. Each circuit lists its places in recommended visit order; the planner orders selected stops along that sequence, stores the circuit on the day, and locks the day to that circuit so separate directions aren't silently mixed. To plan a different side of Coorg, choose a different day. The route groups are manually curated from regional travel guidance, not live Google Maps traffic or an automatic route optimisation API. Check current directions from your own stay before driving.
