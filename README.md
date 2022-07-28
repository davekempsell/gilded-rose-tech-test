# Gilded Rose

This is the Gilded Rose kata in JavaScript with Jest. Undertaken in week 10 of the Makers Academy course.

The text of the kata is as follows:

*"Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a prominent city run by a friendly innkeeper named Allison. We also buy and sell only the finest goods. Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We have a system in place that updates our inventory for us. It was developed by a no-nonsense type named Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that we can begin selling a new category of items. First an introduction to our system:

All items have a `SellIn` value which denotes the number of days we have to sell the item. All items have a Quality value which denotes how valuable the item is. At the end of each day our system lowers both values for every item. Pretty simple, right? Well this is where it gets interesting:

- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- “Aged Brie” actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
- “Backstage passes”, like aged brie, increases in Quality as it’s `SellIn` value approaches; Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

* “Conjured” items degrade in Quality twice as fast as normal items

Feel free to make any changes to the `UpdateQuality` method and add any new code as long as everything still works correctly. However, do not alter the Item class or Items property as those belong to the goblin in the corner who will insta-rage and one-shot you as he doesn’t believe in shared code ownership (you can make the `UpdateQuality` method and Items property static if you like, we’ll cover for you)."*

## The brief:

Legacy code was downloaded from (https://github.com/emilybache/GildedRose-Refactoring-Kata) (translated by Emily Bache).

"Refactor the code in such a way that adding the new "conjured" functionality is easy.

## Design

Based on the brief and existing code, I created the following table to represent the behaviour or each type of item

`What updateQuality does:`
**Item      || sellIn    || Quality**
Normal    || -1        || -1 (-2 when sellIn <= 0)
Sulfuras  || no change || no change
Aged Brie || -1        || +1
Backstage || -1        || +1 (+2 when sellIn <= 10, +3 when sellIn <= 5, =0 when sellIn <= 0)
Conjured  || -1        || -2 (-4 when sellIn <= 0)

This table allowed me to write a test suite that covered the required behaviour of each type of item, and rebuild

This table allowed me to plan my process of test driving the function. Creating tests to incrementally add functionality to satisfy the requirements of the program, finishing with adding the Conjured items.

The code was then refactored to make it clear, adhering to the single-responsibility principle, and utilising polymorphism to reduce duplication of code.

This led to the following Domain Model

Classes

PARENT CLASS
`Item`
*This class remains unchanged, as per the instructions*
Used to create an instance of an item to be passed to the shop.

CHILD CLASSES
`NormalItem`, `LegendaryItem`, `Cheese`, `BackstagePass`, `ConjuredItem`
Classes for each category of item.
`updateItemQuality()` updates the item according to the appropriate rules, changing the sellIn and quality values when appropriate
`qualityLimiter()` ensures item quality value doesn't exceed 50 or drop below 0.

`Shop`
*receives items and stores them in the this.items array*
`updateQuality()` iterates through the this.items array, calling the updateItemQuality function on each item.

## Getting started

Clone the repo locally: `https://github.com/davekempsell/gilded-rose-tech-test.git`

Install dependencies

```sh
npm install
```

## Running tests

To run all tests

```sh
npm test
```

To generate test coverage report

```sh
npm run test:coverage
```

