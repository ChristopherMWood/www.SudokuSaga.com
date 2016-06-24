app.service('gridService', function() {

    this.sudokuGrids = new Array(3);

    this.initilizeGrids = function (initialBoard) {

        initilizeEmptyBoard();

        for (var i = 0; i < 3; i++)
            this.sudokuGrids[i] = new Array(3);

        for(var row = 0; row < 3; row++)
        {
            for(var column = 0; column < 3; column++)
            {
                this.sudokuGrids[row][column] = this.generateNullArray();
                if (initialBoard != null) {
                    for (var cell_row = 0 + (3 * row), i = 0; cell_row < 3 + (3 * row); cell_row++, i++) {
                        for (var cell_column = 0 + (3 * column), j = 0; cell_column < 3 + (3 * column); cell_column++, j++) {
                            this.sudokuGrids[row][column][i][j] = initialBoard[row][column][i][j];
                        }
                    }
                }
            }
        }
    };

    this.generateNullArray = function () {
        var cellGroup = new Array(3);
        for (var i = 0; i < 3; i++)
            cellGroup[i] = new Array(3)

        for(var row = 0; row < 3; row++)
            for(var column = 0; column < 3; column++)
                cellGroup[row][column] = null;

        return cellGroup;
    };

    this.getBoard = function () {
        return this.sudokuGrids;
    };

    this.getGrid = function (row, column) {
        return this.sudokuGrids[row][column];
    };

    this.getRow = function (row) {
        var rowArray = new Array(9);
        for (var i = 0; i < 9; i++)
        {
            var grid = this.sudokuGrids[Math.floor(row / 3)][Math.floor(i / 3)];
            rowArray[i] = grid[Math.floor(row % 3)][Math.floor(i % 3)];
        }

        return rowArray;
    };

    this.getColumn = function (column) {
        var columnArray = new Array(9);
        for (var i = 0; i < 9; i++)
        {
            var grid = this.sudokuGrids[Math.floor(i / 3)][Math.floor(column / 3)];
            columnArray[i] = grid[Math.floor(i % 3)][Math.floor(column % 3)];
        }

        return columnArray;
    };

    this.getCell = function (row, column) {
        var grid = this.sudokuGrids[Math.floor(row / 3)][Math.floor(column / 3)];
        return grid[Math.floor(row % 3)][Math.floor(column % 3)];s
    };

    this.setCell = function (row, column, value) {
        var grid = this.sudokuGrids[Math.floor(row / 3)][Math.floor(column / 3)];
        grid[Math.floor(row % 3)][Math.floor(column % 3)] = value;
    };

    this.clearCell = function (row, column) {
        var grid = this.sudokuGrids[Math.floor(row / 3)][Math.floor(column / 3)];
        grid[Math.floor(row % 3)][Math.floor(column % 3)] = "";
    };

    this.isValueInRow = function (row, value) {

        var row = this.getRow(row);

        for (var i = 0; i < 9; i++)
            if (row[i] == value)
                return true;

        return false;
    };

    this.isValueInColumn = function (column, value) {

        var column = this.getColumn(column);

        for (var i = 0; i < 9; i++)
            if (column[i] == value)
                return true;

        return false;
    };

    this.isValueInGrid = function (row, column, value) {

        var grid = this.getGrid(row, column);

        for (var i = 0; i < 3; i++)
            for (var j = 0; j < 3; j++)
                if (grid[i][j] == value)
                    return true;

        return false;
    };
});