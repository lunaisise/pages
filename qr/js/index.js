if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', {scope: './'})
        .then(reg => {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        })
        .catch(error => {
            console.log('Registration failed with ' + error);
        });
}

window.addEventListener('DOMContentLoaded', () => {
    const isiPhoneXSeries = (() => {
        const isiPhone = /iPhone/.test(window.navigator.userAgent);

        const isiPhoneXorXs = window.devicePixelRatio === 3 && (window.screen.width === 375 || window.screen.height === 375);
        const isiPhoneXsMax = window.devicePixelRatio === 3 && (window.screen.width === 414 || window.screen.height === 414);
        const isiPhoneXR = window.devicePixelRatio === 2 && (window.screen.width === 414 || window.screen.height === 414);

        return isiPhone && (isiPhoneXorXs || isiPhoneXsMax || isiPhoneXR);
    })();

    const qrTextElem = document.querySelector('#qr-text');
    const qrText = () => {
        const text = qrTextElem.value;
        document.querySelector('#qr-setting').textContent = text;
        Cookies.set('qr-text', text, {expires: 7, path: ''});
        return text;
    };
    const qrSizeElem = document.querySelector('#qr-size');
    const qrRangeElem = document.querySelector('#qr-range');
    const qrSize = () => {
        const size = qrSizeElem.value;
        qrRangeElem.value = size;
        Cookies.set('qr-size', size, {expires: 7, path: ''});
        return size;
    };

    let qrcode;

    function makeQrCode() {
        const text = qrText();
        const size = qrSize();
        const qrcodeElem = document.querySelector('#qrcode');
        qrcodeElem.textContent = '';
        qrcode = new QRCode(qrcodeElem, {
            text: text,
            width: size,
            height: size,
            correctLevel: QRCode.CorrectLevel.H
        });
        const padding = size / 25 * 4;
        qrcodeElem.style.padding = `${padding}px`;
    }

    function init() {
        const textCookie = Cookies.get('qr-text');
        if (textCookie !== undefined) {
            qrTextElem.value = textCookie;
        }
        const sizeCookie = Cookies.get('qr-size');
        if (sizeCookie !== undefined) {
            qrSizeElem.value = sizeCookie;
        }
    }

    function initRange() {
        const bodyWidth = document.documentElement.clientWidth;
        const maxWidth = bodyWidth * 25 / 34;
        qrSizeElem.setAttribute('max', maxWidth);
        qrRangeElem.setAttribute('max', maxWidth);
        const rangeVal = qrSizeElem.value;
        if (maxWidth < rangeVal) {
            qrSizeElem.value = maxWidth;
            qrRangeElem.value = maxWidth;
        }
    }

    if (isiPhoneXSeries) {
        document.querySelector('#inputs').style.bottom = '34pt';
    }

    init();

    initRange();
    makeQrCode();

    window.addEventListener('resize', () => {
        initRange();
        makeQrCode();
    });

    const knobElem = document.querySelector('#knob');
    knobElem.addEventListener('click', () => {
        if (knobElem.dataset.status === 'open') {
            document.querySelector('#inputs').style.height = 'calc(2rem + 1px)';
            knobElem.dataset.status = 'close';
            knobElem.textContent = '∧';
        } else {
            document.querySelector('#inputs').style.height = '190px';
            knobElem.dataset.status = 'open';
            knobElem.textContent = '∨';
        }
    });

    const qrTextfunc = () => {
        const m = qrTextElem.value.match(/([\s\S]*[^!-~\s])[!-~]+$/);
        if (m) {
            qrTextElem.value = m[1];
            alert('2バイト文字に続けて1バイト文字を入力することはできません。');
        }
        makeQrCode();
    };
    qrTextElem.addEventListener('change', () => {
        qrTextfunc();
    });
    qrTextElem.addEventListener('keyup', () => {
        qrTextfunc();
    });

    const qrSizefunc = () => {
        makeQrCode();
    };
    qrSizeElem.addEventListener('change', () => {
        qrSizefunc();
    });
    qrSizeElem.addEventListener('input', () => {
        qrSizefunc();
    });

    const qrRangefunc = () => {
        qrSizeElem.value = qrRangeElem.value;
        makeQrCode();
    };
    qrRangeElem.addEventListener('change', () => {
        qrRangefunc();
    });
    qrRangeElem.addEventListener('input', () => {
        qrRangefunc();
    });
});