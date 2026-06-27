Once the main page loads, the following error shows up in the console:

## Error Type

Console Error

## Error Message

A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

...
<HotReload globalError={[...]} webSocket={WebSocket} staticIndicatorState={{pathname:null, ...}}>
<AppDevOverlayErrorBoundary globalError={[...]}>
<ReplaySsrOnlyErrors>
<DevRootHTTPAccessFallbackBoundary>
<HTTPAccessFallbackBoundary notFound={<NotAllowedRootHTTPFallbackError>}>
<HTTPAccessFallbackErrorBoundary pathname="/editor" notFound={<NotAllowedRootHTTPFallbackError>} ...>
<RedirectBoundary>
<RedirectErrorBoundary router={{...}}>

<Head>
<**next_root_layout_boundary**>
<SegmentViewNode type="layout" pagePath="/apps/ghos...">
<SegmentTrieNode>
<link>
<script>
<script>
<script>
<RootLayout>
<html lang="en" className="dark geist...">
<body
className="antialiased"

-                           cz-shortcut-listen="true"
                          >
                  ...

  at body (<anonymous>:null:null)
  at RootLayout (src/app/layout.tsx:32:7)

## Code Frame

30 | className={`dark ${geistSans.variable} ${geistMono.variable}`}
31 | >

> 32 | <body className="antialiased">

     |       ^

33 | <ClerkProvider
34 | appearance={{
35 | theme: dark,

Next.js version: 16.1.7 (Turbopack)
