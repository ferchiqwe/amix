const PRIVATE_PLACE_TERMS = [
  'casa',
  'departamento',
  'depa',
  'habitación',
  'hotel',
  'hostal',
  'airbnb',
  'domicilio',
];

export const isPublicMeetingPlace = (place: string) => {
  const normalized = place.trim().toLocaleLowerCase('es-PE');
  return normalized.length >= 3 && !PRIVATE_PLACE_TERMS.some((term) => normalized.includes(term));
};

export const getPlaceValidationMessage = (place: string) =>
  isPublicMeetingPlace(place)
    ? null
    : 'El primer encuentro debe ser en un espacio público, comercial, cultural o institucional.';
