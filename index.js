const canvas = document.getElementById("plane");
const ctx = canvas.getContext("2d");

const center = [canvas.width /2, canvas.height / 2];

function visualizer(stream) {
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 1024;
    animate(analyser);
}

function animate(analyser) {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    let index;
    let x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#4c1d95";
    ctx.beginPath();
    ctx.moveTo(0, center[1])
    for (index = 0; index < bufferLength; index++) { 
        ctx.lineTo(index, dataArray[index] - center[1]);
    }

    ctx.stroke();
    
    requestAnimationFrame(() => animate(analyser));
}

let media = navigator.mediaDevices.getUserMedia({ audio: true });
media.then(visualizer);
