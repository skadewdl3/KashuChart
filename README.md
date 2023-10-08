# What is KashuChart

KashuChart is a code-based algorithm flowchart. It was inspired by my friend's (Kashish) idea, hence the name. It uses a custom syntax which is then lexed, parsed using js. The flowchart is constructed and displayed using fabric.js.
_______________________________________________

# KashuChart Syntax

KashuChart consists of blocks and arrows (names subject to change). Blocks include conditions, subroutines, etc. Arrows are the connector between blocks.

Blocks are create beforehand and then connected using the join construct.

#### Blocks syntax

block1 = ...
is the declaration of a variable

block1 = if (...)
if the the block type

block1 = if (Some Condition)
Some Condition text will be shown in the block1

block1 = if (Some Condition) {
  prop1: value1
  prop2: value2
}
curly brackets specify properties (like arrow direction, color, textColor, etc.)

```
if = if (Some Condition) {
  yes: down
  no: left
}

st = start(Algorithm Starts) {
   color: #ff0000
   background: #00ff00 
}
```

> Line breaks are significant!!! Syntax should be exactly as show above for any variable block.

> Currently, I only plan to support hexademical codes for colors.

_______________________________________

#### Join syntax

Join block only has different syntax.
1. block1->block2 is a connection from block1 to block2
2. It will follow "dir" prop for block1

3. if.yes will follow yesDir property, if.no will follow noDir property

4. Can add text onto arrows using the -(Some Text)-> syntax. So, in the above example, "condition is true" will be show on arrow between if3.yes and block4

_________________________________________
# Contribution

This project is quite ambitious, and hard for me cuz IDK shit. If you want to contribute, make a PR. This will probably die, but if not, I'll include a link to a hosted version below 👇🏻

[KashuChart - Create Flowcharts using Code](https://r.mtdv.me/kashuchart)