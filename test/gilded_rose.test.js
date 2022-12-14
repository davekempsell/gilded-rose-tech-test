const {Shop, Item, NormalItem, LegendaryItem, Cheese, BackstagePass, ConjuredItem} = require("../src/gilded_rose");

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
      const gildedRose = new Shop([new NormalItem('foo', 0, 0)])
      expect(gildedRose.items[0].name).toBe('foo');
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(0);
    })
    it('generates an empty array on construction', () => {
      const gildedRose = new Shop;
      expect(gildedRose.items).toEqual ([])
    })

    describe('updateQuality function', () => {
      it('for one normal item, it decreases the sellIn value by 1, and quality value by 1', () => {
        const gildedRose = new Shop([new NormalItem('foo', 10, 10)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(9);
        expect(gildedRose.items[0].quality).toBe(9);
      })
      it('for one normal item, it decreases quality by 2 when sell by date passed', () => {
        const gildedRose = new Shop([new NormalItem('foo', 0, 10)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(-1);
        expect(gildedRose.items[0].quality).toBe(8);
      })
      it('quality value cannot go below 0', () => {
        const gildedRose = new Shop([new NormalItem('foo', 0, 0)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(-1);
        expect(gildedRose.items[0].quality).toBe(0);
      })
      it('it updates values for multiple items', () => {
        const gildedRose = new Shop([new NormalItem('foo', 0, 6), new NormalItem('bar', 4, 5)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(-1);
        expect(gildedRose.items[0].quality).toBe(4);
        expect(gildedRose.items[1].sellIn).toBe(3);
        expect(gildedRose.items[1].quality).toBe(4);
      })
      it('doesnt update Sulfuras items', () => {
        const gildedRose = new Shop([new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).toBe(0);
        expect(gildedRose.items[0].quality).toBe(10);
      })
      it('increases the quality of Aged Brie by 1', () => {
        const gildedRose = new Shop([new Cheese("Aged Brie", 2, 0)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(1);
        expect(gildedRose.items[0].quality).toBe(1);
      })
      it('quality value cannot go above 50', () => {
        const gildedRose = new Shop([new Cheese("Aged Brie", 2, 50)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(1);
        expect(gildedRose.items[0].quality).toBe(50);
      })
      it('backstage passes have 0 quality after sell by date', () => {
        const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 1, 20)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(0);
        expect(gildedRose.items[0].quality).toBe(0);
      })
      it('backstage passes quality increases in value as sell by date approaches', () => {
        const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 20, 20)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(19);
        expect(gildedRose.items[0].quality).toBe(21);
      })
      it('backstage passes quality increases in value by 2 when 10 days or less to sell by date', () => {
        const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 10, 20)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(9);
        expect(gildedRose.items[0].quality).toBe(22);
      })
      it('backstage passes quality increases in value by 3 when 5 days or less to sell by date', () => {
        const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 4, 20)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(3);
        expect(gildedRose.items[0].quality).toBe(23);
      })
      it('backstage pass quality cannot exceed 50', () => {
        const gildedRose = new Shop([new BackstagePass("Backstage passes to a TAFKAL80ETC concert", 4, 50)])
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(3);
        expect(gildedRose.items[0].quality).toBe(50);
      })
      it('conjured items degrade in quality twice as fast as normal items', () => {
        const gildedRose = new Shop([new ConjuredItem("Conjured Mana Cake", 2, 10)])
        // updateQuality function called whilst item is within sell by date
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(1);
        expect(gildedRose.items[0].quality).toBe(8);

        // call updateQuality function again to take item beyond sell by date
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(0);
        expect(gildedRose.items[0].quality).toBe(4);
      })
      it('conjured items quality cannot go below 0', () => {
        const gildedRose = new Shop([new ConjuredItem("Conjured Mana Cake", 2, 0)])
        // updateQuality function called when quality value is already 0
        gildedRose.updateQuality()
        expect(gildedRose.items[0].sellIn).toBe(1);
        expect(gildedRose.items[0].quality).toBe(0);
      })
    })
  })
});
