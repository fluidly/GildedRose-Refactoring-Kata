const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("Once the sell by date has passed, Quality degrades twice as fast", function () {
    const gildedRose = new Shop([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
  });

  it("The Quality of an item is never negative", () => {
    const gildedRose = new Shop([new Item("bar", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("bar");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it("The Quality of an item decreases over time", () => {
    const gildedRose = new Shop([new Item("bar", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("bar");
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(0);
  });

  it("The Quality of an item is never more than 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(50);
  });

  it("Aged Brie actually increases in Quality the older it gets", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(11);
  });

  it("Sulfuras, being a legendary item, never has to be sold or decreases in Quality", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(10);
  });

  describe("Backstage passes", () => {
    it("increases in Quality as its SellIn value approaches", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 15),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(14);
      expect(items[0].quality).toBe(16);
    });

    it("increases by 2 when there are 10 days or less", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 15),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(17);
    });

    it("increases by 3 Quality when there are 5 days or les", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 4, 15),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(18);
    });

    it("quality drops to  after the concert", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 15),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
});
