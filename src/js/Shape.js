import names from "./names.json";

/** the width of the radius window */
const RADIUS_RANGE_WIDTH = 10,
  /** the amount we want to shift the radius window */
  RADIUS_RANGE_OFFSET = 5;

const CIRCLE = 1,
  SQUARE = 2,
  TRIANGLE = 3;
/** these are the codes for the possible shapes, like a list of enums*/
const shapeCodes = [CIRCLE, SQUARE, TRIANGLE];
/** list of possible hex chars we can use */
const hexChars = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

export default class Shape {
  /**
   * construct a shape...
   *
   * @param {*} idx what is the shapes index (this is the effective `id` field)
   */
  constructor(idx) {
    this.index = idx;

    /** randomly select a name */
    this.name = this.randomCollectionSelector(names);
    /** randomly select a shape code */
    this.type = this.randomCollectionSelector(shapeCodes);
    /** generate a radius for the shape */
    this.size = this.randomRadiusSelector();
    /** craft a six character hex code for the shapes color  */
    this.color =
      "#" +
      Array.from({ length: 6 }, (el, idx) =>
        this.randomCollectionSelector(hexChars)
      ).join('');
  }
  randomRadiusSelector() {
    return Math.random() * RADIUS_RANGE_WIDTH + RADIUS_RANGE_OFFSET;
  }

  /**
   * selects a random element from collection
   * @param {ArrayLike} collection any arraylike
   * @returns a random element from that collection
   */
  randomCollectionSelector(collection) {
    return collection[Math.floor(Math.random() * collection.length)];
  }
}
