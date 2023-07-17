# Welcome to Watch With Me

Created a web app for watching youtube video with friends where one can start a youtube video and create a shareable link which others can join and watch together similar to how apple's shareplay work.

## Screenshots

📌 Home Page

![Screenshot (51)](https://github.com/divyanshkumarworks/watch-with-me/assets/134360630/5fbd5cd8-ea44-45dc-994c-ab2f4c52745a)

📌 Create New Session Page

![Screenshot (52)](https://github.com/divyanshkumarworks/watch-with-me/assets/134360630/fec698cf-7944-4314-b500-284344813450)

📌 Start Session Page

![Screenshot (54)](https://github.com/divyanshkumarworks/watch-with-me/assets/134360630/9baae247-8c2e-4d82-b262-ed6e07f7d139)


## Introduction

This project uses Sendbird chat sdk on frontend to send youtube player events to a sendbird open channel, others with the link subscribes to this channel and receive player events which is used to synchronize the youtube video on their end. IFrame player API for embedding youtube player on UI which lets you control the player and subscribe to its events.

### What is SendBird SDK?

A suite of tools and resources designed for building and managing real-time chat experiences. It covers the necessities for developers to seamlessly integrate chat functionality into their application.The Sendbird Chat SDK for JavaScript allows you to add real-time chat into your client app with minimal effort. Sendbird offers a feature rich, scalable, and proven chat solution depended on by companies like Reddit, Hinge, PubG and Paytm. With Sendbird Chat for JavaScript, you can easily build an in-app chat with all the essential messaging features. The Chat SDK v4 supports both TypeScript and JavaScript.

This project uses sendbird chat sdk with javascript but you can use this sdk on some other languages as well. You can find more infromation at:  [https://docs.sendbird.com/docs/chat](https://docs.sendbird.com/docs/chat).

### Youtube IFrame Player API

- The YouTube Android Player API enables you to incorporate video playback functionality into your Android applications. <br>
- The API defines methods for loading and playing YouTube videos (and playlists) and for customizing and controlling the video playback experience.<br>
- Using the API, you can load or cue videos into a player view embedded in your application’s UI. You can then control playback programmatically. For example, you can play, pause, or seek to a specific point in the currently loaded video.<br>
- You can also register event listeners to get callbacks for certain events, such as the player loading a video or the player state changing. Finally, the API

## Features
* Adapts to quality as per the bandwidth
* Supports Live Stream videos
* Supports captions
* No need for API Key
* Supports changing playback rate
* Supports custom controls
* Exposes builders for building custom controls
* Retrieves video meta data
* Inline Playback

## API reference

| Property             |                          Type                           | Description                                                                                           |
| :------------------- | :-----------------------------------------------------: | :---------------------------------------------------------------------------------------------------- |
| videoId(required)    |                         string                          | Youtube video Id                                      |                                                                  
| style                |                         object                          | You can pass this to override some default styles                                                     |
| onStart              |                       () => void                        | Execute a function on start and send play message on sendbird chat sdk                                                                           |
| onPause              |                       () => void                        | Execute a function on pause and send a pause message to sendbird chat sdk                                                                           |
| onDurationReady      |                   (s: number) => void                   | Execute a function when the duration is ready                                                         |
| onPlaybackRateChange |                        () =>void                        | Execute a function when the playback rate will actually change                                        |
| onEnd                |                       () => void                        | Execute a function on end                                                                             |
| onError              |                       () => void                        | Execute a function on error   


