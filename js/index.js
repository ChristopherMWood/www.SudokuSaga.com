// var editor = ace.edit("editor");
// editor.getSession().setMode("ace/mode/javascript");
// editor.setTheme("ace/theme/twilight");

Vue.component('sudoku-board', {
    props: ['board'],
    template: '<div class="sudoku-board"><sudoku-section v-for="(section, index) in board" :key="index" :sectionData="section"></sudoku-section></div>'
})

Vue.component('sudoku-section', {
    props: ['sectionData'],
    template: '<div class="sudoku-section"><sudoku-cell v-for="(cell, index) in sectionData" :key="index" :value="cell"></sudoku-cell></div>'
})

Vue.component('sudoku-cell', {
    data: function() {
        return {
            cellData: this.value
        };
    },
    props: ['value'],
    template: '<div class="sudoku-cell" :cellData="value">{{ cellData }}</div>'
})

Vue.component('sudoku-controls', {
    template: '<div></div>'
})

Vue.component('sudoku-stats', {
    template: '<div></div>'
})

var vm = new Vue({
    el: "#app",
    data: {
        boardData: generateNewBoardArray()
    },
    created: function() {

    },
    mounted: function() {

    },
    methods: {
        setCell: function(section, cell, value) {
            var clone = this.boardData.slice();
            clone[section][cell] = value;

            var test = new Array(9);
            test[0] = new Array(9);
            test[0][0] = 6;

            this.boardData = test;

            vm.$set(this.boardData, section, test[0]);
        }
    }
});

function generateNewBoardArray() {
    var board = new Array(9);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(9);
        board[i][2] = 4;
    }
    return board;
}

function update(row, column, value) {

}

// var vm = new Vue({
//     el: "#app",
//     data: {
//         username: 'Christopher',
//         email: 'cmw2379@gmail.com',
//         submitted: false,
//         asteroids: []
//     },
//     computed: {
//         numAsteroids: function() {
//             return this.asteroids.length;
//         }
//     },
//     created: function() {
//         this.fetchAstroids();
//     },
//     methods: {
//         process: function(event) {
//             this.submitted = true;
//         },
//         fetchAstroids: function() {
//             var apiKey = "IFtAZk3xpo1qaTy9Hq4AUNJUnJZyaJ3HIwW5vxsg";
//             var nasaApiUrl = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=";
//             var requestUrl = nasaApiUrl + apiKey;

//             axios.get(requestUrl)
//                 .then(function(res) {
//                     vm.asteroids = res.data.near_earth_objects.slice(0, 10);
//                     console.log(res);
//                 });
//         },
//         getCloseApproachDate: function(a) {
//             if (a.close_approach_data.length > 0)
//                 return a.close_approach_data[0].close_approach_date;
//             else
//                 return 'N/A';
//         },
//         remove: function(index) {
//             vm.asteroids.splice(index, 1);
//         },
//         shouldHighlightRow: function(a) {
//             if (a.name.includes('2002'))
//                 return true;
//             else
//                 return false;
//         }
//     }

// });


