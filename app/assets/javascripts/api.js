var visualizationTime = 200;
var gridService;

$(function () {
    var injector = angular.element(document.querySelector('[ng-app]')).injector();
    gridService = injector.get('gridService');
    gridService.initilizeGrids(easyBoard);
});

function getCell(row, column) {
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();
    
    var cell = $("#cell-" + row + '-' + column);

    if (algorithmVisualizationEnabled)
        $(cell).css("background-color", actionColor);

    return gridService.getCell(row, column);
}

function getGrid(row, column) {
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();

    var gridCount = (row / 3) + ((column + 3) % 3);
    if (algorithmVisualizationEnabled)
        $(".grid" + row + '-' + column).css("background-color", actionColor).delay(visualizationTime);

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

    if (gridService.getCell(row, column) != null)
        //increase score by removal amount

    gridService.clearCell(row, column);
}

function setCell(row, column, value) {
    ValidateInput(row);
    ValidateInput(column);
    ValidateInput(value);
    clearAllHighlightsToDefaults();

    var cell = $("#cell-" + row + '-' + column);
    var cellAlreadySet = gridService.getCell(row, column) == null;

    if (algorithmVisualizationEnabled)
    {
        if (cellAlreadySet)
            $(cell).css("background-color", placementColor).delay(visualizationTime);
        else
            $(cell).css("background-color", errorColor).delay(visualizationTime);
    }

    gridService.setCell(row, column, value);
    $(cell).text(value);
}

function isValueInRow(row, value) {
    ValidateInput(value);
    ValidateInput(row);
    clearAllHighlightsToDefaults();

    var found = gridService.isValueInRow(row, value);;

    if (algorithmVisualizationEnabled)
    {
        if (found)
            $(".row" + row).css("background-color", placementColor).delay(visualizationTime);
        else
            $(".row" + row).css("background-color", actionColor).delay(visualizationTime);
    }

    return found;
}

function isValueInColumn(column, value) {
    ValidateInput(value);
    ValidateInput(column);
    clearAllHighlightsToDefaults();

    var found = gridService.isValueInColumn(column, value);

    if (algorithmVisualizationEnabled)
    {
        if (found)
            $(".column" + column).css("background-color", placementColor).delay(visualizationTime);
        else
            $(".column" + column).css("background-color", actionColor).delay(visualizationTime);
    }
    
    return found;
}

function isValueInGrid(row, column, value) {
    ValidateInput(value);
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();

    var isInGrid = gridService.isValueInGrid(row, column, value);

    if (algorithmVisualizationEnabled)
    {
        if (isInGrid)
            $("#grid-" + row + '-' + column).css("background-color", placementColor).delay(visualizationTime);
        else
            $("#grid-" + row + '-' + column).css("background-color", actionColor).delay(visualizationTime);
    }

    return isInGrid;
}