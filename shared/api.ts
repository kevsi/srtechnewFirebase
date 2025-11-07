/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Types Firebase partagés
 */
export interface FirebaseEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  desc: string;
  createdAt?: Date;
  updatedAt?: Date;
}
