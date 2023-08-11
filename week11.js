/*
global var for keeping track of turns
value of turn determines if x's or o's put on board
on click event for each cell
    depending on value of turn, insert X or O
    Insert element into the cells using append method
            add class for text-center
            add class for player 1 or 2 marker
            value of x or o depending on turn
        Handle if someone tries to click on cell that already has stuff
    If board is full, add clear button
        Reset all of the p elements in the cells back to empty strings
*/

//global variable turn
let turn = 1;
let hasWinner = false;
let tiedGame = false

//delcare vars 
let row1cell1 = $('#row1-cell1');
let row1cell2 = $('#row1-cell2');
let row1cell3 = $('#row1-cell3');
let row2cell1 = $('#row2-cell1');
let row2cell2 = $('#row2-cell2');
let row2cell3 = $('#row2-cell3');
let row3cell1 = $('#row3-cell1');
let row3cell2 = $('#row3-cell2');
let row3cell3 = $('#row3-cell3');
let announcementText = $('#announcementText')
let announcement = $('#announcement')
let modal = $('#modalWindow');
let span =  $('#close');
let ticTable = $('#ticTacTable');
let table = document.getElementById("ticTacTable");


//methods for error window
const displayModal= () => modal.css("display", "block")
span.on('click', () => modal.css("display", "none"))

const addXStlying = () => {
    announcement.toggleClass("player2Color", false );
    announcement.toggleClass("player1Color", true );
}

const addOStyling = () => {
    announcement.toggleClass("player1Color", false );
    announcement.toggleClass("player2Color", true );
}

const gameOver = () => {
    $('#modal-text').html(`This game is over!<br>Please start a new game!`);
    displayModal();
   
}

const xWins = () => {
    announcementText.html(`Player 1 Wins!`);
    addXStlying();
    hasWinner = true;
}

const oWins = () => {
    announcementText.html(`Player 2 Wins!`);
    addOStyling();
    hasWinner = true;
}

const player1Turn = () => {
    announcementText.html(`Player 1,<br>it's your turn!`);
    addXStlying()
}

const player2Turn = () => {
    announcementText.html(`Player 2,<br>it's your turn!`); //update message up top
    addOStyling()
}

const isATie = () =>
{
    announcementText.html(`It's a tie!`);
    hasWinner = false;
    tiedGame = true
    announcement.removeClass("player1Color");
    announcement.removeClass("player2Color");
    announcement.addClass("tieColor");
}

//reset function
const clearTable = () => {
    for (let i = 1; i< 4; i++)
    {
        for(let j = 1; j< 4; j++)
        {
            $(`#p-row${i}-cell${j}`).empty();
            $(`#p-row${i}-cell${j}`).toggleClass("clicked", false);
            $(`#p-row${i}-cell${j}`).removeClass("player1-marker ", false );
            $(`#p-row${i}-cell${j}`).toggleClass("player2-marker ", false );
        }
    }
    announcement.removeClass("tieColor");
    player1Turn() //start the game over
    turn = 1;
    hasWinner = false;
    tiedGame = false;
}

const checkForThreeAcross = () => {
    for (var i = 0, row; row = table.rows[i]; i++) 
    {
       //iterate through rows
       if(row.cells[0].textContent == "X" && row.cells[1].textContent == "X" && row.cells[2].textContent == "X")
       {
            xWins();
       }
       else if (row.cells[0].textContent == "O" && row.cells[1].textContent == "O" && row.cells[2].textContent == "O")
       {
            oWins()
       }
   }
}

const checkForThreeDown = () => {

   //check for column 1 matches
   if (table.rows[0].cells[0].textContent == "X" && table.rows[1].cells[0].textContent == "X" && table.rows[2].cells[0].textContent == "X")
   {
        xWins();
   }
   else if (table.rows[0].cells[0].textContent == "O" && table.rows[1].cells[0].textContent == "O" && table.rows[2].cells[0].textContent == "O")
   {
        oWins()
   }
   //check for col2 matches
   if (table.rows[0].cells[1].textContent == "X" && table.rows[1].cells[1].textContent == "X" && table.rows[2].cells[1].textContent == "X")
   {
        xWins();
   }
   else if (table.rows[0].cells[1].textContent == "O" && table.rows[1].cells[1].textContent == "O" && table.rows[2].cells[1].textContent == "O")
   {
        oWins()
   }

   //check for col3 matches
   if (table.rows[0].cells[2].textContent == "X" && table.rows[1].cells[2].textContent == "X" && table.rows[2].cells[2].textContent == "X")
   {
        xWins();

   }
   else if (table.rows[0].cells[2].textContent == "O" && table.rows[1].cells[2].textContent == "O" && table.rows[2].cells[2].textContent == "O")
   {
        oWins()
   }
}

const checkForThreeDiagonal = () => {

   //check for diagonal from upper left to bottom right
   if (table.rows[0].cells[0].textContent == "X" && table.rows[1].cells[1].textContent == "X" && table.rows[2].cells[2].textContent == "X")
   {
        xWins();

   }
   else if (table.rows[0].cells[0].textContent == "O" && table.rows[1].cells[1].textContent == "O" && table.rows[2].cells[2].textContent == "O")
   {
        oWins();

   }

   //check for diagonal from upper right to bottom left
   if (table.rows[0].cells[2].textContent == "X" && table.rows[1].cells[1].textContent == "X" && table.rows[2].cells[0].textContent == "X")
   {
        xWins();

   }
   else if (table.rows[0].cells[2].textContent == "O" && table.rows[1].cells[1].textContent == "O" && table.rows[2].cells[0].textContent == "O")
   {
         oWins();
   }
}

//one function to fill in x or o in right color
const markCell = (elementId) => {
    if(hasWinner || tiedGame )//check if someone has won before we let player fill in spaces
    {
        gameOver();
        return;
    }
    if($(`#p-${elementId}`).hasClass("clicked" ))
    {
        $('#modal-text').html(`This space is marked!<br>Please select a different space!`);
        displayModal();
    }
    else
    {
        $(`#p-${elementId}`).addClass("clicked"); //mark the cell as clicked
        if (turn % 2 != 0) //if odd
        {
             //= id of p-row1-cell1, etc
            $(`#p-${elementId}`).addClass("player1-marker"); //add class to style the x
            $(`#p-${elementId}`).text("X"); //add the x
            player2Turn();
        }
        else //if even
        {
            $(`#p-${elementId}`).addClass("player2-marker"); //add class to style the o
            $(`#p-${elementId}`).text("O"); 
            player1Turn();
        }
        turn++ //increment turn so next click will be the opposite marker
        if (turn > 5)
        {
            checkForThreeAcross()//once each player has had three turns start checking for a winnder
            checkForThreeDown()
            checkForThreeDiagonal()
            if (turn > 9 && hasWinner == false)
            {
                isATie();
            }
        }
    }
}


//add event listeners to all of the cells
$('#row1-cell1').click(() => markCell($('#row1-cell1').attr('id')));
$('#row1-cell2').click(() => markCell($('#row1-cell2').attr('id')));
$('#row1-cell3').click(() => markCell($('#row1-cell3').attr('id')));
$('#row2-cell1').click(() => markCell($('#row2-cell1').attr('id')));
$('#row2-cell2').click(() => markCell($('#row2-cell2').attr('id')));
$('#row2-cell3').click(() => markCell($('#row2-cell3').attr('id')));
$('#row3-cell1').click(() => markCell($('#row3-cell1').attr('id')));
$('#row3-cell2').click(() => markCell($('#row3-cell2').attr('id')));
$('#row3-cell3').click(() => markCell($('#row3-cell3').attr('id')));
$('#reset-button').click(() => clearTable());
