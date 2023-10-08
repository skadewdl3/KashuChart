## KashuChart Syntax

```
if = if (Some Condition) {
  yes: down
  no: left
}

join {
  block1->block2->if3.yes->block4
  if3.no->block5
}
```

Line breaks are significant!!! Syntax should be exactly as show above for any variable block.

Join block only has different syntax.
block1->block2 is a connection from block1 to block2
it it will follow "direction" prop for block1