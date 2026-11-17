# Flicks on noon: concept demo

A clickable concept of Flam Flicks (interactive video ads) placed inside the noon app: the noon marketplace, supermall, noon Food, noon Minutes and NowNow.

Open `index.html` in Chrome or Safari, or host the single file anywhere static (GitHub Pages, Vercel). On a laptop it shows a phone frame with the list of placements beside it; on a phone it fills the screen and the "Ad placements" button opens the list.

## Placements (20)

- noon: Display Ad in the home carousel (Bose), Product Ad in Bestsellers (Sony), Brand Ad shelf (LEGO), Brand Ad at top of search (Bose, Sony), Product Ad inside results (Nike), category banners (LEGO, Levi's, also Bose, Sony, Nike, General Mills on their categories), product page media (Bose), app-open interstitial (Acer)
- supermall: Featured this week (Nike), Product Ad in a brand row (Levi's)
- noon Food: In the spotlight (Little Caesars), featured video (Burger King), restaurant page (Burger King)
- noon Minutes: banner carousel (General Mills), sponsored shelf (Doritos), Product Ad in a category row (Ben & Jerry's)
- NowNow: Pet Care department ad (BARK), car rentals takeover (Mercedes-Benz)

## How it behaves

- Every Flick is the live Flam ad tag, unchanged, in its own frame. All tags are in the `BRANDS` block at the top of the script.
- Picking an option inside a Flick updates the product name, price, dots, thumbnails and the page its button opens. Host chips and product tiles switch the Flick back.
- Sound: a Flick can only be heard while at least half of it is on screen. Scrolling it away, swiping a carousel, opening a sheet, switching the browser tab or leaving the screen silences it; leaving a screen removes its Flicks.
- A Flick that fails to load says so and offers Retry.

## Honesty notes

Concept demo built by Flam for partner conversations. Not affiliated with or endorsed by noon or the brands shown.

- The app content around the ads (vertical tabs, banners, category tiles, product photos, restaurant photos, offers) is cut from a screen recording of the noon UAE app made on 17 Nov 2026 and embedded in the file. Names, prices and offers are as shown that day. Those banners and photos belong to noon and the brands in them.
- The Flick products (Bose, Sony, LEGO, Nike, Levi's, Acer, General Mills, Doritos, Ben & Jerry's) have no still photo: the Flick is their picture. Their AED prices are illustrative.
- The Burger King and Little Caesars menus are illustrative. Burger King, Little Caesars and BARK options are shown as "1 of 3" because their option names were not available.

## Editing

`index.html` is the built page and is all that needs hosting. It is put together from `source/src/` (styles, images, data, app code, page shell) by `source/build.py`, which writes `source/index.html`; copy that over the top-level `index.html` after a change.
