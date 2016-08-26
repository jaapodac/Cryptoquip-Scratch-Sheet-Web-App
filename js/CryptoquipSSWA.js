// JavaScript, JQuery Document

/* -----------+ Comment Block +-------------------
File:		CryptoquipSSWA.js
Author:     J. Apodaca
Date:       July 7, 2014
Purpose:    Scratch Sheet for Solving Newspaper Cryptoquips
Dependencies: jQuery libraries, placed in js folder, pulled online
              jQuery UI Libraries 
    Input:     Data is passed from 1st page to another page!!! (called localStorage)
Output:        Popup page with letter occurrence statistics

Example of Use: <script type="text/javascript" src="js/CryptoquipSSWA.js"> </script>

Special Thanks to: 
                   
*/

//Note: Unlike PHP scripts, we do NOT use <script> pairs with Javascript

// ****** TO DO *****
// Add quick substitution pairs box i.e. AQ VB LZ
// Add Help Toggle with short instructions ✓
// Add Check for more than 2 letters being subbed for the same 1.
// Add Program Feedback line (error box)

//*******************

//Algorithm description. 
/*
Two pages are a part of this program.
The first page opens to collect the users phrase or CryptoQuip.
The Second page begins the scratch work where the original, unedited phrase is presented and below that 
is the phrase broken down into Solved letters and dashes for the unsolved letters and natural spaces. 
Below that, on the same page is the Alphabet and input boxes where the user can immediately 
substitute the letters in the puzzle, automatically updating 
the substitutions. Another button opens a section with Statistics about the current phrase being 
solved and, finally, there is a button to reset the substitutions.
*/
// http://javascript.info/tutorial/objects
/* Various Notes
var newOrderString = countBucket.slice(0); //Note, this is apparently how to copy arrays in js.
// for future ref: http://stackoverflow.com/questions/1129216/sorting-objects-in-an-array-by-a-field-value-in-javascript
First Iteration of this program utilized some Pseudo-Associative Array with [a, 9]-like 
labeled pairs was kinda cool but, upon further reflection
due to the complications involved in creating, sorting, accessing, and reporting results, it
became clear that a simpler approach was needed. A simple alphabetic index of counts in a
2D array seemed appropriate.
// Note: Native Javascript will sort an array of strings into basic codepoint order 
//       (numbers before letters, capitals before lowercase, etc.)
*/

// Show a statistical, alphabetical breakdown of the relative occurrence of letters in a phrase.

//Grab the phrase array. Reduce array to lowercase for processing simplicity. Count each 
//letter and the number of occurrences. Report from highest to lowest count alphabetically 
//to user via replacing text, as a toggle, at the bottom of the page.

// Does not include accented or non-English characters
// Ignores Spaces, line returns, numbers, and, at this time, special characters
var symbols= []; //Main Array. 

var glyph = "abcdefghijklmnopqrstuvwxyz"; //these are the symbols to count through
// could use "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-" but most quips just deal with letters.

var ELF = "etaoinsrhldcumfpgwybvkxjqz";// English Language Frequency

for (var i=0; i < glyph.length ; i++) { 
//Combine and Fill in the database array with glyphs and zeroes
	symbols[i] = [glyph[i],0]; //looks like [['a',0],...]
}

//This copies the original, pristine array in preparation for a symbol count
var countBucket = jQuery.extend(true, [], symbols); 
var originalPhrase = "";

 
//From another HTML page...
if (typeof(Storage) != "undefined") { //Test for local storage. If not, use Test Phrase.
	var holdThis = localStorage.getItem("CryptoQUIP.game.in.progress");  //Outside data from prior page
	if ((holdThis != null) && (holdThis != "")) {
		originalPhrase = holdThis;
	} else {
		originalPhrase = "STE’L RAL XBUL CTK PUEETL ST ZELAYGAYA XZLB XBUL CTK PUE ST. --- HTBE XTTSAE"; //Test Phrase
				  //decoded: don’t let what you cannot do interfere with what you can do. --- john wooden
	}	
} else {		  
  alert("No browser support for local storage.");
}

var phraseCopy = originalPhrase.toLowerCase(); //Correct the case for processing.
var userPhrase = originalPhrase.toLowerCase(); //In JavaScript, strings are immutable

function CountEachSymbol() { 
    //Actual counting process goes here.
	for (var i = 0; i < (phraseCopy.length) ; i++) { //iterate through the phrase
		for (var buckets = 0; buckets < (countBucket.length); buckets++) {
			if (countBucket[buckets][0] === phraseCopy[i]) { //iterate through the alphabet 
				countBucket[buckets][1]++;	//In Alphabet order, each occurrence of a letter is recorded			
			}
		}
	}
} //End CountEachSymbol

CountEachSymbol(); 

//Later, With sortedArray, countBucket will be reordered from Alphabetical to highest count
var sortedArray = jQuery.extend(true, [], countBucket); //Don't modify the countBucket array

function compareSecondColumn(a, b) {
    //Designed to sort the array numerically from greatest to least
    //So named as the numbers are in the 2nd column of the 2D Array.
    // Example of Use:  symbols.sort(compareSecondColumn);
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
} //End compareSecondColumn

function ReportTable(theArray) {
/* Example of Use:
	ReportTable(SomeArray)
*/
	//Produces a formatted HTML String showing both Properties and Values
	var theReport = "<table><tr>";

	for (var i in theArray) { 
		theReport += "<td>" + theArray[i][0] + "</td>"; //Produce a table of letters
	}

	theReport += "</tr><tr>";

	for (var i in theArray)  { //Produce the corresponding values
		 theReport += "<td>" + theArray[i][1] + "</td>"; //Produce a table of counts
	} 

	theReport += "</tr></table><br>"; // Finish up the report

	return theReport;

} //End ReportTable

$(document).ready(function(){ //Upon opening window, Show Original and User Phrases
// ToDo: Split up output to 20 characters per line
	$("#OP").append( originalPhrase + "<br>" );  //Oh, and show the Original Phrase 
	$("#CCChanges").append(userPhrase);
});

$(document).ready(function(){  //In the report area, Show the Original Array in a formatted table
  $("#btn0").click(function(){
  $("#reportArea").show();
  $("#reportArea").empty();
    $("#reportArea").append("<h2>Original Array</h2><br>" + ReportTable(symbols) );
  });
});


$(document).ready(function(){  //In the report area, Show the Alphabetical Counted Array in a formatted table
  $("#btn1").click(function(){
  $("#reportArea").show();
  $("#reportArea").empty();
    $("#reportArea").append("<h2>Alphabetic Report</h2><br>" + ReportTable(countBucket));
  });
});

//Report by modifying the html element
$(document).ready(function(){  //In the report area, Show the Numerically Sorted Array in a formatted table
  $("#btn2").click(function(){ 
     //Doesn't make sense to attempt solution with ELF unless this report is run.
  	 $('#btn4').attr('disabled', false);  //Turn on button. doesn't work:$("#btn4").button("enable");​​​​​​​​​​​​​

     $("#reportArea").show(); 
     $("#reportArea").empty();
     
     sortedArray = sortedArray.sort(compareSecondColumn);	      
    $("#reportArea").append("<h2>Occurrence Report</h2><br>" + ReportTable(sortedArray) + "<br>\'" +
                             sortedArray[0][0] + "\' is probably \'e\'");   //With a little advice to the user!                            
    //$("#result").append(JSON.stringify(copyOfArray));   //Used in debugging
    });
});

$(document).ready(function(){  //Reset the Puzzle. Clear All textboxes of user input.
  $("#reset").click(function(){  
  userPhrase = phraseCopy;
  $("[id*=tb]").val(""); //Powerful Selector. Clearing Contents of tb0 to tb25 (textbox)
  $("#CCChanges").empty();
  $("#CCChanges").append(userPhrase + "<br>Puzzle Reset");
  });
});

$(document).ready(function(){ //If user has clicked the toggle button, change the button name and Show/Hide the Report Area
  $('#btn3').click(function(){
    
	$('#reportArea').toggle();
	
	//Toggling the 'value' or name to Show/Hide of the button based on the visibility of the <p> called reportArea 
	if ($('#reportArea').is(':visible')) 
		{
		$(this).val('Hide Report Area'); 
		$(this).css('color','black');
		}
		else 
		{
		$(this).val('Show Report Area'); 
		$(this).css('color','red');
		}   
  });

  });

$(document).ready(function(){ //Use Letter counts to show a possible solution using ELF.
  $('#btn4').click(function(){//Recommended changes based on English Language Frequency (ELF).

	  var userLetter = ""; //This is the letter to be replaced	  
	  var replacement = "";//the letter replacement

		//  Damn RegExp and .Replace completely failed to change the immutable String!

		//Take ELF, in order because sortedArray is also greatest to least, and match.
		//Substitute ELF[0] = sortedArray[0][0] iterated through the Phrase.
	  for (var thisLetter = 0; thisLetter < ELF.length; thisLetter++) {
	  		replacement = ELF[thisLetter];
	  		userLetter = sortedArray[thisLetter][0];
			//With a letter from the ELF list i.e. (a = e), search the orginal phrase array letter by letter and 
			//make the substitution in the copy of that array in each spot the letter occurs.
			for (var i=0 ; i < phraseCopy.length; i++) {
				if (userLetter == phraseCopy[i]) {
					userPhrase = userPhrase.replaceAt(i, replacement);				
				}
			}
       }
       
	  $("#CCChanges").empty();	
	  $("#CCChanges").append(userPhrase + "<br>Recommended changes based on English Language Frequency.");
  });

  });

//Due to the fact Strings are immutable in JavaScript and the built-in function Replace
//doesn't do what is needed [!],  a special function had to be created to 
//actually change letters at a certain index. Thanks Cem! 
//http://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

//Show glyph with a box underneath each letter for user input.
$(document).ready(function(){ //Event Handler to change the [user]Phrase when a textbox is modified
	$("input[type='text']" ).change(function() {
	  // tb0 to tb25
	  
	  var s = Number($(this).attr('id').slice( 2 )) ;//get you the id of the box, remove "tb", just get the number
	  var userLetter = glyph[ s ]; //This is the letter the user wants replaced
	  
	  var replacement = $( this ).val();//gets you the contents of the box -- the letter the user wants userLetter REPLACED WITH

//     Damn RegExp and .Replace completely failed to change the immutable String!

//With a letter from the user i.e. (a = e), search the orginal phrase array letter by letter and 
//make the substitution in the copy of that array in each spot the letter occurs.
		for (var i=0 ; i < phraseCopy.length; i++) {
			if (userLetter == phraseCopy[i]) {
				userPhrase = userPhrase.replaceAt(i, replacement);				
			}
		}

	  $("#CCChanges").empty();
	  $("#CCChanges").append(userPhrase + "<br><br>Replaced: " + userLetter + " With: " + $( this ).val());
	  	  
	});
});

// \\\\\\\\\\\\\\\\\ Under Construction ///////////////////////////


// User Help
$(document).ready(function(){  //In the report area, Show the Alphabetical Counted Array in a formatted table
  $("#help").click(function(){
/* Attempt to use jQuery UI to add information boxes
$(function() {
    $( "#dialog-message" ).dialog({
      autoOpen:false,
      modal: true,
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });
  });
*/
var helpText = "Right. This is your basic Substitution Cypher.\n"+
               "One, and only one, letter substitutes for another.\n"+
               "A=G for example.\n"+
               "Under each letter of the alphabet below is a textbox\n" +
               "for you to substitute another letter in the cypher.\n" +
               "Either hit enter or click in another box to complete\n" +
               "the substitution."
alert(helpText); //Cheap and dirty solution to help the user.


  });
});








//    Code Not Used
/* Visit this code again later for more glyphs
var glyphsPerLine = 20;
var sizeOfGlyphArray = glyph.length;

var thisGlyph = 0;
var fromThisPoint = 0;

//could use while (glyph[thisGlyph]) { stuff; thisGlyph++; }
while (thisGlyph < sizeOfGlyphArray) {
	fromThisPoint = thisGlyph;  //Save where we started
	
	while ((thisGlyph < sizeOfGlyphArray) && (thisGlyph % glyphsPerLine)) {	 	//Check this terminal condition
		$("#OP").append("<td>" + glyph[thisGlyph] + "</td>"); //Produce a table of the phrase symbols
		thisGlyph++;
		//console.log("while: " +thisGlyph % glyphsPerLine);		
	    }
	    
    $("#OP").append("</tr><tr>"); //Check this equality
   
    for (var i=fromThisPoint; i == thisGlyph; i++) { //Produce matching table of textboxes underneath
		$("#OP").append("<td><input class=\"textbox\" type=\'text\' maxlength=\"1\" size=\"1\" id=\"tb" + i + "\" /></td>" );
	}
	
    $("#OP").append("</tr><tr>");
    
}
*/

/*

	for (var i=0; i < glyph.length; i++) { 	
		$("#OP").append("<td>" + glyph[i] + "</td>"); //Produce a table of the phrase symbols
	}

	$("#OP").append("</tr><tr>");

	for (var i=0; i < glyph.length; i++) { //Produce matching table of textboxes underneath
		$("#OP").append("<td><input class=\"textbox\" type=\'text\' maxlength=\"1\" size=\"1\" id=\"tb" + i + "\" /></td>" );
	}
	
	$("#OP").append("</tr></table><br>");
	*/
	

