/* Game state as global object */
let game_state = {
    // variable storing which contender is the Player
    player_index: null,     // Not set yet

    // variable storing which contenders are the opponents
    opponent_index: null, // Not set yet

    // Is a game in progress?
    game_over: false
};


// In this data structure, store whether this is the player's character?
class Contender {
    /* Players and Opponents are both Contenders */
    constructor(html_id, name, health_points, atk_pwr, ctr_atk_pwr) {
	this.html_id       = html_id;       // Corresponds to HTML doc
	this.name          = name;
	this.health_points = health_points;
	this.atk_pwr       = atk_pwr;       // Attack power
	this.ctr_atk_pwr   = ctr_atk_pwr;   // Counter-attack power

	/* I can store links to pictures and stuff here too */
    }

    /* Maybe add some more getter & setter functions */

    get isAlive() {
	return this.health_points > 0 ? true : false;
    }
};

// Make some contenders
let contenders = new Array(4);
contenders[0] = new Contender("no0", "Donald Trump", 100, 100, 100);
contenders[1] = new Contender("no1", "Bernie Sanders", 100, 100, 100);
contenders[2] = new Contender("no2", "Andrew Yang", 100, 100, 100);
contenders[3] = new Contender("no3", "Elizabeth Warren", 100, 100, 100);

/* Entry point into game */
$(document).ready(() => {
    $('#attack_button').on('click', () => {
			   attack(contenders[game_state.player_index],
				  contenders[game_state.opponent_Index])
    });
    $('#reset_button').on('click', reset);
    setup();
});



/* Print a message to the message area*/
function print(message) {
    let to_log = $('<li></li>').text($('#message_area').text());
    $('#message_area').empty();
    $('#message_area').append( $('<p></p>').text(message));
    $('#log_area_messages').append(to_log);
}

function benchHandler(index) {
    /* Index is to Contender in contenders array */
    /* Depending on the game_state, call different functions as appropriate */
    if (game_state.player_index === null) {
	game_state.player_index = index;
	print(`You are now playing as ${contenders[index].name}`);

	/* Remove selected contender from bench; update player area  */
	$('#' + contenders[index].html_id).remove();
	$('#player_area_display')
	    .append( $('<p></p>').text(contenders[index].name));

    } else if (game_state.opponent_index === null) {
	game_state.opponent_index = index;
	print(`Your opponent is now ${contenders[index].name}`);
	
	/* Remove selected contender from bench; update player area  */
	$("#" + contenders[index].html_id).remove();
	$('#opponent_area_display')
	    .append( $('<p></p>').text(contenders[index].name));

    } else {
	print(`Keep calm and click on... Index: ${index}`);
    }
}

function choosePlayer() {
    /* Check game_state to see if the player has already chosen a contender */
    /* If there is no player selected yet,
       Add click event to all on the bench
     */
}

function chooseOpponent() {
    print("Please choose a contender to play against from the Bench");
    /* Check if there are any opponents left to choose from */
}

function attack(player, opponent) {
    if (game_state.player_index === null
	|| game_state.opponent_index === null) {
	print("You can't attack until you select a PLAYER and an OPPONENT.");
    } else {
	print("You attack!");
    }
    /* If opponent is not defeated, allow opponent to counterAttack */
}

function counterAttack(player, opponent) {
    // User should not call this function directly
    ;
}

function setup() {
    print("Setting up game...");

    // Create a div for each contender
    contenders.forEach( (contender, index) => {
	var contender_to_add = $('<div></div>')
	    .attr("id", contender.html_id)
	    .text(contender.name)
	    .addClass("benched")        // Classes for easy selection
	    .on("click", () => benchHandler(index)); // testing...

	// Move all contenders to the bench (we haven't selected roles yet)
	$('#waiting_bench').append(contender_to_add);
    });

    print("Done!");

    // Player must first choose a character (Contender)
    game_state.player_index   = null;
    game_state.opponent_index = null;
    game_state.game_over      = false;
    print("Please choose a contender to play as from the Bench.");

    // Player must then select an opponent
}

function reset() {
    /* Clear UI */
    $('#player_area_display').empty();       /* Clear Player (card) */
    $('#opponent_area_display').empty();     /* Clear Opponent (card) */
    $('#waiting_bench').empty();     /* Clear Bench */
    $('#message_area').empty();
    $('#log_area_messages').empty(); /* Clear Battle Log*/

    /* Reset game logic */
    setup();
}
