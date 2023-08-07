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


turn = 1;
let row1Cell1 = $('#row1-cell1');

//make a function to fill in the X and the player 1 styling so I don't have to keep re-writing it
const markX = (elementId) => { //feed in the id of the table cell
    $(`#p-${elementId}`).addClass( "player1-marker" ); //dynamically build the selector for the corresponding p tag
    $(`#p-${elementId}`).text("X");
}

const markCell = (elementId) => {
    if (turn % 2 != 0)
    {
         //= id of p-row1-cell1, etc
        $(`#p-${elementId}`).addClass( "player1-marker" ); //add class to style the x
        $(`#p-${elementId}`).text("X"); //add the x
    }
    else
    {
        $(`p-${elementId}`).addClass( "player2-marker" ); 
        $(`#p-${elementId}`).text("O"); //add the x
    }
    turn++ //increment turn so next click will be the opposite marker
}



/*
anon function works
row1Cell1.click(() => {
    $('#p-row1-cell1').addClass( "player1-marker" );
    $('#p-row1-cell1').text("X");
    console.log(turn)
    turn++
    console.log(turn);
})*/

//why is this firing on the page loading??
row1Cell1.click(markCell(row1Cell1.attr('id')));











/*
if (turn % 2 == 0)
{
    $('#announcement').addClass( "player1Color" );
    $('#announcement').text("Player 1's Turn");
}
else 
{
    $('#announcement').addClass( "player2Color");
    $('#announcement').text("Player 2's Turn");
}
*/


