// src/domain/entities/Admin.ts
export interface Admin {
    id: string;
    email: string;
    name?: string;
    role: "admin";
    createdAt?: string;
    updatedAt?: string;
    permissions?: string[];
  }