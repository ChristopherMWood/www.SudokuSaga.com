<template>
    <div class="sudoku-board">
        <sudoku-section v-for="i in 9" :key="i">
        </sudoku-section>
    </div>
</template>

<script>
import sudokuSection from '../SudokuSection.vue'

export default {
    name: 'sudoku-board',
    components: {
        sudokuSection
    }
}
</script>

<style>
    .sudoku-board {
        width: 500px;
        height: 500px;
        margin: 0;
        padding: 0;
        outline: solid 1px black;
        display: flex;
    }
</style>