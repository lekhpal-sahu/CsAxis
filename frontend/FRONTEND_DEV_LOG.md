# CS Axis - Frontend Development Log

This document acts as a repository of knowledge detailing the primary issues encountered and the logic used in building the frontend of the **CS Axis** learning platform.

## 1. Multi-Page Navigation and Routing
**Issue:** We needed a way to elegantly serve multiple modules (Home, Roadmaps, Auth) without resorting to complex single-file conditionals while maintaining a snappy Single Page Application (SPA) feel.
**Logic:** Integrated `react-router-dom` to implement robust client-side routing.
- The top-level `App.jsx` holds routing rules.
- Parameterized URLs (`/roadmap/:topic`) were constructed to serve dynamic content based on the categorized sections accessed from the navbar. 

## 2. Dynamic Search Bar with Dropdown
**Issue:** As the application resource pool is dynamic, retrieving query results had to feel instant and visually appealing directly from the top navigation pane.
**Logic:** 
- Captured user input in `Navbar` and lifted it into global `App.jsx` state (`searchQuery`).
- Implemented real-time case-insensitive `.includes()` filtering across the `resources` mock state.
- Crafted an interactive pop-up dropdown inside the `Navbar` that cleanly lists up to 5 results and closes correctly on selection or clear.

## 3. Navbar Dropdown Hover Interactions
**Issue:** Handling deep, multi-link dropdowns caused visual clashing if clicking was required. Dropdowns would misfire or get stuck.
**Logic:** Used the `onMouseEnter` and `onMouseLeave` synthetic events on nav item wrappers. Using a specific `activeDropdown` tracking index state, we ensured only the actively hovered category exposes its submenu, resulting in a buttery smooth UI.

## 4. Resource Roadmap Filtering (Tag Matching Bug)
**Issue:** Clicking a category like "CS50" from the Navbar linked to `/roadmap/dev-basics-cs50`, but the display feed showed "No resources found" despite valid mock data tagged with `DEV-BASICS-CS50`.
**Logic Details:**
- The `ResourceList` previously grouped filters logically by generic assumptions (e.g., if a filter contained `dev`, it required `res.tag === 'dev'`).
- This strict logic broke multi-hyphenated identifiers.
- **Fix:** Switched to a robust exact match evaluation: `res.tag.toLowerCase() === filter.toLowerCase()`. This guaranteed 1:1 parity between Navbar URL slugs and resource tag allocations.

## 5. Toggleable Layout Views (Grid vs. List)
**Issue:** Varying content types require different visual constraints. Users might prefer high information density (list) or large visual targets (grid).
**Logic:**
- Passed a `viewMode` state downstream from `App.jsx` to sub-components (`ResourceCard`). 
- Applied dynamic conditional class names to trigger completely separate CSS structures (rearranging flexbox alignments vs. grid column constraints) all within the same component lifecycle without remounting nodes.

## 6. Footer and Responsiveness (Heights)
**Issue:** The UI layout structure and background shading experienced unappealing breaks on ultra-wide or especially tall monitors (which pushes up the footer leaving blank vertical gaps).
**Logic:** Ensured the root app component wraps all main content in min-height configurations (`100vh`) with flex-grow properties pushing the `Footer` to the absolute bottom bounds of the document regardless of viewport saturation.
