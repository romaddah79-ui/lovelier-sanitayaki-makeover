# Sanitayaki marketplace redesign

## Scope
- Replace the blank page with an original, category-led Sanitayaki marketplace experience.
- Build responsive homepage, shop catalog, and product-detail screens using reusable storefront components.
- Keep product content display-only and structured for a later WooCommerce connection; no fake checkout, orders, customers, payments, or data changes.

## Experience
- Shared sticky header with Sanitayaki identity, prominent search, account, wishlist, cart, and category navigation.
- Homepage with wide promotional banner, visual categories, promoted products, Bee Venom Cream and Scorpion Cream feature, best sellers, special offers, recommendations, services, and marketplace availability.
- Shop page with breadcrumbs, search, sorting, desktop filters, mobile filter drawer, product grid, and pagination controls.
- Product page with gallery, pricing area prepared for live data, quantity controls, add-to-cart/buy controls, delivery details, description/specifications/reviews tabs, related products, and recently viewed products.
- Mobile-first refinements: sticky search, compact cards, horizontal category/product rails, filter controls, and bottom navigation.

## Visual system
- Apply the selected frosted-glass composition using Sanitayaki red `#C8102E`, dark red `#7A0B1F`, white, dark text, and cool gray surfaces.
- Use Sora headings and Manrope body text, restrained motion, subtle borders/shadows, and card radii no larger than 8px.
- Generate original marketplace/product imagery; do not reuse the Ishtari screenshot or proprietary assets.

## Technical details
- Centralize catalog-shaped sample presentation data and reusable components so WooCommerce responses can replace it later.
- Use typed TanStack routes for `/`, `/magazin`, and `/produs/$slug`, with unique metadata for every page.
- Keep interactions local to the interface: search, filters, sorting, wishlist toggles, quantity controls, tabs, image selection, carousels, and pagination.
- Validate the final experience in desktop and mobile browser sizes and fix any visual, runtime, or build errors.
