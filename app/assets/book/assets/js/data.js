/* ==========================================================================
   Master Robotics — data.js
   Single source of truth for the book structure.
   Used by nav.js to render the sidebar, table of contents, search and pager.
   ========================================================================== */

const BOOK = {
  title: "Master Robotics",
  subtitle: "From Absolute Beginner to Professional Engineer",
  short: "Master Robotics",
  partLabel: "Part",
  root: "",   // chapters live in the same folder as index.html
};

const PARTS = [
  {
    id: "foundations",
    title: "Foundations",
    icon: "bi-rocket-takeoff",
    blurb: "Start here. Understand what robots are and how engineers think.",
    chapters: [
      {
        id: "ch01", num: 1, file: "ch01-what-is-a-robot.html",
        title: "What Is a Robot? A Simple Start",
        desc: "The plain-English definition of a robot, its three main parts, and where you already meet robots every day.",
        minutes: 18, level: "Beginner",
        goals: [
          "Say what makes a machine a robot, using your own words",
          "Name the three big parts every robot shares",
          "Spot robots in daily life and explain what job each one does"
        ]
      },
      {
        id: "ch02", num: 2, file: "ch02-thinking-like-an-engineer.html",
        title: "Thinking Like an Engineer",
        desc: "The simple habits of mind engineers use to turn an idea into a working machine.",
        minutes: 20, level: "Beginner",
        goals: [
          "Use a step-by-step way to solve problems",
          "Break a big goal into small, testable tasks",
          "Tell the difference between a wish and a requirement"
        ]
      },
      {
        id: "ch03", num: 3, file: "ch03-safety-first.html",
        title: "Safety First: Working With Robots",
        desc: "How to stay safe with electricity, tools, batteries and moving parts — the habits professionals never skip.",
        minutes: 17, level: "Beginner",
        goals: [
          "Describe the main dangers in a robotics workspace",
          "Follow a safe start-up and shut-down routine",
          "Choose the right protective habits for a task"
        ]
      }
    ]
  },
  {
    id: "mechanics",
    title: "Mechanics and Motion",
    icon: "bi-gear-wide-connected",
    blurb: "Build the body and muscles of a robot: frames, motors and mechanisms.",
    chapters: [
      {
        id: "ch04", num: 4, file: "ch04-tools-and-materials.html",
        title: "Tools and Materials for Robotics",
        desc: "The starter toolkit, common building materials, and how to set up a workspace that helps you move fast.",
        minutes: 19, level: "Beginner",
        goals: [
          "List the core hand tools a beginner really needs",
          "Match materials such as aluminium, plastic and plywood to jobs",
          "Set up a tidy, safe workbench"
        ]
      },
      {
        id: "ch05", num: 5, file: "ch05-robot-body-structure.html",
        title: "The Robot's Body: Structure and Frames",
        desc: "How a robot holds itself together: chassis, joints, degrees of freedom and rigid structure.",
        minutes: 22, level: "Beginner",
        goals: [
          "Explain what a chassis and a joint do",
          "Count a robot's degrees of freedom",
          "Tell the difference between rigid and flexible designs"
        ]
      },
      {
        id: "ch06", num: 6, file: "ch06-electric-motors.html",
        title: "Electric Motors and How They Move Things",
        desc: "How motors turn electricity into motion, and how to pick the right motor for a job.",
        minutes: 24, level: "Beginner",
        goals: [
          "Explain torque and speed in everyday language",
          "Compare DC, stepper and servo motors",
          "Choose a motor for a simple moving task"
        ]
      },
      {
        id: "ch07", num: 7, file: "ch07-gears-and-mechanisms.html",
        title: "Gears, Belts and Mechanisms",
        desc: "How gears, belts, pulleys and screws trade speed for strength — and how to use them.",
        minutes: 23, level: "Beginner",
        goals: [
          "Explain gear ratio without heavy maths",
          "Name common power-transmission parts",
          "Pick a mechanism to lift, push or turn a load"
        ]
      },
      {
        id: "ch08", num: 8, file: "ch08-designing-solid-robots.html",
        title: "Building a Solid Robot: Design Basics",
        desc: "Weight, balance, stiffness and serviceability — the choices that make a robot reliable.",
        minutes: 21, level: "Beginner",
        goals: [
          "Balance a robot so it stays stable",
          "Reduce weight without losing strength",
          "Design parts that are easy to repair"
        ]
      }
    ]
  },
  {
    id: "electronics",
    title: "Electronics and Power",
    icon: "bi-cpu",
    blurb: "Give your robot senses, a brain and energy.",
    chapters: [
      {
        id: "ch09", num: 9, file: "ch09-basic-electricity.html",
        title: "Basic Electricity for Robots",
        desc: "Voltage, current, resistance and power explained with water-pipe pictures you will never forget.",
        minutes: 22, level: "Beginner",
        goals: [
          "Explain voltage, current and resistance simply",
          "Use Ohm's law to solve a basic circuit",
          "Read a simple circuit diagram"
        ]
      },
      {
        id: "ch10", num: 10, file: "ch10-sensors.html",
        title: "Sensors: Giving Robots Senses",
        desc: "How robots feel the world: distance, light, touch, motion and why sensors need filtering.",
        minutes: 24, level: "Beginner",
        goals: [
          "Name common sensor types and what they measure",
          "Explain the idea of signal and noise",
          "Pick a sensor for a simple task"
        ]
      },
      {
        id: "ch11", num: 11, file: "ch11-microcontrollers.html",
        title: "Microcontrollers and Single-Board Computers",
        desc: "The difference between an Arduino-style board and a Raspberry Pi-style computer, and when to use each.",
        minutes: 23, level: "Beginner",
        goals: [
          "Tell a microcontroller from a single-board computer",
          "Name the main parts of a dev board",
          "Choose a board for a given project"
        ]
      },
      {
        id: "ch12", num: 12, file: "ch12-batteries-and-power.html",
        title: "Batteries and Power Management",
        desc: "Battery types, capacity, voltage and how to keep your robot running safely for longer.",
        minutes: 21, level: "Beginner",
        goals: [
          "Explain battery capacity and voltage",
          "Estimate how long a robot will run",
          "Avoid the most common battery mistakes"
        ]
      },
      {
        id: "ch13", num: 13, file: "ch13-wiring-and-soldering.html",
        title: "Wiring, Soldering and Connections",
        desc: "How to connect parts so they work the first time — and every time after that.",
        minutes: 20, level: "Beginner",
        goals: [
          "Make a clean solder joint",
          "Use the right wire and connector",
          "Find a bad connection with a multimeter"
        ]
      }
    ]
  },
  {
    id: "software",
    title: "Software and Control",
    icon: "bi-code-slash",
    blurb: "Write code that makes your machine behave the way you want.",
    chapters: [
      {
        id: "ch14", num: 14, file: "ch14-programming-your-robot.html",
        title: "Programming Your Robot",
        desc: "Your first lines of robot code: inputs, outputs, loops and making decisions.",
        minutes: 26, level: "Beginner",
        goals: [
          "Write and upload a simple robot program",
          "Use loops and if-statements to control behaviour",
          "Read and fix a basic error message"
        ]
      },
      {
        id: "ch15", num: 15, file: "ch15-control-systems.html",
        title: "Control Systems: Making Robots Behave",
        desc: "Open-loop and closed-loop control, feedback, and the famous PID idea made simple.",
        minutes: 25, level: "Intermediate",
        goals: [
          "Explain feedback and error",
          "Describe what a PID controller does",
          "Tune a simple controller by watching behaviour"
        ]
      },
      {
        id: "ch16", num: 16, file: "ch16-kinematics.html",
        title: "Kinematics: Where the Robot Is and Where It Goes",
        desc: "Turning joint angles into position — the maths that lets a robot reach the right spot.",
        minutes: 28, level: "Intermediate",
        goals: [
          "Explain forward and inverse kinematics",
          "Work through a simple 2-joint arm example",
          "Understand frames and coordinates"
        ]
      },
      {
        id: "ch17", num: 17, file: "ch17-robot-vision.html",
        title: "Robot Vision and Perception",
        desc: "How cameras and algorithms let a robot see, find objects and understand a scene.",
        minutes: 26, level: "Intermediate",
        goals: [
          "Explain how an image becomes data",
          "Describe basic object detection",
          "Understand depth sensing"
        ]
      },
      {
        id: "ch18", num: 18, file: "ch18-ros.html",
        title: "ROS 2: The Robot Operating System",
        desc: "The shared software toolbox professionals use: ROS 2 nodes, topics, ros2_control and real-time ideas.",
        minutes: 27, level: "Intermediate",
        goals: [
          "Explain what ROS is and why it exists",
          "Describe nodes, topics and messages",
          "Run a first ROS-style program idea"
        ]
      }
    ]
  },
  {
    id: "intelligence",
    title: "Robot Intelligence",
    icon: "bi-diagram-3",
    blurb: "Make robots learn, plan and act in the real world.",
    chapters: [
      {
        id: "ch19", num: 19, file: "ch19-robot-learning.html",
        title: "Introduction to Robot Learning and AI",
        desc: "How robots learn from data and practice, and where AI fits into real machines.",
        minutes: 24, level: "Intermediate",
        goals: [
          "Explain machine learning in plain words",
          "Tell training from running a model",
          "Know when AI is and is not the right tool"
        ]
      },
      {
        id: "ch20", num: 20, file: "ch20-path-planning.html",
        title: "Path Planning and Navigation",
        desc: "How a robot decides where to go: maps, obstacles, searching and avoiding collisions.",
        minutes: 25, level: "Intermediate",
        goals: [
          "Explain the idea of a map for a robot",
          "Describe a simple path-planning method",
          "Understand local and global planning"
        ]
      },
      {
        id: "ch21", num: 21, file: "ch21-manipulation.html",
        title: "Robot Manipulation and Grasping",
        desc: "How arms and grippers pick things up: reach, grip force and planning a grasp.",
        minutes: 24, level: "Intermediate",
        goals: [
          "Explain what makes a good grasp",
          "Describe gripper choices",
          "Plan a simple pick-and-place task"
        ]
      }
    ]
  },
  {
    id: "career",
    title: "Practice and Career",
    icon: "bi-mortarboard",
    blurb: "Build real projects, understand the industry, and become a professional.",
    chapters: [
      {
        id: "ch22", num: 22, file: "ch22-first-robot-project.html",
        title: "Your First Robot Project: Step by Step",
        desc: "A complete guided build that uses every idea in the book, from shopping list to running robot.",
        minutes: 34, level: "Beginner",
        goals: [
          "Plan and build a small working robot",
          "Test each part before combining them",
          "Debug a real problem from symptom to fix"
        ]
      },
      {
        id: "ch23", num: 23, file: "ch23-real-world-robotics.html",
        title: "Real-World Robotics: Industry and Applications",
        desc: "Factories, warehouses, hospitals, farms and homes — how robots earn their place.",
        minutes: 22, level: "Beginner",
        goals: [
          "Name major robotics industries and their needs",
          "Explain why some robots succeeded",
          "Connect your skills to real jobs"
        ]
      },
      {
        id: "ch24", num: 24, file: "ch24-becoming-a-professional.html",
        title: "Becoming a Professional Robotics Engineer",
        desc: "Skills, learning path, portfolio and habits that turn a hobbyist into a professional engineer.",
        minutes: 23, level: "Beginner",
        goals: [
          "Plan your next 6-12 months of learning",
          "Build a portfolio that gets noticed",
          "Explain what employers and teams expect"
        ]
      }
    ]
  },
  {
    id: "advanced",
    title: "Advanced Foundations",
    icon: "bi-diagram-3",
    blurb: "Master-level depth: the maths, control, software, simulation, safety and manipulation skills staff engineers use daily.",
    chapters: [
      {
        id: "ch25", num: 25, file: "ch25-advanced-math-for-robotics.html",
        title: "Advanced Mathematics for Robotics",
        desc: "Rotations with SO(3), quaternions and SE(3), plus convex QP optimization and optimal control made plain.",
        minutes: 30, level: "Advanced",
        goals: [
          "Explain rotations with SO(3), quaternions and SE(3) in plain words",
          "Formulate a robot task as a convex QP optimization problem",
          "Describe optimal control and the MPC idea simply"
        ]
      },
      {
        id: "ch26", num: 26, file: "ch26-whole-body-control-mpc.html",
        title: "Whole-Body Control and MPC",
        desc: "Task-space control, hierarchical QP, MPC loops and the real-time budgets behind walking robots.",
        minutes: 30, level: "Advanced",
        goals: [
          "Explain task-space control and nullspace in plain words",
          "Describe hierarchical QP for whole-body control",
          "Explain the MPC loop and real-time budgets"
        ]
      },
      {
        id: "ch27", num: 27, file: "ch27-production-software-robotics.html",
        title: "Production Software for Robotics",
        desc: "Modern C++, ROS 2 with ros2_control, real-time Linux, EtherCAT, Docker, CI and testing.",
        minutes: 32, level: "Advanced",
        goals: [
          "Explain modern C++, Eigen and build tools in plain words",
          "Describe a ROS 2 node with the ros2_control idea",
          "Describe real-time Linux, Docker/CI and testing"
        ]
      },
      {
        id: "ch28", num: 28, file: "ch28-simulation-sim-to-real.html",
        title: "Modern Simulation and Sim-to-Real",
        desc: "MuJoCo, Isaac Lab, Drake and Gazebo compared, plus system identification and domain randomization.",
        minutes: 30, level: "Advanced",
        goals: [
          "Compare Gazebo, MuJoCo, Isaac Sim/Lab and Drake simply",
          "Explain system identification steps",
          "Describe domain randomization for sim-to-real"
        ]
      },
      {
        id: "ch29", num: 29, file: "ch29-functional-safety-certification.html",
        title: "Functional Safety and Certification",
        desc: "ISO 13849 PL, IEC 61508 SIL, FMEA, hazard analysis and the certification path in plain English.",
        minutes: 30, level: "Advanced",
        goals: [
          "Explain functional safety, PL and SIL in plain words",
          "Run a small FMEA and hazard analysis",
          "Describe the certification path simply"
        ]
      },
      {
        id: "ch30", num: 30, file: "ch30-advanced-manipulation-force.html",
        title: "Advanced Manipulation and Force Control",
        desc: "Impedance and force control, MoveIt 2 planning, contact-rich tasks and VLA ideas.",
        minutes: 30, level: "Advanced",
        goals: [
          "Explain impedance vs admittance vs hybrid force control",
          "Describe the MoveIt 2 and OMPL planning pipeline",
          "Explain contact-rich tasks and VLA ideas"
        ]
      }
    ]
  }
];

const APPENDICES = [
  { id: "glossary", num: "A", file: "glossary.html", title: "Glossary of Robotics Terms", desc: "Every important word in the book, defined in plain English.", icon: "bi-book" },
  { id: "resources", num: "B", file: "resources.html", title: "Resources and Next Steps", desc: "Books, courses, kits, communities and tools for the road ahead.", icon: "bi-link-45deg" },
  { id: "mathref", num: "C", file: "appendix-c-math-reference.html", title: "Mathematical Reference", desc: "Lie group cheatsheet, QP formulations and factor-graph factors on one page.", icon: "bi-calculator" },
  { id: "debug", num: "D", file: "appendix-d-debugging-cookbook.html", title: "Debugging Cookbook", desc: "Symptom to cause to test: the fastest fixes for hardware and software faults.", icon: "bi-wrench" }
];

/* Flat list of every chapter in reading order (used for pager + search). */
const FLAT = [];
PARTS.forEach(function (part) {
  part.chapters.forEach(function (ch) {
    FLAT.push({ part: part, ch: ch });
  });
});

function chapterByFile(file) {
  for (var i = 0; i < FLAT.length; i++) {
    if (FLAT[i].ch.file === file) return FLAT[i];
  }
  for (var j = 0; j < APPENDICES.length; j++) {
    if (APPENDICES[j].file === file) return { part: { title: "Appendices" }, ch: APPENDICES[j] };
  }
  return null;
}