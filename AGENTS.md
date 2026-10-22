<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared marketplace presentation in `src/components/marketplace.tsx` so homepage, catalog, and product pages remain visually consistent.
- Keep the imported HERBIX collection on `/herbix` with scoped presentation and separate display data; it must not replace the marketplace or create disconnected checkout/subscription flows.
