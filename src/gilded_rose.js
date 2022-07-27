class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if(item.name != "Sulfuras, Hand of Ragnaros") {
        item.sellIn -= 1;
        if(item.name.includes("Backstage passes")) {
          if(item.sellIn <= 0) {
            item.quality = 0;
          } else if (item.sellIn <= 5) {
            item.quality += 3;
          } else if (item.sellIn <= 10) {
            item.quality += 2;
          } else {
            item.quality += 1;
          }
        } else if(item.name != "Aged Brie" ) {
          if(item.sellIn <= 0) {
            // function checks if item name includes Conjured, and degrades quality by twice as much if it does
            item.name.includes("Conjured") ? item.quality -= 4 :item.quality -= 2;
          } else {
            item.name.includes("Conjured") ? item.quality -= 2 :item.quality -= 1;
          }
        } else {
          item.quality += 1;
        }
        item.quality < 0 ? item.quality = 0 : item.quality = item.quality
        item.quality > 50 ? item.quality = 50 : item.quality = item.quality
      }
    })

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
