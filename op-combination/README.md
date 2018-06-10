# Concurrent Operations

## `combine()`
We need to find a way to pick one action from each Operation and decide which one should be done next. Repeat until there are no more edits on both operations.

The combination's table I used:

||move(x2)|insert(x2)|delete(x2)|
|-|-|-|-|
|move(x1)|move(min(x1, x2)) and max(x1, x2) -= min(x1, x2)|insert(x2)|delete(x2) and x1 -= x2|
|insert(x1)|insert(x1)|insert(x1)|insert(x1)|
|delete(x1)|delete(x1) and x1 -= x1|insert(x2)|delete(min(x1, x2)) and max(x1, x2) -= min(x1, x2)|

## `apply()`

Just need to iterate through the operation and move the caret position according to the operations be applied.

## Run and test

`npm install && npm test`