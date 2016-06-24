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

    if (settings.algorithmVisualizationEnabled())
        $(cell).css("background-color", actionColor);

    addToScore(1);
    return gridService.getCell(row, column);
}

function getGrid(row, column) {
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();

    var gridCount = (row / 3) + ((column + 3) % 3);
    if (settings.algorithmVisualizationEnabled())
        $(".grid" + row + '-' + column).css("background-color", actionColor).delay(visualizationTime);

    addToScore(1);
    return gridService.getGrid(row, column);
}

function getRow(row) {
    ValidateInput(row);
    clearAllHighlightsToDefaults();

    if (settings.algorithmVisualizationEnabled())
        $(".row" + row).css("background-color", actionColor).delay(visualizationTime);

    addToScore(1);
    return gridService.getRow(row);
}

function getColumn(column) {
    ValidateInput(column);
    clearAllHighlightsToDefaults();

    if (settings.algorithmVisualizationEnabled())
        $(".column" + column).css("background-color", actionColor).delay(visualizationTime);

    addToScore(1);
    return gridService.getColumn(column);;
}

function clearCell(row, column) {
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();
    
    var cell = $("#cell-" + row + '-' + column);

    if (settings.algorithmVisualizationEnabled())
        $(cell).css("background-color", errorColor).delay(visualizationTime);

    if (gridService.getCell(row, column) != null)
        addToScore(5);
    else
        addToScore(10);

    gridService.clearCell(row, column);
}

function setCell(row, column, value) {
    ValidateInput(row);
    ValidateInput(column);
    ValidateInput(value);
    clearAllHighlightsToDefaults();

    var cell = $("#cell-" + row + '-' + column);
    var cellAlreadySet = gridService.getCell(row, column) != null;

    if (settings.algorithmVisualizationEnabled())
    {
        if (cellAlreadySet)
            $(cell).css("background-color", errorColor).delay(visualizationTime);
        else
            $(cell).css("background-color", placementColor).delay(visualizationTime);
    }

    if (cellAlreadySet) {
        addToScore(10);
    }
    else {
        addToScore(-5);
        filledInCells++;
    }

    gridService.setCell(row, column, value);
    $(cell).text(value);
}

function isValueInRow(row, value) {
    ValidateInput(value);
    ValidateInput(row);
    clearAllHighlightsToDefaults();

    var found = gridService.isValueInRow(row, value);;

    if (settings.algorithmVisualizationEnabled())
    {
        if (found)
            $(".row" + row).css("background-color", placementColor).delay(visualizationTime);
        else
            $(".row" + row).css("background-color", actionColor).delay(visualizationTime);
    }

    addToScore(1);
    return found;
}

function isValueInColumn(column, value) {
    ValidateInput(value);
    ValidateInput(column);
    clearAllHighlightsToDefaults();

    var found = gridService.isValueInColumn(column, value);

    if (settings.algorithmVisualizationEnabled())
    {
        if (found)
            $(".column" + column).css("background-color", placementColor).delay(visualizationTime);
        else
            $(".column" + column).css("background-color", actionColor).delay(visualizationTime);
    }

    addToScore(1);
    return found;
}

function isValueInGrid(row, column, value) {
    ValidateInput(value);
    ValidateInput(row);
    ValidateInput(column);
    clearAllHighlightsToDefaults();

    var isInGrid = gridService.isValueInGrid(row, column, value);

    if (settings.algorithmVisualizationEnabled())
    {
        if (isInGrid)
            $("#grid-" + row + '-' + column).css("background-color", placementColor).delay(visualizationTime);
        else
            $("#grid-" + row + '-' + column).css("background-color", actionColor).delay(visualizationTime);
    }

    addToScore(1);
    return isInGrid;
}