var editor = ace.edit("editor");
editor.getSession().setMode("ace/mode/javascript");
editor.setTheme("ace/theme/twilight");

var codeLoaded = false;
var running = false;

var storage = {};
var runLoop = false;
var loopFunction;
var sudokuGrids;
var loopInterval;
var loopWaitTime = 250;
var loopIteration = 0;

var placementColor = "#44D518";
var actionColor = "#E68300";
var errorColor = "#DC2F04";

var asciiTitles = ["flip a table!", "flip two tables!", "get angry!", "start party time!"];
var asciiArt = ["(╯°□°）╯︵ ┻━┻", "┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻", "ლ(ಠ益ಠ)ლ", "┏(-_-)┛┗(-_-﻿ )┓┗(-_-)┛┏(-_-)┓"];

var easy1 = [[1, null, 6],[7, 9, null],[null, null, null]];
var easy2 = [[null, 9, 3],[5, null, 6],[null, null, null]];
var easy3 = [[null, 8, 7],[3, 1, null],[null, 6, null]];
var easy4 = [[null, null, 2],[null, 6, 5],[9, 1, null]];
var easy5 = [[null, 1, null],[null, null, null],[null, null, 4]];
var easy6 = [[null, 5, 8],[null, null, null],[null, 3, null]];
var easy7 = [[null, 8, null],[2, null, null],[null, null, null]];
var easy8 = [[1, null, null],[null, 6, 5],[9, 7, null]];
var easy9 = [[4, 7, null],[null, 9, null],[null, null, null]];
var easyBoard = [[easy1, easy2, easy3],[easy4, easy5, easy6],[easy7, easy8, easy9]];

var app = angular.module("sudokuSaga", []); 

app.controller("statisticsController", function($scope) {
    $scope.iteration = 0;
    $scope.score = 0;

    $scope.updateScore = function(value) {
        $scope.score += value;
    };

    $scope.incrementIteration = function() {
        $scope.iteration++;
    };

    $scope.clearIterationCount = function() {
        $scope.iteration = 0;
    };
});

$(function() {
    disableSlider()
    enableSlider();
    loadDefaultTextIntoEditor();
    settings.loadAllSettingsFromCookie();
    setupSudokuGridArray();
    initilizeEmptyBoard();
});

$("#refresh-button").on("click", function () {
    clearInterval(loopInterval);
    codeLoaded = false;
    running = false;
    resetBoard();
    clearIterationCount();
    enableSlider();

    $("#action-button").removeClass('pause-image');
    $("#action-button").addClass('play-image');

    $.ambiance({
        message: "Board Reset",
        type: "success"
    });
});

$("#step-button").on("click", function () {
    if (!running) {
        if (!codeLoaded)
            loadAndResetUserCode();

        try {
            loopFunction();
        }
        catch (error) {
            $.ambiance({
                message: error.message,
                type: "error",
                timeout: 10
            });
        }
    }
});

$("#action-button").on("click", function () {
    if ($(this).hasClass('play-image'))
        playSudoku($(this));
    else
        pauseSudoku($(this));
});

function playSudoku(button) {
    try
    {
        if (!codeLoaded)
            loadAndResetUserCode();

        loopFunction = function () {
            sudokuLoop();
        };

        loopInterval = setInterval(loopFunction, loopWaitTime);

        button.removeClass('play-image');
        button.addClass('pause-image');
        running = true;

        disableSlider();

        $.ambiance({
            message: "Playing",
            type: "success"
        });
    }
    catch (error)
    {
        $.ambiance({
            message: error.message,
            type: "error",
            timeout: 10
        });
    }
}

function pauseSudoku(button) {

    clearInterval(loopInterval);

    button.removeClass('pause-image');
    button.addClass('play-image');
    running = false;

    enableSlider();

    $.ambiance({
        message: "Paused",
        type: "default",
        timeout: 3
    });
}

function resetBoard() {

}

function disableSlider() {
    $("#loop-frequency").prop("disabled", true);
}

function enableSlider() {
    $("#loop-frequency").prop("disabled", "");
}

function loadAndResetUserCode() {
    var code = editor.getSession().getValue();
    var cleanCode = removeBreaks(code);
    $('#customScript').html('<script>' + cleanCode + '<\/script>');
    codeLoaded = true;
    loopIteration = 0;
    settings.saveAllSettingsToCookie();
}

editor.commands.addCommand({
    name: 'saveCode',
    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
    exec: function(editor) {
        $.ambiance({message: "Code Saved"});
    },
    readOnly: true // false if this command should not apply in readOnly mode
});

editor.commands.addCommand({
    name: 'saveCode',
    bindKey: {win: 'Ctrl--',  mac: 'Command-S'},
    exec: function(editor) {
        alert("decreased");
    },
    readOnly: true // false if this command should not apply in readOnly mode
});

editor.commands.addCommand({
    name: 'saveCode',
    bindKey: {win: 'Ctrl-+',  mac: 'Command-S'},
    exec: function(editor) {
        alert("increased");
    },
    readOnly: true // false if this command should not apply in readOnly mode
});

function incrementIterationCount()
{
    loopIteration++;
    $("#iteration-stat").text(loopIteration);
}

function clearIterationCount()
{
    loopIteration = 0;
    $("#iteration-stat").text(loopIteration);
}

function loadDefaultTextIntoEditor()
{
    var defaultCode = 'var sudoku = (function () {\n\tvar saga = {};\n\n\tsaga.iteration = function () {\n\t\t\n\t};\n\n\treturn saga;\n}());';

    editor.setValue(defaultCode, -1);
}

function sudokuLoop()
{
    sudoku.iteration();
    incrementIterationCount();
}

var rowClass = ["row0", "row1", "row2", "row3", "row4", "row5", "row6", "row7", "row8"];
var columnClass = ["column0", "column1", "column2", "column3", "column4", "column5", "column6", "column7", "column8"];

function initilizeEmptyBoard() {
    
    var markup = '';
    
    for(var row = 0; row < 3; row++)
    {
        for(var column = 0; column < 3; column++)
        {
            markup += '<div id="grid-' + row + '-' + column + '" class="grid">';
            sudokuGrids[row][column] = generateNullArray();
            
            for (var cell_row = 0 + (3 * row), i = 0; cell_row < 3 + (3 * row); cell_row++, i++)
            {
                for (var cell_column = 0 + (3 * column), j = 0; cell_column < 3 + (3 * column); cell_column++, j++)
                {
                    var value = easyBoard[row][column][i][j];
                    sudokuGrids[row][column][i][j] = value;

                    markup += createCellMarkup(cell_row, cell_column, value);
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
        sudokuGrids[i] = new Array(3);
}

function createCellMarkup(row, column, value)
{
    if (value == null)
        value = '';

    return '<div id="cell-' + row + '-' + column + '" class="cell ' + "row" + row + ' column' + column + '">' + value + '</div>'
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

function removeBreaks(stringValue) {

    var noBreaksText = stringValue.replace(/(\r\n|\n|\r)/gm,"<1br />");

    var re1 = /<1br \/><1br \/>/gi;
    var re1a = /<1br \/><1br \/><1br \/>/gi;

    noBreaksText = noBreaksText.replace(re1," ");
    noBreaksText = noBreaksText.replace(re1a,"<1br /><2br />");
    noBreaksText = noBreaksText.replace(re1,"<2br />");

    var re2 = /\<1br \/>/gi;
    noBreaksText = noBreaksText.replace(re2, " ");

    var re3 = /\s+/g;
    noBreaksText = noBreaksText.replace(re3," ");

    var re4 = /<2br \/>/gi;
    noBreaksText = noBreaksText.replace(re4,"\n\n");

    stringValue = stringValue.replace(/\s\s+/g, ' ');
    //stringValue = stringValue.replace(/(\\\/\\*[\\w\\\'\\s\\r\\n\\*]*\\*\\\/)|(\\\/\\\/[\\w\\s\\\']*)|(\\<![\\-\\-\\s\\w\\>\\\/]*\\>)/, '');
    return stringValue;
}

$("#loop-frequency").on("change", function() {
    settings.setIterationFrequency($(this).val());
});

$("#clear-editor-button").on("click", function() {
    loadDefaultTextIntoEditor();
});

$("#editor-font-size-dropdown").on("change", function() {
    settings.setEditorFontSize($(this).val());
});

$("#editor-theme-dropdown").on("change", function() {
    settings.setEditorTheme($(this).val());
});

$("#visualizationCheckbox").on("change", function() {
    settings.enableAlgorithmVisualization($(this).is(':checked'));
});

$("#large-mode-toggle").on("change", function() {
    settings.setEditorInLargeMode($(this).is(':checked'));
});