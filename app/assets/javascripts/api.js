var visualizationTime = 200;

var gridService;

$(function () {
    var injector = angular.element(document.querySelector('[ng-app]')).injector();
    gridService = injector.get('gridService');
    gridService.initilizeGrids(easyBoard);
});

function getCellValue(row, column) {
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();
    
    var cell = $("#cell-" + row + '-' + column);

    if (algorithmVisualizationEnabled)
        $(cell).css("background-color", actionColor).delay(visualizationTime);

    return gridService.getCell(row, column);
}

function getGrid(row, column) {
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();

    if (algorithmVisualizationEnabled)
        $("#grid-" + row + '-' + column).css("background-color", actionColor).delay(visualizationTime);

    return gridService.getGrid(row, column);
}

function getRow(row) {
    ValidateInput(row);
    clearAllHighlightsToDefaults();

    var rowArray = new Array(9);
    for (var i = 0; i < 9; i++)
    {
        var grid = gridService.getGrid(Math.floor(row/3), Math.floor(i/3));
        rowArray[i] = grid[Math.floor(row%3)][Math.floor(i%3)];

        if (algorithmVisualizationEnabled)
            $(".row" + row).css("background-color", actionColor).delay(visualizationTime);
    }

    return rowArray;
}

function getColumn(column) {
    ValidateInput(column);
    clearAllHighlightsToDefaults();
        
    var columnArray = new Array(9);
    for (var i = 0; i < 9; i++)
    {
        var grid = gridService.getGrid(Math.floor(i / 3), Math.floor(column / 3));
        columnArray[i] = grid[Math.floor(i % 3)][Math.floor(column % 3)];
    }

    if (algorithmVisualizationEnabled)
        $(".column" + column).css("background-color", actionColor).delay(visualizationTime);
    
    return columnArray;
}

function clearCell(row, column) {
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();
    
    var cell = $("#cell-" + row + '-' + column);

    if (algorithmVisualizationEnabled)
        $(cell).css("background-color", errorColor).delay(visualizationTime);

    //$(cell).("");
}

function setCellValue(row, column, value) {
    ValidateInput(row);
    ValidateInput(column);
    ValidateInput(value);
    clearAllHighlightsToDefaults();
    
    var cell = $("#cell-" + row + '-' + column);
    $(cell).text(value);

    if (algorithmVisualizationEnabled)
        $(cell).css("background-color", placementColor).delay(visualizationTime);

    var grid = gridService(Math.floor(row/3), Math.floor(i/3));
    grid[Math.floor(row % 3)][Math.floor(column % 3)] = value;
}

function isValueInRow(value, row) {
    ValidateInput(value);
    ValidateInput(row);
    clearAllHighlightsToDefaults();
    
    var found = false;
    for (var i = 0; i < 9; i++)
    {
        var grid = gridService(Math.floor(row/3), Math.floor(i/3));

        if (algorithmVisualizationEnabled)
            $("#cell-" + row + '-' + i).css("background-color", actionColor).delay(visualizationTime);

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
        var grid = gridService(Math.floor(column / 3), Math.floor(i / 3));

        if (algorithmVisualizationEnabled)
            $("#cell-" + i + '-' + column).css("background-color", actionColor).delay(visualizationTime);
        
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

    var grid = sudokuGrids[row][column];

    if (algorithmVisualizationEnabled)
        $("#grid-" + row + '-' + column).css("background-color", actionColor).delay(visualizationTime);

    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            if (grid[i][j] == value)
                return true;

    return false;
}