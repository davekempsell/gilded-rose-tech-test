const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  describe('Item class', function() {
    it('has a name, sellIn value, and quality value', () => {
      const foo = new Item('foo', 0, 0)
      expect(foo.name).toBe('foo');
      expect(foo.sellIn).toBe(0);
      expect(foo.quality).toBe(0);
    })
  })

  describe('Shop class', () => {
    it('receives Items', () => {
      const gildedRose = new Shop([new Item('foo', 0, 0)])
      expect(gildedRose.items[0].name).toBe('foo');
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(0);
    })

    describe('updateQuality function', () => {
      it('when one foo item is added, it decreases the sellIn value by 1, and quality value by 1', () => {
        const gildedRose = new Shop([new Item('foo', 10, 10)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(9);
        expect(gildedRose.items[0].quality).toBe(9);
      })
    })
  })
});
