// src/domain/entities/Trainer.ts
export interface Trainer {
    verifiedByAdmin: boolean;
    id: string;
    name: string;
    email: string;
    specialties: string[];
    experienceLevel?: string;
    isVerified: boolean;
    profilePic?: string;
    createdAt: string;
    ratings?: {
      average?: number;
      count?: number;
      reviews: {
        userId: string;
        rating: number;
        comment?: string | null;
        date: string;
      }[];
    };
  }