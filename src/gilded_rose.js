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
    this.items[0].sellIn -= 1;
    if(this.items[0].sellIn <= 0) {
      this.items[0].quality -= 2;
    } else {
      this.items[0].quality -= 1;
    }
    
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
