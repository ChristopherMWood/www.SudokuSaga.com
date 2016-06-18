var editor = ace.edit("editor");
editor.getSession().setMode("ace/mode/javascript");
editor.setTheme("ace/theme/twilight");

var storage = {};
var runLoop = false;
var loopFunction;
var sudokuGrids;
var loopInterval;
var loopWaitTime = 200;
var loopIteration = 0;

var placementColor = "#44D518";
var actionColor = "#E68300";
var errorColor = "#DC2F04";

var algorithmVisualizationEnabled = true;

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

$(function() {
    //var savedCode = getCookie("sudoku-saved-code");
    //if (savedCode != null)
    //    $(".ace_content").text(savedCode);
    loadDefaultTextIntoEditor();
    setupSudokuGridArray();
    initilizeEmptyBoard();
});

$("#loop-frequency").on("change", function() {
    var value = $(this).val();
    $("#frequency-display").text(value + "ms");
});

$("#clear-editor-button").on("click", function() {
    loadDefaultTextIntoEditor();
});

$("#editor-font-size-dropdown").on("change", function() {
    $("#editor").css("font-size", $(this).val());
});

$("#editor-theme-dropdown").on("change", function() {
    editor.setTheme("ace/theme/" + $(this).val());
});

$("#visualization-toggle").on("change", function() {
    algorithmVisualizationEnabled = $(this).is(':checked');
});

$("#large-mode-toggle").on("change", function() {
    if ($(this).is(':checked'))
    {
        $("#editor").width(800);
        $("#editor").height(600);
    }
    else
    {
        $("#editor").width(650);
        $("#editor").height(400);
    }
    editor.resize()
});

editor.commands.addCommand({
    name: 'saveCode',
    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
    exec: function(editor) {
        alert("Code Saved (change format)");
    },
    readOnly: true // false if this command should not apply in readOnly mode
});

function loadDefaultTextIntoEditor()
{
    var defaultCode = '\n\nfunction iteration()\n{\n\t//Put your code here\n'
    var randomChoice = Math.floor(Math.random() * (asciiTitles.length));

    defaultCode += '\t//Or ' + asciiTitles[randomChoice] + '\n';
    defaultCode += '\t//'+ asciiArt[randomChoice] + '\n';
    defaultCode += '}';

    editor.setValue(defaultCode, -1);
}

$("#run-button").on("click", function() {
    var code = $(".ace_content").text();
    storage = {};
    $('#customScript').html('<script>' + code + '<\/script>');

    try
    {
        loopIteration = 0;
        loopFunction = function () {sudokuLoop()};
        loopInterval = setInterval(loopFunction, loopWaitTime);
        //setCookie("sudoku-saved-code", code, 30);
    }
    catch (error)
    {
        alert(error.message);
    }
});

function sudokuLoop()
{
    iteration();
    loopIteration++;

    if (loopIteration > 50)
        clearInterval(loopInterval);
}

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
        sudokuGrids[i] = new Array(3)
}

function createCellMarkup(row, column, value)
{
    if (value == null)
        value = '';

    return '<div id="cell-' + row + '-' + column + '" class="cell">' + value + '</div>'
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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "max-age="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

