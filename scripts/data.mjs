// Single source of truth for everything the generated SVGs draw.
//
// Every number here is a measured result from a real project, carried over from
// the portfolio's data layer (portfolio/src/data/*.ts) rather than restated by
// hand. If a figure changes there, change it here and re-run build-assets.mjs.
//
// The README is deliberately short — identity, proof, what I do, how to start,
// one exit. Anything that wants a table belongs on the portfolio, not here.

export const REV = "2026.08";

export const IDENTITY = {
  name: "Umer Farooq",
  role: "Systems engineer",
  domains: "HPC · GPU · quantum simulation · verified AI",
  part: "UF-2026-CS",
  location: "Islamabad, PKT (UTC+5)",
  process: "FAST-NUCES · BS CS 2022–26",
  status: "OPEN TO WORK",
  email: "umerfarooqcs0891@gmail.com",
  site: "umerfarooqcs.me",
};

// The four figures the header leads with. Each pairs a value with the method
// that produced it, because a speedup without a baseline is not a measurement.
export const RATINGS = [
  { value: "6.0×", label: "GPU SPEEDUP", note: "FP16 Tensor Cores, CUDA streams", tone: "thermal" },
  { value: "92%", label: "VERIFIED OUTPUT", note: "Cirq-RAG, vs a 52% baseline", tone: "neural" },
  { value: "20+", label: "QUBITS SIMULATED", note: "hybrid MPI + OpenMP + CUDA", tone: "cryo" },
  { value: "100+", label: "PROJECTS DELIVERED", note: "98% satisfaction, Fiverr L2", tone: "systems" },
];

// Six of thirty. Chosen to cover the range — quantum, AI, GPU, HPC, systems —
// and because each one has a number attached. The other 24 are on the site.
export const WORK = [
  {
    name: "QCanvas",
    blurb: "One interface across Cirq, Qiskit and PennyLane, Kubernetes scheduling the jobs.",
    value: "3rd",
    note: "Huawei ICT national finals",
    tone: "cryo",
  },
  {
    name: "Cirq-RAG Code Assistant",
    blurb: "Prompts to executable circuits, through a loop that runs the code and repairs it.",
    value: "92%",
    note: "vs 52% single-agent baseline",
    tone: "neural",
  },
  {
    name: "MNIST on GPU",
    blurb: "Five versions, serial CPU through Tensor Cores, each one profiled not guessed.",
    value: "6.0×",
    note: "inference, accuracy held at 99%+",
    tone: "thermal",
  },
  {
    name: "Q-Tensor",
    blurb: "Tensor networks split across MPI ranks with METIS, contracted on the GPU.",
    value: "20+",
    note: "qubit circuits simulated",
    tone: "thermal",
  },
  {
    name: "Canny edge detector",
    blurb: "The whole pipeline in CUDA — tiled shared memory, coalesced access.",
    value: "3.5×",
    note: "over sequential CPU",
    tone: "thermal",
  },
  {
    name: "Ring DHT with IPFS",
    blurb: "Chord ring over 160-bit SHA-1, replicated so lookups survive nodes leaving.",
    value: "O(log N)",
    note: "finger-table routing",
    tone: "systems",
  },
];

export const WORK_TOTAL = 30;

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
  { k: "dim", text: "problems" },
  { k: "key", key: "gpu-kernel", text: "my GPU kernel is slower than it should be", tone: "thermal" },
  { k: "key", key: "parallelise", text: "this job takes hours and I need it to take minutes", tone: "thermal" },
  { k: "key", key: "quantum-sim", text: "I need to simulate or compare quantum circuits", tone: "cryo" },
  { k: "key", key: "verify-ai", text: "my AI system is confidently wrong", tone: "neural" },
  { k: "key", key: "build-it", text: "I need the whole thing built, not just the fast part", tone: "interface" },
  { k: "key", key: "review", text: "check our architecture before we commit to it", tone: "systems" },
  { k: "blank" },
  { k: "cmd", text: "umer --status" },
  { k: "key", key: "available", text: "internships · contract · research collaboration", tone: "systems" },
  { k: "key", key: "reply", text: "under 24h, from Islamabad (UTC+5)" },
  { k: "key", key: "contact", text: IDENTITY.email, tone: "thermal" },
];

// The single exit. One destination, made to look like the button it is.
export const CTA = {
  label: "SEE THE FULL WORK",
  target: IDENTITY.site,
  detail: `${WORK_TOTAL} projects · runnable demos · live CV · three ways to read the same work`,
};
