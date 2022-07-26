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
          } else if (item.sellIn <= 10) {
            item.quality += 2;
          } else {
            item.quality += 1;
          }
        } else if(item.name != "Aged Brie" ) {
          if(item.sellIn <= 0) {
            item.quality -= 2;
          } else {
            item.quality -= 1;
          }
        } else {
          item.quality += 1;
        }
      }
      item.quality < 0 ? item.quality = 0 : item.quality = item.quality
      item.quality > 50 ? item.quality = 50 : item.quality = item.quality
    })


    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
