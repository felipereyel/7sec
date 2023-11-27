<template>
  <div class="flex flex-col h-full p-3">
    <div class="flex flex-row justify-between p-3 items-center">
      <h1 class="text-4xl font-bold text-center mb-3">7sec</h1>
      <div class="flex flex-row gap-3 items-center">
        <span class="rounded-full px-3 border text-sm">Timer: {{ formatTime(state.time) }}</span>
        <span class="rounded-full px-3 border text-sm">Round: {{ state.round }}</span>
      </div>
    </div>
    <div v-if="state.state == 'play'" class="grow flex flex-col justify-center space-y-4">
      <div v-for="(row, j) in state.board" :key="j" class="flex flex-row justify-center space-x-4">
        <div v-for="(cell, i) in row" :key="i" class="w-10 h-10">
          <svg  class="w-full h-full cursor-pointer" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" @click="click(i, j)">
            <circle cx="50" cy="50" r="50" :fill="cell.value ? 'red' : 'transparent'" stroke="white"  stroke-width="3"/>
          </svg>
        </div>
      </div>
    </div>
    <div v-else-if="state.state == 'completed'" class="grow flex flex-col justify-center items-center space-y-4">
      <h1 class="text-4xl font-bold text-center mb-3">Complete</h1>
      <h2 class="text-2xl font-bold text-center mb-3">Score: {{ state.round }}</h2>
      <h2 class="text-2xl font-bold text-center mb-3">Time: {{ formatTime(state.time) }}</h2>
      <button class="rounded-full bg-slate-600 text-2xl w-fit px-5 py-1 border" @click="startNext">Next</button>
    </div>
    <div v-else-if="state.state == 'end'" class="grow flex flex-col justify-center items-center space-y-4">
      <h1 class="text-4xl font-bold text-center mb-3">Game Over</h1>
      <h2 class="text-2xl font-bold text-center mb-3">Time's up!</h2>
      <h2 class="text-2xl font-bold text-center mb-3">Score: {{ state.round }}</h2>
      <button class="rounded-full bg-slate-600 text-2xl w-fit px-5 py-1 border" @click="restart">Restart</button>
    </div>
    <div v-else class="grow flex flex-col justify-center items-center space-y-4">
      <button class="rounded-full bg-slate-600 text-5xl w-fit px-10 py-5 border" @click="startNext">Start</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { Cell, getCoord, randomIntList, generateBoard } from './utils';

let TIME = 7;
let SIZE = 7;
let started = 0;

type State = "waiting" | "play" | "end" | "completed";

const state = reactive({
  state: "waiting" as State,
  board: [] as Cell[][],
  ended: false,
  round: 0,
  time: 0, // sec * 100
});

const isComplete = computed(() => state.board.every((row) => row.every((cell) => !cell.value)));

const formatTime = (time: number) => {
  const sec = Math.floor(time / 1000);
  const ms = Math.floor((time % 1000) / 10);
  return `${sec}.${ms}`;
};

const restart = () => {
  state.time = 0;
  state.round = 0;
  state.state = "waiting";
};

const startNext = () => {
  state.round += 1;
  started = Date.now();

  state.board = generateBoard(state.round, SIZE);
  randomIntList(state.round, SIZE*SIZE).forEach((n) => {
    const [x, y] = getCoord(n, SIZE);
    state.board[y][x].value = true;
  });

  state.state = "play";
};

const click = (i: number, j: number) => {
  if (state.state != 'play') return;
  state.board[j][i].value = false;
  if (isComplete.value) state.state = "completed";
};

setInterval(() => {
  if (state.state != 'play' || !started) return;
  state.time = Date.now() - started;
  if (state.time >= TIME * 1000) state.state = "end";
}, 50);

onMounted(() => {
  const search = new URLSearchParams(location.search);
  if (search.get("time")) TIME = Number(search.get("time"));
  if (search.get("size")) SIZE = Number(search.get("size"));
});
</script>
