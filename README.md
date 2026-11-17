# Flicks on noon: concept demo

A clickable concept of Flam Flicks (interactive video ads) placed inside the noon app: the noon marketplace, supermall, noon Food, noon Minutes and NowNow.

Open `index.html` in Chrome or Safari, or host the single file anywhere static (GitHub Pages, Vercel). On a laptop it shows a phone frame with the list of placements beside it; on a phone it fills the screen and the "Ad placements" button opens the list.

## Placements

The on-page list groups them by slot type (swipeable banners, Product Ads in rows, Brand Ad shelves, shoppable video, search, category and product pages, display cards in the feed, full screen), 26 entries, with no brand names. By vertical:

- noon: home carousel with three Flicks between the static banners, the first banner being a Flick (Bose, Gap, Patagonia); Product Ads in Bestsellers (Sony) and Grocery must haves (General Mills); a display card between offer cards (Cross); a Watch and shop video row (Zara, Acer, M&M's); Brand Ad shelf (LEGO); Brand Ads at top of search (Bose, Sony); Product Ad inside results (Nike); category banners (LEGO, Levi's and others); product page media; app-open interstitial (Acer)
- supermall: featured banners (Nike, Gap), Product Ads in rows (Levi's, Bose), Brand Ad shelf (Sony)
- noon Food: In the spotlight (Little Caesars, Burger King), featured videos (Burger King, Little Caesars), an ad inside the restaurant list (Ben & Jerry's), restaurant page (Burger King)
- noon Minutes: banner carousel with three Flicks (General Mills, Doritos, Ben & Jerry's), Product Ads in rows (General Mills, Ben & Jerry's), sponsored shelf (Doritos), display card (M&M's)
- NowNow: Pet Care (BARK), rent a car ads (Cadillac, Bentley), Lifestyle gifts (Cross), car rentals takeover (Mercedes-Benz)

At most four Flick players are kept running at once (those nearest the screen); others load as they come into view.

## Watch and shop

The Watch and shop row on the noon home page opens a page of shoppable videos (`#/watch`). Add To Cart takes the option showing in the video; the bar at the bottom keeps the running count and total, and the cart is shared with every other screen.

## How it behaves

- Every Flick is the live Flam ad tag, unchanged, in its own frame. All tags are in the `BRANDS` block at the top of the script.
- Picking an option inside a Flick updates the product name, price, dots, thumbnails and the page its button opens. Host chips and product tiles switch the Flick back.
- Sound: a Flick can only be heard while at least half of it is on screen. Scrolling it away, swiping a carousel, opening a sheet, switching the browser tab or leaving the screen silences it; leaving a screen removes its Flicks.
- A Flick that fails to load says so and offers Retry.

## Honesty notes

Concept demo built by Flam for partner conversations. Not affiliated with or endorsed by noon or the brands shown.

- The app content around the ads (vertical tabs, banners, category tiles, product photos, restaurant photos, offers) is cut from a screen recording of the noon UAE app made on 17 Nov 2026 and embedded in the file. Names, prices and offers are as shown that day. Those banners and photos belong to noon and the brands in them.
- The Flick products (Bose, Sony, LEGO, Nike, Levi's, Gap, Patagonia, Zara, Acer, General Mills, Doritos, Ben & Jerry's) have no still photo: the Flick is their picture. Their AED prices are illustrative, set at about what each item sells for in the UAE. Car rental day rates are illustrative too.
- The Burger King and Little Caesars menus are illustrative. Burger King, Little Caesars, BARK, M&M's and Cross options are shown as "1 of 3" because their option names were not available.

## Editing

`index.html` is the built page and is all that needs hosting. It is put together from `source/src/` (styles, images, data, app code, page shell) by `source/build.py`, which writes `source/index.html`; copy that over the top-level `index.html` after a change.
