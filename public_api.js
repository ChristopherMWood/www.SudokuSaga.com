var sudokuGrids;
var placementColor = "#44D518";
var actionColor = "#E68300";
var errorColor = "#DC2F04";

$(function() {
    setupSudokuGridArray();
    initilizeEmptyBoard();
});

function initilizeEmptyBoard() {
    
    var markup = '';
    
    for(var row = 0; row < 3; row++)
    {
        for(var column = 0; column < 3; column++)
        {
            markup += '<div id="grid-' + row + '-' + column + '" class="grid">';
            sudokuGrids[row][column] = generateNullArray();
            
            for (var cell_row = 0 + (3 * row); cell_row < 3 + (3 * row); cell_row++)
            {
                for (var cell_column = 0 + (3 * column); cell_column < 3 + (3 * column); cell_column++)
                {
                    markup += createCellMarkup(cell_row, cell_column);
                }
            }
            
            markup += '</div>';
        }
        column = 0;
    }
    
    $('#sudoku-board').html(markup);
}

function setupSudokuGridArray()
{
    sudokuGrids = new Array(3);
    for (var i = 0; i < 3; i++)
        sudokuGrids[i] = new Array(3)
}

function createCellMarkup(row, column)
{
    return '<div id="cell-' + row + '-' + column + '" class="cell"></div>'
}

function generateNullArray()
{
    var cellGroup = new Array(3);
    for (var i = 0; i < 3; i++)
        cellGroup[i] = new Array(3)
    
    for(var row = 0; row < 3; row++)
        for(var column = 0; column < 3; column++)
            cellGroup[row][column] = null;
            
    return cellGroup;
}

function ValidateInput(value) {
    if(!Number.isInteger(value) || value < 0 || value > 10)
        throw "Invalid grid input found. Must be a valid integer 1-9.";
}

function clearAllHighlightsToDefaults() {
    $(".grid").css("background-color", "white");
    $(".cell").css("background-color", "transparent");
}



//PUBLIC API DECLARATIONS

function getCellValue(row, column) {
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();
    
    var cell = $("#cell-" + row + '-' + column);
    $(cell).css("background-color", actionColor);
    
    var grid = sudokuGrids[Math.floor(row/3)][Math.floor(column/3)];
    return grid[Math.floor(row % 3)][Math.floor(column % 3)];
}

function getGrid(row, column) {
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();
        
    $("#grid-" + row + '-' + column).css("background-color", actionColor);
    return sudokuGrids[row][column];
}

function getRow(row) {
    ValidateInput(row);
    clearAllHighlightsToDefaults();
    
    var rowArray = new Array(9);
    for (var i = 0; i < 9; i++)
    {
        var grid = sudokuGrids[Math.floor(row/3)][Math.floor(i/3)];
        rowArray[i] = grid[Math.floor(row%3)][Math.floor(i%3)];
        $("#cell-" + row + '-' + i).css("background-color", actionColor);
    }
    
    return rowArray;
}

function getColumn(column) {
    ValidateInput(column);
    clearAllHighlightsToDefaults();
        
    var columnArray = new Array(9);
    for (var i = 0; i < 9; i++)
    {
        var grid = sudokuGrids[Math.floor(i/3)][Math.floor(column/3)];
        columnArray[i] = grid[Math.floor(i%3)][Math.floor(column%3)];
        $("#cell-" + i + '-' + column).css("background-color", actionColor);
    }
    
    return columnArray;
}

function clearCell(row, column) {
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();
    
    var cell = $("#cell-" + row + '-' + column);
    $(cell).css("background-color", errorColor);
    $(cell).text("");
}

function setCellValue(row, column, value) {
    ValidateInput(row);
    ValidateInput(column);
    ValidateInput(value);
    clearAllHighlightsToDefaults();
    
    var cell = $("#cell-" + row + '-' + column);
    $(cell).css("background-color", placementColor);
    $(cell).text(value);
    
    var grid = sudokuGrids[Math.floor(row/3)][Math.floor(column/3)];
    grid[Math.floor(row % 3)][Math.floor(column % 3)] = value;
}

function isValueInRow(value, row) {
    ValidateInput(value);
    ValidateInput(row);
    clearAllHighlightsToDefaults();
    
    var found = false;
    for (var i = 0; i < 9; i++)
    {
        var grid = sudokuGrids[Math.floor(row/3)][Math.floor(i/3)];
        $("#cell-" + row + '-' + i).css("background-color", actionColor);
        if (grid[Math.floor(row%3)][Math.floor(i%3)] == value)
            found = true;
    }
    
    return found;
}

function isValueInColumn(value, column) {
    ValidateInput(value);
    ValidateInput(column);
    clearAllHighlightsToDefaults();
    
    var found = false;
    for (var i = 0; i < 9; i++)
    {
        var grid = sudokuGrids[Math.floor(i/3)][Math.floor(column/3)];
        $("#cell-" + i + '-' + column).css("background-color", actionColor);
        
        if (grid[Math.floor(i%3)][Math.floor(column%3)] == value)
            found = true;
    }
    
    return found;
}

function isValueInGrid(value, row, column) {
    ValidateInput(value);
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();
}

