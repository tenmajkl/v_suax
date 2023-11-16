function visualizer(stream) {
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
        console.log(dataArray[i]);
    }
}

let media = navigator.mediaDevices.getUserMedia({ audio: true });
media.then(visualizer)
