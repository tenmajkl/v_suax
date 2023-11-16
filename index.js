const chars = [
    '<',
    '>',
    '=',
    '-',
    '/',
    '*',
    '_',
    '\\',
    '!',
    '+',
    '&',
    '^',
    '$',
    '#',
    '@',
    'x',
    'w',
    'o',
];


function visualizer(stream) {
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 128;
    animate(analyser);
}

function animate(analyser) {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < bufferLength; i++) { 

    }
    requestAnimationFrame(() => animate(analyser));
}

let media = navigator.mediaDevices.getUserMedia({ audio: true });
media.then(visualizer);
