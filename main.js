var editor = ace.edit("editor");
var defaultCode = '\n\nfunction iteration()\n{\n\t//Put your code here\n}';
editor.getSession().setMode("ace/mode/javascript");
editor.setTheme("ace/theme/twilight");
editor.setValue(defaultCode, -1);

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

$(function() {
    //var savedCode = getCookie("sudoku-saved-code");
    //if (savedCode != null)
    //    $(".ace_content").text(savedCode);

    setupSudokuGridArray();
    initilizeEmptyBoard();
});

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

