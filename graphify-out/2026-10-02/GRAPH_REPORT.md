# Graph Report - landing_page  (2026-10-01)

## Corpus Check
- 34 files · ~105,749 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .xml 1)

## Summary
- 208 nodes · 237 edges · 42 communities (12 shown, 30 thin omitted)
- Extraction: 97% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `43d8483f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- .agents/skills/antislop-human/contrast-mcp.py
- graphify Advanced Features
- script.js
- .agents/skills/antislop-human/contrast-check.py
- graphify Extraction Pipeline Rules
- .claude/skills/antislop-human/contrast-check.py
- Landing Page Site Sections
- antislop Skill System (.claude)
- antislop Skill System (.agents)
- antislop Pointer in Root Docs
- Craftsmanship Standard C1-C5 (agents)
- Craftsmanship Standard C1-C5 (claude)
- FIM Piston Client Logo
- KYB Client Logo
- MTM Client Logo
- .claude/skills/antislop-human/contrast-mcp.py
- Laporan QA — Landing Page PT Karya Komponen Presisi
- package.json
- Factory Front Entrance
- CNC Shop Floor Interior
- ISO 9001 Certification
- Rational Tool Presetter
- Fowler Tool Presetter
- KKP Inovasi Company Logo
- Mitutoyo CRYSTA-Apex V CMM
- Warehouse Exterior
- Fork Bracket Product
- Steering Knuckle Product
- Angled Pipe Fitting Product
- Aluminum Valve Fitting Product
- Cast Manifold Bracket Product
- Y-Bracket Bushings Product
- Steering Yoke Bracket Product
- Y-Bracket Clamp Bores Product
- Steering Knuckle Pair Product
- Tensioner Bracket Pair Product
- Surfcom Roughness Tester
- Misi (Mission) Section

## God Nodes (most connected - your core abstractions)
1. `/graphify Pipeline` - 17 edges
2. `Laporan QA — Landing Page PT Karya Komponen Presisi` - 8 edges
3. `selftest()` - 6 edges
4. `selftest()` - 6 edges
5. `BFS/DFS Graph Traversal` - 6 edges
6. `Site Footer` - 6 edges
7. `Site Navbar` - 6 edges
8. `antislop Core Skill (claude)` - 6 edges
9. `main()` - 5 edges
10. `main()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `antislop Skill Reference (AGENTS.md)` --semantically_similar_to--> `antislop Skill Reference (CLAUDE.md)`  [INFERRED] [semantically similar]
  AGENTS.md → CLAUDE.md
- `graphify Project Integration Rules` --references--> `/graphify explain Command`  [EXTRACTED]
  CLAUDE.md → .claude/skills/graphify/references/query.md
- `graphify Project Integration Rules` --references--> `/graphify path Command`  [EXTRACTED]
  CLAUDE.md → .claude/skills/graphify/references/query.md
- `graphify Project Integration Rules` --conceptually_related_to--> `/graphify Pipeline`  [INFERRED]
  CLAUDE.md → .claude/skills/graphify/SKILL.md
- `CLAUDE.md Graphify Pointer` --references--> `antislop Core Skill (claude)`  [AMBIGUOUS]
  .claude/CLAUDE.md → .claude/skills/antislop/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **antislop System (agents skills folder)** — _agents_skills_antislop_skill_antislop_core, _agents_skills_antislop_code_skill_antislop_code, _agents_skills_antislop_copywriting_skill_antislop_copywriting, _agents_skills_antislop_human_skill_antislop_human, _agents_skills_antislop_layoutmobile_skill_antislop_layoutmobile, _agents_skills_antislop_ui_skill_antislop_ui [EXTRACTED 1.00]
- **antislop System (claude skills folder)** — _claude_skills_antislop_skill_antislop_core, _claude_skills_antislop_code_skill_antislop_code, _claude_skills_antislop_copywriting_skill_antislop_copywriting, _claude_skills_antislop_human_skill_antislop_human, _claude_skills_antislop_layoutmobile_skill_antislop_layoutmobile, _claude_skills_antislop_ui_skill_antislop_ui [EXTRACTED 1.00]
- **SKILL.md Modular Reference-Doc Network** — claude_skills_graphify_skill_pipeline, claude_skills_graphify_references_add_watch_graphify_add, claude_skills_graphify_references_hooks_post_commit_hook, claude_skills_graphify_references_exports_wiki_export [EXTRACTED 1.00]
- **Site Navigation Structure** — index_navbar, index_footer, index_hero, index_tentang, index_fasilitas, index_produk, index_klien, index_kontak [EXTRACTED 1.00]
- **Core Build-Extract-Query-Update Loop** — claude_skills_graphify_skill_step3_extract, claude_skills_graphify_references_extraction_spec_subagent_prompt, claude_skills_graphify_references_update_incremental_update, claude_skills_graphify_references_query_bfs_dfs_traversal [INFERRED 0.80]

## Communities (42 total, 30 thin omitted)

### Community 0 - ".agents/skills/antislop-human/contrast-mcp.py"
Cohesion: 0.33
Nodes (9): _channel(), check_contrast(), contrast_ratio(), _error(), main(), relative_luminance(), _reply(), _send() (+1 more)

### Community 1 - "graphify Advanced Features"
Cohesion: 0.10
Nodes (21): graphify Project Integration Rules, /graphify add <url>, --watch Folder Watcher, FalkorDB Export / Push, MCP stdio Server, Neo4j Export / Push, Token Reduction Benchmark, Wiki Export (+13 more)

### Community 2 - "script.js"
Cohesion: 0.11
Nodes (21): contactForm, counterObserver, counters, galleries, getGroupItems(), lightbox, lightboxCaption, lightboxCounter (+13 more)

### Community 3 - ".agents/skills/antislop-human/contrast-check.py"
Cohesion: 0.28
Nodes (9): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), reference_doc_path() (+1 more)

### Community 4 - "graphify Extraction Pipeline Rules"
Cohesion: 0.14
Nodes (11): Hyperedge Extraction Rule, Semantic Similarity Edge Rule, Extraction Subagent Prompt, Step 1: Ensure Graphify Installed, Step 2: Detect Files, Step 3: Extract Entities and Relationships, Step 4.5: Graph Health Check, Step 4: Build, Cluster, Analyze (+3 more)

### Community 5 - ".claude/skills/antislop-human/contrast-check.py"
Cohesion: 0.21
Nodes (9): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), reference_doc_path() (+1 more)

### Community 6 - "Landing Page Site Sections"
Cohesion: 0.26
Nodes (13): PT Karya Komponen Presisi (Company), Contact Form (Formspree), Fasilitas (Facilities) Section, Site Footer, Hero Section, ISO 9001 Certification, Klien & Sertifikasi Section, Kontak (Contact) Section (+5 more)

### Community 7 - "antislop Skill System (.claude)"
Cohesion: 0.29
Nodes (10): CLAUDE.md Graphify Pointer, antislop-code Skill (claude), antislop-copywriting Skill (claude), antislop-human Skill (claude), Contrast Checker (claude), antislop-layoutmobile Skill (claude), antislop Core Skill (claude), Delivery Gate (claude) (+2 more)

### Community 8 - "antislop Skill System (.agents)"
Cohesion: 0.33
Nodes (9): antislop-code Skill (agents), antislop-copywriting Skill (agents), antislop-human Skill (agents), Contrast Checker (agents), antislop-layoutmobile Skill (agents), antislop Core Skill (agents), Delivery Gate (agents), Three Dials: Energy/Rhythm/Motion (agents) (+1 more)

### Community 17 - ".claude/skills/antislop-human/contrast-mcp.py"
Cohesion: 0.29
Nodes (9): _channel(), check_contrast(), contrast_ratio(), _error(), main(), relative_luminance(), _reply(), _send() (+1 more)

### Community 18 - "Laporan QA — Landing Page PT Karya Komponen Presisi"
Cohesion: 0.11
Nodes (17): 1. Seluruh tampilan situs bisa rusak total jika satu CDN gagal dimuat, 2. Waktu tampil konten utama (LCP) sangat lambat: 8.2 detik, 3. Gambar logo kecil dengan ukuran file sangat besar — buang-buang kuota & waktu loading, 4. Tidak ada preview saat link dibagikan ke WhatsApp/LinkedIn/Facebook, 5. Tidak ada data terstruktur (JSON-LD) untuk Google Business/Knowledge Panel, 6. Tidak ada `robots.txt` maupun `sitemap.xml`, 7. Title tag sedikit melebihi batas tampil di hasil pencarian, 8. File company profile PPT (41 gambar + 1 file `.ppt`) tidak terpakai oleh situs (+9 more)

### Community 19 - "package.json"
Cohesion: 0.18
Nodes (10): description, devDependencies, tailwindcss, name, private, scripts, build:css, watch:css (+2 more)

## Ambiguous Edges - Review These
- `CLAUDE.md Graphify Pointer` → `antislop Core Skill (claude)`  [AMBIGUOUS]
  .claude/CLAUDE.md · relation: references

## Knowledge Gaps
- **85 isolated node(s):** `navbar`, `menuBtn`, `mobileMenu`, `revealEls`, `revealObserver` (+80 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 108 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `CLAUDE.md Graphify Pointer` and `antislop Core Skill (claude)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `/graphify Pipeline` connect `graphify Advanced Features` to `graphify Extraction Pipeline Rules`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Step 1: Ensure Graphify Installed` connect `graphify Extraction Pipeline Rules` to `graphify Advanced Features`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `navbar`, `menuBtn`, `mobileMenu` to the rest of the system?**
  _85 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `graphify Advanced Features` be split into smaller, more focused modules?**
  _Cohesion score 0.10144927536231885 - nodes in this community are weakly interconnected._
- **Should `script.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10869565217391304 - nodes in this community are weakly interconnected._
- **Should `graphify Extraction Pipeline Rules` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._