if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (error) => {
            console.error('ServiceWorker registration failed: ', error);
        });
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

    function getCookie() {
        const qrText = $.cookie('qr-text');
        if (qrText !== undefined && qrText.length !== 0) {
            $('#qr-setting').text(qrText);
            $('#qr-text').val(qrText);
        }

        const qrSize = $.cookie('qr-size');
        if (qrSize !== undefined) {
            $('#qr-size').val(qrSize);
            $('#qr-range').val(qrSize);
        }
    }

    function setCookie() {
        $.cookie('qr-text', $('#qr-text').val(), {expires: 7});
        $.cookie('qr-size', $('#qr-size').val(), {expires: 7});
    }

    function makeQrCode() {
        const qrText = Encoding.convert($('#qr-text').val(), 'SJIS');
        const qrSize = $('#qr-size').val();
        $('#qrcode').empty();
        $('#qrcode').qrcode({
            height: qrSize,
            width: qrSize,
            text: qrText
        });
        const padding = qrSize / 25 * 4;
        $('#qrcode').css('padding', `${padding}px`);
        const paddingBottom = padding - 5;
        $('#qrcode').css('padding-bottom', `${paddingBottom}px`);
    }

    function initRange() {
        const bodyWidth = $('body').innerWidth();
        const maxWidth = bodyWidth * 25 / 34;
        $('#qr-size').attr('max', maxWidth);
        $('#qr-range').attr('max', maxWidth);
        const rangeVal = $('#qr-size').val();
        if (maxWidth < rangeVal) {
            $('#qr-size').val(maxWidth);
            $('#qr-range').val(maxWidth);
        }
    }

    if (isiPhoneXSeries) {
        $('#inputs').css('bottom', '34pt');
    }

    getCookie();

    initRange();
    makeQrCode();

    $(window).on('resize', function() {
        initRange();
        makeQrCode();
    });

    $('#knob').on('click', function() {
        if ($(this).data('status') == 'open') {
            $('#inputs').css('height', 'calc(2rem + 1px)');
            $(this).data('status', 'close').text('∧');
        } else {
            $('#inputs').css('height', '190px');
            $(this).data('status', 'open').text('∨');
        }
    });

    $('#qr-text').on('change, keyup', function() {
        $('#qr-setting').text($(this).val());
        makeQrCode();
        setCookie();
    });

    $('#qr-size').on('change, input', function() {
        $('#qr-range').val($(this).val());
        makeQrCode();
        setCookie();
    });

    $('#qr-range').on('change, input', function() {
        $('#qr-size').val($(this).val());
        makeQrCode();
        setCookie();
    });
});