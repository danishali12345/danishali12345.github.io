
export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  INSANE = 'Insane'
}

export enum OS {
  LINUX = 'Linux',
  WINDOWS = 'Windows',
  OTHER = 'Other'
}

export interface WriteupSection {
  title: string;
  content: string;
  code?: string;
  imageUrls?: string[]; // Changed from imageUrl: string
}

export interface HTBMachine {
  id: string;
  name: string;
  os: OS;
  difficulty: Difficulty;
  points: number;
  releaseDate: string;
  avatarUrl: string;
  tags: string[];
  description: string;
  ipAddress: string;
  enumeration?: WriteupSection[];
  foothold?: WriteupSection[];
  privEsc?: WriteupSection[];
}

export interface UserStats {
  rank: string;
  points: number;
  machinesSolved: number;
  challengesSolved: number;
  pakistanRanking: number;
}
