export const PERSON_IMAGE_PLACEHOLDER = "/assets/pages/ourPeople/person-placeholder.svg";

export function hasPersonImage(src?: string): boolean {
  const value = src?.trim();
  return Boolean(value && value !== PERSON_IMAGE_PLACEHOLDER);
}
