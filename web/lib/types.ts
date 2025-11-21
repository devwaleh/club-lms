export type Visibility = "Public" | "Private";
export type Role = "Admin" | "Teacher" | "Student";

export interface Classroom {
  id: string;
  title: string;
  description: string;
  visibility: Visibility;
  memberCount: number;
  role?: Role;
}

export interface Lesson {
  id: string;
  classroomId: string;
  title: string;
  contentSnippet?: string;
  content?: string;
  status?: "Draft" | "Published";
  publishedAt?: string;
  videoUrl?: string;
}

export type AssignmentStatus = "Not submitted" | "Submitted" | "Graded";
export interface Assignment {
  id: string;
  classroomId: string;
  title: string;
  dueDate: string;
  status?: AssignmentStatus;
  instructions?: string;
  graded?: boolean;
  score?: number;
  feedback?: string;
  relatedLessonId?: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  textAnswer?: string;
  fileUrl?: string;
  score?: number;
  feedback?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  classroomId: string;
  title: string;
  body: string;
  pinned?: boolean;
  publishedAt: string;
}

export interface DiscussionThread {
  id: string;
  classroomId: string;
  title: string;
  authorName?: string;
  createdAt?: string;
}

export interface DiscussionComment {
  id: string;
  threadId: string;
  authorName?: string;
  body: string;
  createdAt?: string;
}

export interface DiscussionThreadWithComments extends DiscussionThread {
  comments: DiscussionComment[];
}