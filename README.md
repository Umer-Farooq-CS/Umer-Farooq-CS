<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/header-dark.svg">
  <img alt="Datasheet header. Umer Farooq, systems engineer — HPC, GPU, quantum simulation, verified AI. Part UF-2026-CS, Islamabad PKT (UTC+5), FAST-NUCES BS Computer Science 2022–26, status: open to work. Four key ratings: 6.0× GPU speedup from FP16 Tensor Cores and CUDA streams; 92% verified output on Cirq-RAG against a 52% baseline; 20+ qubits simulated with hybrid MPI, OpenMP and CUDA; 100+ projects delivered at 98% satisfaction as a Fiverr Level 2 seller." src="assets/header-light.svg" width="100%">
</picture>

I make slow systems fast and unreliable ones checkable — CUDA kernels and MPI ranks,
quantum circuits and the simulators under them, AI pipelines that validate their own output
instead of assuming it. Final-year CS at FAST-NUCES Islamabad, third at the Huawei ICT
national finals. **Every number here says what it was measured against.**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/work-dark.svg">
  <img alt="Selected work — six of thirty projects, each with the number it was measured by. QCanvas: one interface across Cirq, Qiskit and PennyLane with Kubernetes scheduling the jobs — 3rd at the Huawei ICT national finals. Cirq-RAG Code Assistant: prompts to executable circuits through a loop that runs the code and repairs it — 92%, against a 52% single-agent baseline. MNIST on GPU: five versions from serial CPU through Tensor Cores, each one profiled — 6.0× inference with accuracy held at 99%+. Q-Tensor: tensor networks split across MPI ranks with METIS, contracted on the GPU — 20+ qubit circuits simulated. Canny edge detector: the whole pipeline in CUDA with tiled shared memory and coalesced access — 3.5× over sequential CPU. Ring DHT with IPFS: Chord ring over 160-bit SHA-1, replicated so lookups survive nodes leaving — O(log N) finger-table routing." src="assets/work-light.svg" width="100%">
</picture>

The other 24 — compilers, distributed systems, generative models, full-stack, games —
are on **[the portfolio](https://umerfarooqcs.me/projects/)**, with the working out.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/blocks-dark.svg">
  <img alt="Block diagram of what I do, in four rows. A workload that is too slow enters PARALLELISATION (CUDA, MPI, OpenMP, pthreads, Nsight) and returns a speedup curve and its profile. A circuit in someone's SDK enters QUANTUM SIMULATION (Qiskit, Cirq, PennyLane, OpenQASM 3.0) and returns portable circuits and statevectors. A model that is confidently wrong enters VERIFIED AI (RAG, multi-agent, FAISS, self-repair) and returns output checked rather than trusted. A requirement rather than a repo enters PLATFORM AND DELIVERY (React, FastAPI, Postgres, Docker, Kubernetes) and returns a deployed system with CI in front. A dashed feedback bus runs from the outputs back to the inputs, labelled MEASURE: profile it, benchmark it, validate it, then run the block again." src="assets/blocks-light.svg" width="100%">
</picture>

The dashed line is the part worth arguing for. It is why Cirq-RAG reaches 92% where one
unchecked generation pass reaches 52% — same model, same knowledge base, one added habit
of running the answer before returning it.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/console-dark.svg">
  <img alt="Terminal transcript. Running 'umer --help' prints: hand me a system that is too slow, too unreliable, or not built yet. Problems accepted — gpu-kernel: my GPU kernel is slower than it should be. parallelise: this job takes hours and I need it to take minutes. quantum-sim: I need to simulate or compare quantum circuits. verify-ai: my AI system is confidently wrong. build-it: I need the whole thing built, not just the fast part. review: check our architecture before we commit to it. Running 'umer --status' prints: available for internships, contract work and research collaboration; replies under 24h from Islamabad UTC+5; contact umerfarooqcs0891@gmail.com." src="assets/console-light.svg" width="100%">
</picture>

Written from your side of the screen — the problem you arrived with, not a capability I want
to advertise. Each one has scoped deliverables on the [services page](https://umerfarooqcs.me/services/).

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Umer-Farooq-CS/Umer-Farooq-CS/output/github-contribution-grid-snake-dark.svg">
  <img alt="A year of contributions, animated as a snake eating the contribution squares." src="https://raw.githubusercontent.com/Umer-Farooq-CS/Umer-Farooq-CS/output/github-contribution-grid-snake.svg" width="100%">
</picture>

Twelve months of commits. The flat stretches are exam weeks.

<a href="https://umerfarooqcs.me/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/cta-dark.svg">
    <img alt="See the full work at umerfarooqcs.me — 30 projects, runnable demos, live CV, and three ways to read the same work." src="assets/cta-light.svg" width="100%">
  </picture>
</a>

<details>
<summary><b>Everything above, as text</b> — projects, experience, education, contact</summary>

<br>

### Selected work

- **[QCanvas](https://github.com/Umer-Farooq-CS/QCanvas)** — Cirq, Qiskit and PennyLane behind one interface, OpenQASM 3.0 as the exchange format, a Kubernetes job manager scheduling simulations. *3rd prize, Huawei ICT Competition national finals, with the UniQ team.*
- **[Cirq-RAG Code Assistant](https://github.com/Umer-Farooq-CS/Cirq-RAG-Code-Assistant)** — natural language to executable quantum circuits, through Designer → Validator → Optimizer → Educator with a real retry loop. *92% success against a 52% single-agent baseline; 140+ entry knowledge base.* Carried across to AWS Braket in **[Braket-RAG](https://github.com/Umer-Farooq-CS/Braket-RAG-Code-Assistant)**.
- **[MNIST on GPU](https://github.com/Umer-Farooq-CS/MNIST-Classification)** — five versions, V1 serial CPU through V5 Tensor Cores, each profiled in Nsight. *6.0× inference, 95%+ GPU utilization, accuracy held at 99%+.*
- **[Q-Tensor](https://github.com/Umer-Farooq-CS/Q-Tensor)** — tensor-network simulator, hybrid MPI + OpenMP with CUDA contractions and METIS partitioning. *20+ qubit circuits.*
- **[Canny edge detector](https://github.com/Umer-Farooq-CS/Canny-Edge-Detector)** — Gaussian blur, Sobel, non-maximum suppression and hysteresis, all in CUDA. *3.5× over sequential CPU.*
- **Ring DHT with IPFS** — Chord-style ring over 160-bit SHA-1, B-tree local storage, replication and fault tolerance. *O(log N) finger-table routing.*

### The other 24, in brief

**AI & ML** — [AgentScript Studio](https://github.com/Umer-Farooq-CS/AgentScript-Studio), [CNN on CIFAR-10](https://github.com/Umer-Farooq-CS/CNN-CIFAR10-Classification-GPU-Optimized) (88.82% top-1 from an 81-combination sweep), [PixelRNN](https://github.com/Umer-Farooq-CS/PixelRNN-Implementation-CIFAR10), [character-level RNN](https://github.com/Umer-Farooq-CS/RNN-Character-Level-Text-Generation) (3.5× faster training with AMP), [waste detection on TACO](https://github.com/Umer-Farooq-CS/Waste-Object-Detection-Segmentation) (2.2× mAP@50), [semantic search assistant](https://github.com/Umer-Farooq-CS/semantic-search-research-assistant), multimodal RAG over PDFs, financial sentiment (FinBERT 94.73%), English→Urdu mBART (BLEU 0.302), DiT diffusion (FID 18.7), CycleGAN, semantic product search (P@1 0.85), CIFAR-10 model suite, [California housing regression](https://github.com/Umer-Farooq-CS/California-Housing-Regression).

**Systems** — [IU compiler](https://github.com/Umer-Farooq-CS/Compiler-Construction) front-to-back with its own [lexer](https://github.com/Umer-Farooq-CS/IU-Lexical-Analyzer), [LL(1) parser toolkit](https://github.com/Umer-Farooq-CS/LL1-Parser-Plus), [SecureChat](https://github.com/Umer-Farooq-CS/SecureChat) over PKI with RSA and Diffie–Hellman, Doodle Dash (multi-threaded TCP game server).

**Full-stack & apps** — [Harmoniq](https://github.com/Umer-Farooq-CS/Harmoniq) (range-request audio streaming, Postgres full-text search), ASCO Services API (.NET 8, JWT, RBAC), DJ web app (WebSockets, GridFS), [the portfolio itself](https://github.com/Umer-Farooq-CS/portfolio), [HPC reference architecture](https://github.com/Umer-Farooq-CS/hpc-reference-architecture), Pac-Man with threaded ghost AI, a 2D game suite, JavaFX and .NET desktop applications.

### Experience

- **Software engineer**, Open Quantum Workbench, FAST-NUCES · *Sep 2025 – present* — the browser-side simulation interface and the Python compute services behind it, so a circuit can be run and inspected without a local quantum toolchain.
- **Freelance developer, Level 2 seller**, Fiverr · *Aug 2023 – Aug 2024* — 100+ projects at 98% satisfaction and 80% repeat custom, delivered ~20% ahead of the agreed date. 30+ full-stack MERN and .NET applications, C++ games with SFML and SDL2, C#/Java desktop apps over PostgreSQL and MySQL.
- **Core team, PR & marketing**, NaSCon'25, FAST-NUCES · *Feb – May 2025* — community partners across 15+ universities for one of Pakistan's largest student-run technology conferences.

### Education, certifications, awards

- **BS Computer Science**, FAST-NUCES Islamabad · *Aug 2022 – Jun 2026 (expected)* · Dean's List, Spring 2023
- Coursework: High-Performance Computing, Parallel & Distributed Computing, Compiler Construction, Operating Systems, Data Structures & Algorithms, Database Systems, Computer Networks, Artificial Intelligence, Machine Learning
- **Oracle Cloud Infrastructure Certified Generative AI Professional**, 2025 — [verify](https://catalog-education.oracle.com/pls/certview/sharebadge?id=BBA28841241A387615C60D761D610210FCC9BC8028300E10D96E95890EEB68B7)
- **Oracle Cloud Infrastructure Certified AI Foundations Associate**, 2025
- **3rd prize**, Huawei ICT Competition national finals, 2024 · **Dean's List**, 2023 · **Fiverr Level 2 seller**, 2024
- Languages: Urdu and English (native/bilingual), Japanese (elementary)

### Stack

`C` `C++17` `CUDA` `Python` `TypeScript` `Java` `C#` · `OpenMP` `MPI` `pthreads` `METIS` `Tensor Cores` `Nsight` `perf` · `Qiskit` `Cirq` `PennyLane` `OpenQASM 3.0` `JAX` · `PyTorch` `TensorFlow` `HuggingFace` `FAISS` `Ollama` · `React` `Next.js` `Node` `Express` `FastAPI` `.NET 8` `PostgreSQL` `MongoDB` `Docker` `Kubernetes` `GitHub Actions`

### Contact

[umerfarooqcs0891@gmail.com](mailto:umerfarooqcs0891@gmail.com) · [LinkedIn](https://www.linkedin.com/in/umer-farooq-a0838a2a1/) · [CV](https://umerfarooqcs.me/cv/) ([PDF](https://umerfarooqcs.me/umer-farooq-cv.pdf), [HPC résumé](docs/Umer-Farooq-HPC_Resume.pdf), [software engineering](docs/Umer-Farooq_SE.pdf)) · Islamabad, PKT (UTC+5), open to remote

</details>

<details>
<summary><b>How this page is built</b></summary>

<br>

Every panel above is generated in this repo — nothing is fetched from a badge service at
render time, and nothing decorative is drawn. Ten SVGs, five panels in a light and a dark
cut, from one data file through a generator with no dependencies:

```bash
node scripts/build-assets.mjs           # regenerate assets/ from scripts/data.mjs
node scripts/build-assets.mjs --check   # exit 1 if they drifted, or an orphan was left
```

`--check` runs in CI, so a figure can't change in the data without the picture following it.

The panels are SVG rather than markdown tables because GitHub strips all author CSS: a
markdown table can only ever render as GitHub's bordered grid, so typography, alignment and
hierarchy are simply not available outside an image. Every panel therefore carries a full
alt description, and the text version above exists so nothing here is picture-only.

Light and dark are separate files because an SVG loaded through `<img>` resolves
`prefers-color-scheme` against the operating system, not the GitHub theme you actually
chose — `<picture>` is what respects the latter. The two accent palettes are not a flip of
each other: each was checked against its own surface for the OKLCH lightness band, the
chroma floor, colour-vision separation under simulated protanopia and deuteranopia, and
WCAG contrast.

</details>

<sub><code>UF-2026-CS</code> · rev 2026.08 · <a href="https://umerfarooqcs.me/">umerfarooqcs.me</a> · <a href="mailto:umerfarooqcs0891@gmail.com">email</a> · <a href="https://www.linkedin.com/in/umer-farooq-a0838a2a1/">linkedin</a></sub>
