export const CATEGORY_TYPE = [
  'pension',
  'hotel',
  'hostel',
  'apartment',
  'villa',
  'guesthouse',
];

export const GRADE = [1, 2, 3, 4, 5];

export const ROOM_TYPE = ['double', 'standard', 'tween', 'single', 'suite', 'deluxe'];

export const INIT_FILTER_OPTIONS = {
  category: '' as TFilterType['category'],
  grade: null,
  roomType: null,
  price: { min: 0, max: 0 },
};
