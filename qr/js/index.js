var isiPhoneXSeries = () => {
    var isiPhone = /iPhone/.test(window.navigator.userAgent);

    var isiPhoneXorXs = window.devicePixelRatio === 3 && (window.screen.width === 375 || window.screen.height === 375);
    var isiPhoneXsMax = window.devicePixelRatio === 3 && (window.screen.width === 414 || window.screen.height === 414);
    var isiPhoneXR = window.devicePixelRatio === 2 && (window.screen.width === 414 || window.screen.height === 414);

    return isiPhone && (isiPhoneXorXs || isiPhoneXsMax || isiPhoneXR);
};

function getCookie() {
    var qrText = $.cookie('qr-text');
    if (qrText !== undefined && qrText.length !== 0) {
        $('#qr-setting').text(qrText);
        $('#qr-text').val(qrText);
    }

    var qrSize = $.cookie('qr-size');
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
    var qrText = Encoding.convert($('#qr-text').val(), 'SJIS');
    var qrSize = $('#qr-size').val();
    $('#qrcode').empty();
    $('#qrcode').qrcode({
        height: qrSize,
        width: qrSize,
        text: qrText
    });
    var padding = qrSize / 25 * 4;
    $('#qrcode').css('padding', padding + 'px');
    $('#qrcode').css('padding-bottom', padding - 5 + 'px');
}

function initRange() {
    var bodyWidth = $('body').innerWidth();
    var maxWidth = bodyWidth * 25 / 34;
    $('#qr-size').attr('max', maxWidth);
    $('#qr-range').attr('max', maxWidth);
    var rangeVal = $('#qr-size').val();
    if (maxWidth < rangeVal) {
        $('#qr-size').val(maxWidth);
        $('#qr-range').val(maxWidth);
    }
}

$(function() {
    if (isiPhoneXSeries()) {
        $('#inputs').css('bottom', '34pt');
    }

    getCookie();

    initRange();
    makeQrCode();
});

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