# Introduction

Chan’s Casino is an online poker game where players draw a poker from a standard deck and compare it to a randomly generated poker. Players pay an entry fee before starting each game and win rewards if the card they choose has the same suite or value.

The game involves **probability, expectation and uniform probability distribution**  in creation and calculations. 

Because the game is operated by the computer program, the subjective error is avoided. The probability of outcomes is uniformly distributed because each poker has an equal probability to be chosen by the player and the summation of all outcomes is 1. 

Then the probability of each outcome is calculated based on the number of cards that leads to a certain outcome. For example, there is only one card (the card chosen by the computer) that leads to the first prize, then the probability is one card divided by the 52 cards from a standard deck.

The expectation is calculated to determine the pay-in and pay-out of the game. To make the game slightly profitable and not seem like a scam at the same time, the overall pay-in needs to be greater than the expected pay-out but not too much exceed it. The overall expectation is calculated by summing up the products of the prize of each outcome and the probability of that outcome.

# Instruction and Rules

## How to play

Press the “Restart Game” button and pay the entry fee to start a new game. When the game restarts, a random poker is selected by the dealer but not shown to the player.

Select a poker from the standard deck below and click on the one you want to choose.

Once you choose the poker, the dealer will show you the poker you have selected and the poker selected by the dealer.

The reward of this game will also be added to your balance and displayed to you.

Continue to step 1 if you would like to continue this game or cash out your balance if you would like to quit.

## Pay-ins and Pay-outs

The pay-ins and pay-outs of Chan’s Casino are shown in the table below.

|   |Pay-in|
|---|------|
|Entry Fee|$1 Chanidian Dollar|

|   |Pay-out|
|---|-------|
|Different suite and value|Nothing|
|Same suite but different value|$2 Chanidian Dollar|
|Same value but different suite|$5 Chanidian Dollar|
|Same suite and value|$10 Chanidian Dollar|

# Theoretical Probability

## Probability distribution of the game

|X  |P(X)|
|---|----|
|10|1 pokers/52 pokers = 0.019 = 1.9%|
|5|3 pokers/52 pokers = 0.058 = 5.8%|
|2|12 pokers/52 pokers = 3/13 = 0.231 = 23.1%|
|0|1-P(10)-P(5)-P(2) = 1-1/52-3/52-3/13 = 9/13 = 0.692 = 69.2%|

## Expected value and expected pay-out

|X  |P(X)|Expected Value|
|---|----|--------------|
|10|0.019|10\*0.019 = 0.19|
|5|0.058|5\*0.058 = 0.29|
|2|0.231|2\*0.231 = 0.462|
|0|0.692|0\*0.692 = 0|

E(X) = ΣXP(X) = $0.19 + $0.29 + $0.462 + $0 = $0.942

Expected pay-out = $0.942 - $1 = -$0.058

The expected pay-out above shows that players are expected to lose $0.058 on each game they played. As a result, this is not a fair game and it is more favorable to the dealer. Though individuals may win money from the dealer, the overall data shows that the dealer is making a profit from the game and winning more money from the players than he loses.

## Winning and losing probability

The probability of player winning money is P(10) + P(5) + P(2) = 0.019 + 0.058 + 0.231 = **0.308**

The probability of player losing money is P(0) = **0.692**

# Experimental Probability

## Experimental probability results

|X  |P(X)|
|---|----|
|10|22 games/1067 games = 2/97 = 0.021 = 2.1%|
|5|57 games/1067 games = 0.053 = 5.3%|
|2|257 games/1067 games = 0.241 = 24.1%|
|0|731 games/1067 games = 0.685 = 68.5%|

Comparing the experimental and theoretical probability distribution of the game, we can find the deviation is less than 1%. The deviation may result from the insufficient times of games played (1067 games). If more games are played and the data are collected, the experimental probability distribution can be identical to the theoretical probability distribution. The experimental probability distribution corresponds with my expectations. Because the game is operated by computer programs, the subjective error can be avoided so the result is very close to the expectation.
