class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class NormalItem extends Item {
  updateItemQuality() {
    this.sellIn -= 1;
    this.sellIn <= 0 ? this.quality -= 2 : this.quality -= 1;
    this.quality < 0 ? this.quality = 0 : this.quality = this.quality;
  }
}

class LegendaryItem extends Item {
  updateItemQuality() {}
}

class Cheese extends Item {
  updateItemQuality() {
    this.sellIn -= 1;
    this.quality += 1;
    this.quality > 50 ? this.quality = 50 : this.quality = this.quality;
  }
}

class BackstagePass extends Item {
  updateItemQuality() {
    this.sellIn -= 1;
    this.sellIn <= 0 ? this.quality = 0
      : this.sellIn <= 5 ? this.quality += 3
        : this.sellIn <= 10 ? this.quality += 2 : this.quality += 1;
    this.quality > 50 ? this.quality = 50 : this.quality = this.quality;
  }
}

class ConjuredItem extends Item {
  updateItemQuality() {
    this.sellIn -= 1;
    this.sellIn <= 0 ? this.quality -= 4 : this.quality -= 2;
    this.quality < 0 ? this.quality = 0 : this.quality = this.quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      item.updateItemQuality()
    })
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
  NormalItem,
  LegendaryItem,
  BackstagePass,
  ConjuredItem,
  Cheese
}
