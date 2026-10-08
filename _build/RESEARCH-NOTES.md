# Research notes (current as of 2026)

Gathered with the agent-reach skill (Exa web search). Use to keep chapters
current and concrete. Do not over-claim; these are reference points.

## Beginner hardware kits (kit chapter / first project chapter)
- SparkFun Inventor's Kit v4.1.2 — about $99.95, ages 10+, solderless
  breadboard, RedBoard Qwiic (Arduino-compatible). Five projects, 16 circuits,
  ends with an autonomous object-avoiding robot. Includes motor driver,
  gearmotors, servo, ultrasonic sensor, LCD, battery holder.
- Arduino Starter Kit — about EUR 117, official Arduino Uno, 170-page projects
  book, breadboard, sensors, DC motor, servo, L293D H-bridge. No prior
  experience required.
- Takeaway for the book: a breadboard + Arduino-compatible board + motor driver
  + cheap DC gearmotors + an ultrasonic/IR distance sensor is the classic,
  affordable beginner stack.

## ROS 2 (ROS chapter)
- ROS = Robot Operating System. Not an operating system; a set of software
  libraries and tools for building robot applications. ROS 2 is the current
  line (distributions such as Foxy, Humble, Jazzy).
- Core ideas: nodes (one job each), topics (publish/subscribe, many-to-many),
  messages (typed data), parameters, services (request/response), actions
  (long tasks with feedback).
- Typical first robot: TurtleBot / turtlesim. Commands: `ros2 node list`,
  `ros2 topic list`, `ros2 topic echo`.
- Useful analogy for beginners: nodes are workers, topics are notice boards,
  messages are the notes pinned to them.

## Industry and humanoids (industry + career chapters)
Source: McKinsey, "Humanoid robots: crossing the chasm" (Oct 2025); Horvath
humanoid report 2025.
- Real deployments today are structured and repeatable:
  - Amazon + Agility Robotics "Digit" — warehouse tote movement, in
    semi-segregated zones for safety.
  - Mercedes-Benz + Apptronik "Apollo" — material transport on production lines.
  - BMW + Figure AI — intrafactory logistics at Spartanburg.
  - China pushes hardest: MIIT 2024 road map; more than 35 new humanoid models
    in 2024; UBTech "Walker", Fourier.
  - Tesla "Optimus" — custom actuators, trains vision models on its own AI
    infrastructure.
- Costs: industrial humanoids estimated around $55,000 per unit.
- First series production of industrial humanoids expected around 2026;
  multi-purpose robots later this decade. ROI under two years is the target.
- Regulation: EU AI Act (2025) and EU Machinery Regulation (effective 2027).
- Honest framing for the book: humanoids are early. Today's wins are moving
  goods and inspection, NOT high-dexterity assembly. Safety, uptime, then
  dexterity, then cost.

## Framing / tone reminders
- Write for a reader who is weak in English: short sentences, common words,
  one idea per sentence, define every technical term the first time.
- Every chapter keeps the same skeleton and uses the shared CSS classes only.

## Phase 1 advanced research (Oct 2026, agent-reach Exa search — used for Ch25–30)

- ROS 2 + EtherCAT (Ch27): `ethercat_driver_ros2` stack (ICube Lab, Jazzy
  branch) bridges CiA 402 drives to ros2_control. CiA 402 modes: 8 = Cyclic
  Sync Position, 9 = Velocity, 10 = Torque, 6 = Homing. Drive plugin manages
  the state machine to Operation Enabled; integrate via URDF ros2_control tag.
- Whole-body control + MPC (Ch26): 2025 humanoid framework pairs a 100 Hz
  SQP kino-dynamics MPC planner (OCS2) with an 800 Hz HQP tracker (QPOASES),
  reaching 1.2 m/s walking and 60 N push recovery. QP solver benchmark for
  quadruped MPC/WBC: HPIPM (sparse+dense), OSQP (sparse ADMM), qpOASES/DAQP
  (dense active-set), PROXQP/Eiquadprox (dense ALM/dual). Sparse MPC scales
  O(N) with horizon; dense is O(N^2)–O(N^3). Pinocchio handles kinematics
  and dynamics.
- Functional safety (Ch29): ISO 13849-1:2023 (PL a–e, MTTFd/DCavg/PFHd,
  categories) + IEC 61508 (SIL) + IEC 62061 + ISO 3691-4. Safety-function
  FMEA integrates into the standard 7-step AIAG-VDA FMEA as an add-on
  module; FMEDA tables carry the quantitative proof.
- Sim-to-real (Ch28): IIT DLSLab `sim2real-robot-identification` calibrates
  IsaacLab/MuJoCo models with chirp-trajectory joint data; 2025 differentiable
  sim work (MuJoCo-XLA/MJX) cut rotational drift ~75% using trajectory-only
  data (no torque sensing), fitting mass/inertia plus neural friction.
- Math (Ch25): Blanco 2010 SE(3) tutorial remains the standard reference for
  rotation/pose parameterizations and on-manifold Jacobians (MRPT-validated).