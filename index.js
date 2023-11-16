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
    analyser.fftSize = 32;
    animate(analyser);
}

let prev = [];

function animate(analyser) {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    let freq_range = 0;
    let freq = 0;
    for (let i = 0; i < bufferLength; i++) { 
        if (i % (bufferLength / 8) == 0 && i != 0) {
            let value = (freq / bufferLength / 8);
            if (value < 2 || Math.abs(prev[freq_range] - value) < 8) {
                continue;
            }
            prev[freq_range] = value;
            value = (value - 2) * 10
            let doc = document.getElementById('char'+freq_range);
            doc.innerText = chars[(Math.round(value) % chars.length)];
            doc.classList.value = 'text-violet-' + ((freq % 4) * 100 + 500)
            freq_range++;
        }
        freq += dataArray[i];
    }
    prev = dataArray;
    requestAnimationFrame(() => animate(analyser));
}

let media = navigator.mediaDevices.getUserMedia({ audio: true });
media.then(visualizer);
