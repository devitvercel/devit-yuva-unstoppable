/**
 * Cross-cutting types for Yuva.
 */

export type { WPMedia, WPApiResponse } from "./wordpress.types";

export interface MediaAsset {
  src: string;
  alt: string;
}
