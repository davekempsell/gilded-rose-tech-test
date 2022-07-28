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
        item.name.includes("Backstage passes") ? this.#backstagePasses(item)
          : item.name.includes("Aged Brie") ? this.#agedBrie(item)
            : item.name.includes("Conjured") ? this.#conjured(item) : this.#normalItem(item);
        this.#qualityLimiter(item);  
      }
    })
    return this.items;
  }

  // private functions to be called within updateQuality:
  #qualityLimiter(item) {
    item.quality < 0 ? item.quality = 0
      : item.quality > 50 ? item.quality = 50 : item.quality = item.quality;
  }

  #normalItem(item) {
    item.sellIn <= 0 ? item.quality -= 2 : item.quality -= 1;
  }

  #agedBrie(item) {
    item.quality += 1;
  }

  #backstagePasses(item) {
    item.sellIn <= 0 ? item.quality = 0
      : item.sellIn <= 5 ? item.quality += 3
        : item.sellIn <= 10 ? item.quality += 2 : item.quality += 1
  }

  #conjured(item) {
    item.sellIn <= 0 ? item.quality -= 4 : item.quality -= 2;
  }
}

module.exports = {
  Item,
  Shop
}
