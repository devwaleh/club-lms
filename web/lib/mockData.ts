export type Visibility = "Public" | "Private";
export type Role = "Admin" | "Teacher" | "Student";

export type Classroom = {
  id: string;
  title: string;
  description: string;
  visibility: Visibility;
  memberCount: number;
  role: Role;
};

export type Lesson = {
  id: string;
  classroomId: string;
  title: string;
  contentSnippet: string;
  content: string;
  status: "Draft" | "Published";
  publishedAt?: string;
  videoUrl?: string;
  relatedAssignmentIds?: string[];
};

export type AssignmentStatus = "Not submitted" | "Submitted" | "Graded";
export type Assignment = {
  id: string;
  classroomId: string;
  title: string;
  dueDate: string; // ISO string for simplicity
  status: AssignmentStatus;
  instructions: string;
  graded?: boolean;
  score?: number;
  feedback?: string;
  relatedLessonId?: string;
};

export type Announcement = {
  id: string;
  classroomId: string;
  title: string;
  body: string;
  pinned?: boolean;
  publishedAt: string;
};

export type Thread = {
  id: string;
  classroomId: string;
  title: string;
  authorName: string;
  createdAt: string;
};

export type Comment = {
  id: string;
  threadId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export const mockClassrooms: Classroom[] = [
  {
    id: "c-1",
    title: "Intro to Programming",
    description:
      "Learn the basics of programming using JavaScript with hands-on exercises and projects.",
    visibility: "Public",
    memberCount: 42,
    role: "Student",
  },
  {
    id: "c-2",
    title: "Club: Robotics 101",
    description:
      "Weekly sessions exploring robotics fundamentals, sensors, and microcontrollers.",
    visibility: "Private",
    memberCount: 18,
    role: "Teacher",
  },
  {
    id: "c-3",
    title: "Advanced Algorithms",
    description:
      "Deep dive into algorithm design, complexity analysis, and competitive programming techniques.",
    visibility: "Public",
    memberCount: 27,
    role: "Admin",
  },
];

export const mockLessons: Lesson[] = [
  {
    id: "l-101",
    classroomId: "c-1",
    title: "Variables and Types",
    contentSnippet: "Understanding primitives, variables, and type coercion.",
    content:
      "# Variables and Types\n\nThis lesson covers primitives, variables, and dynamic typing in JS.\n\n## Topics\n- Numbers, Strings, Booleans\n- `let`, `const`\n- Type coercion and equality",
    status: "Published",
    publishedAt: new Date().toISOString(),
    videoUrl: "https://example.com/video1",
    relatedAssignmentIds: ["a-201"],
  },
  {
    id: "l-102",
    classroomId: "c-1",
    title: "Control Flow",
    contentSnippet: "Conditionals, loops, and error handling.",
    content:
      "# Control Flow\n\nWe explore conditionals, loops and try/catch error handling in JS.",
    status: "Published",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "l-201",
    classroomId: "c-2",
    title: "Sensors Overview",
    contentSnippet: "Working with ultrasonic and IR sensors.",
    content:
      "# Sensors Overview\n\nIntro to ultrasonic and IR sensors, reading values and calibrating.",
    status: "Draft",
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: "a-201",
    classroomId: "c-1",
    title: "Variables Worksheet",
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    status: "Not submitted",
    instructions:
      "Answer the questions in the worksheet and upload your solutions as a PDF.",
    relatedLessonId: "l-101",
  },
  {
    id: "a-202",
    classroomId: "c-1",
    title: "Loop Challenges",
    dueDate: new Date(Date.now() + 10 * 86400000).toISOString(),
    status: "Submitted",
    instructions: "Solve the loop challenges and submit your code repository link.",
    relatedLessonId: "l-102",
  },
  {
    id: "a-301",
    classroomId: "c-3",
    title: "Complexity Proofs",
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
    status: "Graded",
    instructions: "Provide proofs for the time complexity of given algorithms.",
    graded: true,
    score: 92,
    feedback: "Excellent reasoning and clear proofs.",
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "an-1",
    classroomId: "c-1",
    title: "Welcome to the course",
    body: "Please read the syllabus and introduce yourself in the discussion forum.",
    pinned: true,
    publishedAt: new Date().toISOString(),
  },
  {
    id: "an-2",
    classroomId: "c-1",
    title: "Project groups",
    body: "Form groups of 3 for the upcoming project. Deadline Friday.",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "an-3",
    classroomId: "c-2",
    title: "Lab schedule update",
    body: "The robotics lab will be open extended hours this week.",
    publishedAt: new Date().toISOString(),
  },
];

export const mockThreads: Thread[] = [
  {
    id: "t-1",
    classroomId: "c-1",
    title: "Help with variables",
    authorName: "Alice",
    createdAt: new Date().toISOString(),
  },
  {
    id: "t-2",
    classroomId: "c-1",
    title: "Loop optimization tips",
    authorName: "Bob",
    createdAt: new Date().toISOString(),
  },
  {
    id: "t-3",
    classroomId: "c-2",
    title: "Best sensor libraries?",
    authorName: "Cara",
    createdAt: new Date().toISOString(),
  },
];

export const mockComments: Comment[] = [
  {
    id: "cm-1",
    threadId: "t-1",
    authorName: "Teacher Tom",
    body: "Check your variable scope and initialization.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cm-2",
    threadId: "t-1",
    authorName: "Alice",
    body: "Thanks! That resolved the issue.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cm-3",
    threadId: "t-2",
    authorName: "Bob",
    body: "Use `for...of` where appropriate.",
    createdAt: new Date().toISOString(),
  },
];

export function getClassroom(id: string) {
  return mockClassrooms.find((c) => c.id === id);
}

export function getLessonsForClassroom(classroomId: string) {
  return mockLessons.filter((l) => l.classroomId === classroomId);
}

export function getAssignmentsForClassroom(classroomId: string) {
  return mockAssignments.filter((a) => a.classroomId === classroomId);
}

export function getAnnouncementsForClassroom(classroomId: string) {
  return mockAnnouncements.filter((a) => a.classroomId === classroomId);
}

export function getThreadsForClassroom(classroomId: string) {
  return mockThreads.filter((t) => t.classroomId === classroomId);
}

export function getLessonById(lessonId: string) {
  return mockLessons.find((l) => l.id === lessonId);
}

export function getAssignmentById(assignmentId: string) {
  return mockAssignments.find((a) => a.id === assignmentId);
}

export function getThreadById(threadId: string) {
  return mockThreads.find((t) => t.id === threadId);
}

export function getCommentsForThread(threadId: string) {
  return mockComments.filter((c) => c.threadId === threadId);
}