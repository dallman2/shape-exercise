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
    /** randomly select a name, a little goofy, but thats JSON for ya */
    this.name = this.randomCollectionSelector(names.names);
    /** randomly select a shape code */
    this.type = this.randomCollectionSelector(shapeCodes);
    /** generate a radius for the shape */
    this.size = this.randomRadiusSelector();
    /** craft a six character hex code for the shapes color  */
    this.color =
      "#" +
      Array.from({ length: 6 }, (el, idx) =>
        this.randomCollectionSelector(hexChars)
      ).join("");
  }
  /**
   * this clunky method will allow us to put these objects in redux stores
   * @returns a datagram for this object
   */
  toSimpleObj() {
    const i = this.index,
      n = this.name,
      t = this.type,
      s = this.size,
      c = this.color;
    return {
      index: i,
      name: n,
      type: t,
      size: s,
      color: c,
    };
  }
  /**
   * tailored random number generation
   * @returns a float between `[0 + RADIUS_RANGE_OFFSET, RADIUS_RANGE_WIDTH + + RADIUS_RANGE_OFFSET]`
   */
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
