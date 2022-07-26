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
      if (item.name != "Sulfuras, Hand of Ragnaros") {
        item.sellIn -= 1;
        if(item.sellIn <= 0) {
          item.quality > 1 ? item.quality -= 2 : item.quality = 0
        } else {
          item.quality > 0 ? item.quality -= 1 : item.quality = 0
        }
      }
    })


    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
