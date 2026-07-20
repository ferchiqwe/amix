import { getPlaceValidationMessage, isPublicMeetingPlace } from '@/utils/safety';

describe('public meeting place validation', () => {
  it.each(['Café Lila', 'Museo de Arte', 'Centro Cultural Aurora', 'Librería Central'])(
    'accepts a public or commercial place: %s',
    (place) => expect(isPublicMeetingPlace(place)).toBe(true),
  );

  it.each(['mi casa', 'Hotel de Miraflores', 'un depa', 'habitación 204', 'Airbnb'])(
    'rejects a private or lodging location: %s',
    (place) => expect(isPublicMeetingPlace(place)).toBe(false),
  );

  it('returns a useful, non-absolute safety message', () => {
    expect(getPlaceValidationMessage('hotel')).toContain('espacio público');
    expect(getPlaceValidationMessage('Café Lila')).toBeNull();
  });
});
