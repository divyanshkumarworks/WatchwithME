
// Initialize the SendBird SDK
const sb = new SendBird({ appId: '66527459-9D1A-4A7E-935C-304CF6B7E5C9' });

const params = new sb.UserMessageParams();

var user_id;
var channel_id;

//for loading video on shared link
const queryString = window.location.search;
console.log("querystring", queryString);

if (queryString.includes('youtubeId')) {
	create_button = document.getElementById('create');
	create_button.innerText = "HomePage";
	create_button.classList.remove('btn-secondary');
	create_button.classList.add('btn-danger');
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function createNewChannel() {

	sb.connect('132918', '07855cf178ef7c0e479c2df4ddb656c5855effa8', (user, error) => {
	  if (error) {
	    console.error('SendBird connection error:', error);
	  } else {
	    console.log('SendBird connected as', user.userId);

	    const params = new sb.OpenChannelParams();
	    params.name = uuidv4();
	    sb.OpenChannel.createChannel(params, (channel, error) => {
	      if (error) {
	        console.error('Error creating open channel:', error);
	      } else {
	      	console.log('retrieved channel:', channel);

	      	current_url = window.location.href;
	      	var url = new URL(current_url);
			url.searchParams.set('channelName', channel.url);
			url_input = document.getElementById('url').value;
			videoId = YouTubeGetID(url_input);
			console.log(videoId);
			url.searchParams.set('youtubeId', videoId);
			console.log("current_url", url);
			copyToClipboard(url)
			connectToSendbird(channel.url);
	      }
      	});
	  }
  	});
}

function connectToSendbird(channelName) {
	var randomId = function(length = 6) {
	  return Math.random().toString(36).substring(2, length+2);
	};
	var user_id = randomId()
	console.log(user_id);	

	// Establish a connection with SendBird
	sb.connect(user_id, (user, error) => {
	  if (error) {
	    console.error('SendBird connection error:', error);
	  } else {
	    console.log('SendBird connected as', user.userId);
	    // You can now interact with SendBird here
	     // Create an open channel

	    console.log(channelName);
	    sb.OpenChannel.getChannel(channelName, (channel, error) => {
	      if (error) {
	        console.error('Error creating open channel:', error);
	      } else {
	      	channel.enter();
	        console.log('retrieved channel:', channel);
	        const senderChannelUrl = channel.url;
	    	console.log('Sender channel URL:', senderChannelUrl);

	  		const channelHandler = new sb.ChannelHandler();
	  		channelHandler.onMessageReceived = (channel, message) => {
			        var received_msg = message.message;
			        console.log('Message received successfully:', received_msg);
			        onMessage(received_msg);
			    }

	  		sb.addChannelHandler("myhandler", channelHandler);
	      }
	    });

	    window.sendPlay = () => {
	    	console.log(channelName);
	    	sb.OpenChannel.getChannel(channelName, (channel, error) => {
		      if (error) {
		        console.error('Error creating open channel:', error);
		      } else {
		      	channel.enter();
				console.log("inside sendPlay")

			  	params.message = "play";

				channel.sendUserMessage(params, (message, error) => {
				    if (error) {
				      console.error(error);
				    } else {
				      console.log('Message sent successfully:', message.message);
				    }
			  	});
		  	  }
	  	  	});	
		}

		window.sendPause = () => {
	    	sb.OpenChannel.getChannel(channelName, (channel, error) => {
		      if (error) {
		        console.error('Error creating open channel:', error);
		      } else {
		      	channel.enter();
				console.log("inside sendPause")

			  	params.message = "pause";

				channel.sendUserMessage(params, (message, error) => {
				    if (error) {
				      console.error(error);
				    } else {
				      console.log('Message sent successfully:', message.message);
				    }
			  	});
		  	  }
	  	  	});	
		}

		window.sendDuration = (duration) => {
	    	sb.OpenChannel.getChannel(channelName, (channel, error) => {
		      if (error) {
		        console.error('Error creating open channel:', error);
		      } else {
		      	channel.enter();
				console.log("inside sendPlay")

			  	params.message = "duration" + duration.toString();

				channel.sendUserMessage(params, (message, error) => {
				    if (error) {
				      console.error(error);
				    } else {
				      console.log('Message sent successfully:', message.message);
				    }
			  	});
		  	  }
	  	  	});	
		}

		window.sendVolume = (volume) => {
	    	sb.OpenChannel.getChannel(channelName, (channel, error) => {
		      if (error) {
		        console.error('Error creating open channel:', error);
		      } else {
		      	channel.enter();
				console.log("inside sendPlay")

			  	params.message = "volume" + volume.toString();

				channel.sendUserMessage(params, (message, error) => {
				    if (error) {
				      console.error(error);
				    } else {
				      console.log('Message sent successfully:', message.message);
				    }
			  	});
		  	  }
	  	  	});	
		}
	  }
	});
}

function displayHomePage() {
	if (!queryString.includes('youtubeId')) {
		form_div = document.getElementById('form');
		form_div.style.visibility = "hidden";
	}
	home_container = document.getElementById('home-container');
	home_container.style.visibility = "visible";
	player_buttons = document.getElementById('play-pause-button')
	player_buttons.style.visibility = "hidden";
	duartion_bar = document.getElementById('duration-bar');
	duartion_bar.style.visibility = "hidden";
	back_button = document.getElementById('back-button');
	back_button.style.visibility = "hidden";
	player_div = document.getElementById('player');
	player_div.style.visibility = "hidden";
}

function displayStartSession() {
	if (queryString.includes('youtubeId')) {
		loadOtherPlayer();
		home_container = document.getElementById('home-container');
		home_container.style.visibility = "hidden";
		embedYTVideo();
		player_buttons = document.getElementById('play-pause-button')
		player_buttons.style.visibility = "visible";
		duartion_bar = document.getElementById('duration-bar');
		duartion_bar.style.visibility = "visible";
		back_button = document.getElementById('back-button');
		back_button.style.visibility = "visible";

	}else {
		alert("this page was not opened using shared link!")
	}
}

function displayCreateSession() {
	if (queryString.includes('youtubeId')) {
		window.location.href = "https://divyanshkumarworks.github.io/divyanshkumarworks/";
	}
	else{
		form_div = document.getElementById('form');
		form_div.style.visibility = "visible";
		home_container = document.getElementById('home-container');
		home_container.style.visibility = "hidden";
		embedYTVideo();
		player_buttons = document.getElementById('play-pause-button')
		player_buttons.style.visibility = "visible";
		duartion_bar = document.getElementById('duration-bar');
		duartion_bar.style.visibility = "visible";
		back_button = document.getElementById('back-button');
		back_button.style.visibility = "visible";
	}
}


function loadOtherPlayer() {
	var urlParams = new URLSearchParams(queryString);
	var channelName = urlParams.get('channelName')
	var ytid = urlParams.get('youtubeId')
	connectToSendbird(channelName);
	embedYTVideo();
	player.loadVideoById({videoId:ytid});
	player.stopVideo();

}

let form = document.getElementById("form");
 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  url = document.getElementById("url").value;
  console.log(url);
  embedYTVideo();
  videoId = YouTubeGetID(url);
  console.log(typeof(videoId));
  youTubePlayerChangeVideoId(videoId);
});

function embedYTVideo() {
	player_div = document.getElementById('player');
	player_div.style.visibility = "visible";
}

var player;

function onYouTubeIframeAPIReady() {
  console.log('api is loaded');

  player = new YT.Player("player", {
    height: 500,
    width: 900,
    videoId: "",
    playerVars: {
      playsinline: 1,
      autoplay: 0,
      controls: 0,
      enablejsapi: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  console.log(player);
}

function onPlayerReady(event) {
    console.log("Youtube Player is Ready");
    if(queryString.includes('youtubeId')) {
    }
}

var done = false;
var seek = false;

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
    setInterval(updateDuration, 300);
  	if (!seek) {
  		player.seekTo(0, true);
  		seek = true;

  	}
  }
}

function updateDuration() {
  var currentTime = player.getCurrentTime();
  var duration = player.getDuration();
  var progress = (currentTime / duration) * 100;

  duration = document.getElementById("YouTube-player-progress");
  duration.value = progress;
}

function onMessage(msg) {
	if ( msg === "play") {
		console.log("inside onMessage play");
    	playVideo();
    }
    else if ( msg === "pause") {
    	console.log("inside onMessage pause");
    	pauseVideo();	
    }
    else if (msg.includes("duration")) {
    	currentTime = msg.substring(8);
    	youTubePlayerCurrentTimeChange(currentTime);
    }
    else if (msg.includes("volume")) {
    	currentVolume = msg.substring(6);
    	youTubePlayerVolumeChange(currentVolume);
    }
    else {
    	;
    }
}

function pauseVideo() {
  console.log(player);
  player.pauseVideo();
}
function playVideo() {
  console.log(player);
  player.playVideo();
}

function youTubePlayerVolumeChange(volume) {
        player.setVolume(volume);
        volume_e = document.getElementById("YouTube-player-volume");
		volume_e.value = volume;
}

function youTubePlayerCurrentTimeChange(currentTime) {

    player.currentTimeSliding = false;
    player.seekTo(currentTime*player.getDuration()/100, true);
    
}

function youTubePlayerCurrentTimeSlide() {
    player.currentTimeSliding = true;
}

function YouTubeGetID(url) {
  var ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

function youTubePlayerChangeVideoId(videoId) {
  player.cueVideoById({ videoId: videoId });
  player.pauseVideo();
}

