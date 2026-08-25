// Single source of truth for everything the generated SVGs draw.
//
// Every number here is a measured result from a real project, carried over from
// the portfolio's data layer (portfolio/src/data/*.ts) rather than restated by
// hand. If a figure changes there, change it here and re-run build-assets.mjs —
// the README's tables read the same values, so the two cannot drift silently.

export const REV = "2026.08";

export const IDENTITY = {
  name: "Umer Farooq",
  role: "Systems engineer",
  domains: "HPC · GPU · quantum simulation · verified AI",
  part: "UF-2026-CS",
  location: "Islamabad, PKT (UTC+5)",
  process: "FAST-NUCES · BS Computer Science · 2022–2026",
  status: "OPEN TO WORK",
  email: "umerfarooqcs0891@gmail.com",
};

// The four figures the header leads with. Each pairs a value with the method
// that produced it, because a speedup without a baseline is not a measurement.
export const RATINGS = [
  { value: "6.0×", label: "GPU SPEEDUP", note: "FP16 Tensor Cores, CUDA streams", tone: "thermal" },
  { value: "92%", label: "VERIFIED OUTPUT", note: "Cirq-RAG, vs a 52% baseline", tone: "neural" },
  { value: "20+", label: "QUBITS SIMULATED", note: "hybrid MPI + OpenMP + CUDA", tone: "cryo" },
  { value: "100+", label: "PROJECTS DELIVERED", note: "98% satisfaction, Fiverr L2", tone: "systems" },
];

// One measure, one unit, one hue: speedup against the baseline each replaced.
// Mixing accuracy percentages into this chart would put two scales on one axis,
// so accuracy lives in its own table in the README instead.
export const SPEEDUPS = [
  { name: "MNIST inference", value: 6.0, method: "CUDA streams, kernel fusion, FP16 Tensor Cores", repo: "MNIST-Classification" },
  { name: "Canny edge detection", value: 3.5, method: "tiled shared memory, coalesced access", repo: "Canny-Edge-Detector" },
  { name: "RNN training", value: 3.5, method: "automatic mixed precision, GPU-resident data", repo: "RNN-Character-Level-Text-Generation" },
  { name: "DiT training", value: 1.3, method: "REG/REPA vs a U-Net diffusion baseline", repo: null },
  { name: "2D render loop", value: 1.3, method: "hand-written physics and collision, SFML", repo: null },
];

export const SPEEDUP_AXIS_MAX = 6.5;

// The functional block diagram: four capabilities, each with the input it takes
// and the artefact it returns. The feedback bus underneath is the actual thesis.
export const BLOCKS = [
  {
    input: "a workload that is too slow",
    title: "PARALLELISATION",
    stack: "CUDA · MPI · OpenMP · pthreads · Nsight",
    output: "a speedup curve, and its profile",
    tone: "thermal",
  },
  {
    input: "a circuit, in someone's SDK",
    title: "QUANTUM SIMULATION",
    stack: "Qiskit · Cirq · PennyLane · OpenQASM 3.0",
    output: "portable circuits and statevectors",
    tone: "cryo",
  },
  {
    input: "a model that is confidently wrong",
    title: "VERIFIED AI",
    stack: "RAG · multi-agent · FAISS · self-repair",
    output: "output checked, not trusted",
    tone: "neural",
  },
  {
    input: "a requirement, not a repo",
    title: "PLATFORM & DELIVERY",
    stack: "React · FastAPI · Postgres · Docker · K8s",
    output: "a deployed system, CI in front",
    tone: "interface",
  },
];

export const FEEDBACK_BUS = {
  label: "MEASURE",
  detail: "profile it, benchmark it, validate it — then run the block again",
};

// The console panel. `k` selects how a line is painted:
//   cmd = prompt + command, out = plain output, key = label/value pair,
//   dim = commentary, blank = spacer.
export const CONSOLE = [
  { k: "cmd", text: "umer --help" },
  { k: "out", text: "umer — hand me a system that is too slow, too unreliable," },
  { k: "out", text: "       or not built yet." },
  { k: "blank" },
  { k: "dim", text: "usage: umer <problem> [--constraints] [--deadline]" },
  { k: "blank" },
  { k: "dim", text: "problems" },
  { k: "key", key: "gpu-kernel", text: "my GPU kernel is slower than it should be", tone: "thermal" },
  { k: "key", key: "parallelise", text: "this job takes hours and I need it to take minutes", tone: "thermal" },
  { k: "key", key: "quantum-sim", text: "I need to simulate or compare quantum circuits", tone: "cryo" },
  { k: "key", key: "verify-ai", text: "my AI system is confidently wrong", tone: "neural" },
  { k: "key", key: "build-it", text: "I need the whole thing built, not just the fast part", tone: "interface" },
  { k: "key", key: "review", text: "check our architecture before we commit to it", tone: "systems" },
  { k: "blank" },
  { k: "cmd", text: "umer gpu-kernel --what-i-get" },
  { k: "num", n: "1", text: "an Nsight profile with the bottleneck named, not guessed" },
  { k: "num", n: "2", text: "an optimised kernel, with before and after timings" },
  { k: "num", n: "3", text: "what to do next — and what is not worth doing" },
  { k: "blank" },
  { k: "cmd", text: "umer --status" },
  { k: "key", key: "available", text: "internships · contract · research collaboration", tone: "systems" },
  { k: "key", key: "timezone", text: "Asia/Karachi (UTC+5) — replies inside 24h" },
  { k: "key", key: "contact", text: IDENTITY.email, tone: "thermal" },
];
