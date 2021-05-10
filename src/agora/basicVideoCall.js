// create Agora csilient
import * as AgoraRTC from "./agora-sdk";

var client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

var localTracks = {
  audioTrack: null
};
var remoteUsers = {};
var volumes = {};
// Agora client options
var options = {
  appid: "1641ad012e594e83ae5d2d3dcfc1581d",
  channel: "genel1",
  uid: null,
  token:
    "0061641ad012e594e83ae5d2d3dcfc1581dIACp7xND38gmW62pIuezgtakrSgCcoy5SHICowQtVxP3exbLkvgAAAAAEACOGXX2kOyaYAEAAQCQ7Jpg"
};

export function getVolumes() {
  return volumes;
}

export function getUsers() {
  return client._users;
}

export function getClient() {
  return client;
}

export async function join() {
  // add event listener to play remote tracks when remote user publishs.
  client.on("user-published", handleUserPublished);
  client.on("user-unpublished", handleUserUnpublished);
  client.enableAudioVolumeIndicator(); // Triggers the "volume-indicator" callback event every two seconds.
  client.on("volume-indicator", handleVolume);

  // join a channel and create local tracks, we can use Promise.all to run them concurrently
  [options.uid, localTracks.audioTrack] = await Promise.all([
    // join the channel
    client.join(options.appid, options.channel, options.token || null),
    // create local tracks, using microphone and camera
    AgoraRTC.createMicrophoneAudioTrack()
  ]);

  await client.publish(Object.values(localTracks));
  console.log("publish success");
}

export async function leave() {
  for (const trackName in localTracks) {
    var track = localTracks[trackName];
    if (track) {
      track.stop();
      track.close();
      localTracks[trackName] = undefined;
    }
  }

  // remove remote users and player views
  remoteUsers = {};

  // leave the channel
  await client.leave();
  console.log("client leaves channel success");
}

async function subscribe(user, mediaType) {
  const uid = user.uid;
  // subscribe to a remote user
  await client.subscribe(user, mediaType);
  console.log("subscribe success");
  if (mediaType === "video") {
    // user.videoTrack.play(`player-${uid}`);
  }
  if (mediaType === "audio") {
    user.audioTrack.play();
  }
}

function handleUserPublished(user, mediaType) {
  const id = user.uid;
  remoteUsers[id] = user;
  subscribe(user, mediaType);
}

function handleUserUnpublished(user) {
  const id = user.uid;
  delete remoteUsers[id];
}

function handleVolume(vols) {
  vols.forEach((volume) => {
    volumes[volume.uid] = volume.level;
  });
}
