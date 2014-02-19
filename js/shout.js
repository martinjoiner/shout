
var arrEmoCats =[
 	{
		"name": "Negative and forceful", 
		"arrEmotions": ["Anger","Annoyance","Contempt","Disgust","Irritation" ]
	},
	{ 
		"name": "Negative and not in control",
		"arrEmotions": [ "Anxiety","Embarrassment","Fear","Helplessness","Powerlessness","Worry" ]
	},
	{
		"name": "Negative thoughts",
		"arrEmotions": [ "Doubt","Envy","Frustration","Guilt","Shame" ]
	},
	{
		"name": "Negative and passive",
		"arrEmotions": [ "Boredom","Despair","Disappointment","Hurt","Sadness" ]
	},
	{
		"name": "Agitation",
		"arrEmotions": [ "Stress","Shock","Tension" ]
	},
	{
		"name": "Positive and lively",
		"arrEmotions": [ "Amusement","Delight","Elation","Excitement","Happiness","Joy","Pleasure" ]
	},
	{
		"name": "Caring",
		"arrEmotions": [ "Affection","Empathy","Friendliness","Love" ]
	},
	{
		"name": "Positive thoughts",
		"arrEmotions": [ "Courage","Hope","Pride","Satisfaction","Trust" ]
	},
	{
		"name": "Quiet positive",
		"arrEmotions": [ "Calm","Content","Relaxed","Relieved","Serene" ]
	},
	{
		"name": "Reactive",
		"arrEmotions": [ "Interest","Politeness","Surprised" ]
	}
];

var objData = {};
objData['keys'] = [ 'Emotion', 'TensionLevel', 'Gathering', 'Place' ];

objData['arrEmotion'] 		= [];

// Levels of tension that a character can hold
objData['arrTensionLevel'] 	= 	[ '1: Jellyfish', '2: Dude', '3: Neutral', '4: Formal', '5: Alert', '6: Bomb?', '7: Total Doom' ];

// Reasons for a group of people to be in the same place
objData['arrGathering'] 	= 	[ 
									'Wedding', 'Funeral', 'Christening', 'Concert', 'Office party', 'Xmas', 'School disco', 'Retirement', 'Bar Mitzvah', 'Birthday', 'Auction', 
									'Protest', 'Royal visit', 'Sports Event', 'Family Dinner', 'Graduation' 
								];

// These are all archetypal locations 
objData['arrPlace'] 		= 	[ 	'Swimming Pool', 'Park', 'Beach', 'Office', 'Butchers', 'Theme Park', 'Countryside', 'School', 'Zoo', 'Police Station', 'Fire Station', 
									'A & E', 'Ski slope', 'Factory', 'Garden Centre', 'Supermarket', 'Restaurant', 'Farm', 'Library', 'University', 'Doctors', 'Shop', 'Gym',
									'Showroom', 'Cinema', 'Airport', 'Train Station', 'Motorway Services', 'Canteen', 'Oil rig', 'Cruise ship', 'Power station', 'Call centre'
								];

// These are things that people are doing
objData['arrVerb'] 			= 	[ 	'Judging', 'Seeking', 'Navigating', 'Peeling', 'Digging', 'Polishing' ];


var populateArrAllEmotions = (function(){
	var cnt = 0;
	arrEmoCats.forEach( function(thisCat){
		thisCat.arrEmotions.forEach( function(thisEmotion){
			objData['arrEmotion'][cnt] = {};
			objData['arrEmotion'][cnt]['name'] = thisEmotion;
			objData['arrEmotion'][cnt]['class'] = thisCat['name'].replace(/ /g,'').toLowerCase();
			cnt++;
		});
	});
})();

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$('#btnGenerate').click( function(){
	var html = '';
	var cssClass = 'unemotional'
	var intRand = 0;

	objData['keys'].forEach( function(thisKey){

		if( $( '#' + thisKey ).is(":checked") ){
			intRand = getRandomInt(0, objData[ 'arr' + thisKey ].length-1);
			var thisThing = objData[ 'arr' + thisKey ][intRand];

			html += '<div class="suggestion">';
			if( typeof thisThing === 'object' ){
				cssClass = thisThing['class'];
				html += thisThing['name'];
			} else {
				html += thisThing;
			}
			html += '</div>';
		}

	});
	
	$('#result').html( html ).attr('class',cssClass);
});

$('#btnGenerate').click();


