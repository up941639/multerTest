async function getFiles() {
    const response = await fetch('/files');

    if (response.ok) {
        console.log('got files');
        const uploads = await response.json();
        console.log(uploads);
        return uploads;
    } else {
        return 'could not get files';
    }
}

async function showFiles() {
    const files = await getFiles();
    console.log(files);
    for (const file of files) {
        const clone = document.querySelector('#fileTemp').content.cloneNode(true);
        const p = clone.querySelector('#someText');
        const a = clone.querySelector('#download');
        p.textContent = file.text;
        a.href = file.fileName;
        document.body.append(clone);
    }
}

async function postFile() {
    const payload = new FormData();
    const text = document.querySelector('#uploadText');
    const file = document.querySelector('#file');
    payload.append('text',  text.value);
    payload.append('pdfFile', file.files[0]);

    const response = await fetch('/upload', {
        method: 'POST',
        body: payload,
        },
    );
}

function addEventListeners() {
    document.querySelector('#btn').addEventListener('click', postFile);
}

function loaded() {
    addEventListeners();
    showFiles();
}

window.addEventListener('load', loaded);
