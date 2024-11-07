const getScreenMedia = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    return mediaStream;
  } catch (error) {
    console.error(error);
  }
};

const getAudioMedia = async () => {
  try {
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    return audioStream;
  } catch (error) {
    console.error(error);
  }
};

const mergeStreams = (screenStream, audioStream) => {
  const mergedStream = new MediaStream();
  for (const stream of screenStream.getTracks()) {
    mergedStream.addTrack(stream);
  }
  for (const stream of screenStream.getTracks()) {
    mergedStream.addTrack(stream);
  }

  return mergedStream;
};

const startRecord = (mergedStream) => {
  const options = { mimeType: 'video/webm' };
  const recorder = new MediaRecorder(mergedStream, options);

  let recordedChunks = [];

  recorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  recorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recordScreen.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  recorder.start();
  return recorder;
};

const recordScreenAndAudio = async () => {
  const screenStream = await getScreenMedia();
  const audioMedia = await getAudioMedia();
  const mergedStream = mergeStreams(screenStream, audioMedia);
  const recorder = startRecord(mergedStream);
  return recorder;
};

export default recordScreenAndAudio;
