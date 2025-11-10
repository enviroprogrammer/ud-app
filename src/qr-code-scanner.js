let scanner;

function success(result) {
    showPlayCardDialog(result);
    scanner.clear();
}

let showScannerDialog = function () {
    let qr = document.getElementById('qr-code-scanner');

    if (qr) {
        qr.show();
    } else {
        ons.createElement('qr-code-scanner.html', {append: true})
            .then(function(dialog) {
                dialog.show();
            })
            .then(() => {
                scanner = new Html5QrcodeScanner(
                    "reader", {
                        fps: 20,
                        qrbox: {
                            width: 250,
                            height: 250
                        },
                        rememberLastUsedCamera: true,
                        supportedScanTypes: [
                            Html5QrcodeScanType.SCAN_TYPE_CAMERA,
                        ],
                        aspectRatio: 1.7777778
                    });
            })
            .then(() => {
                scanner.render(success);
            });
    }

}

let hideScannerDialog = function () {
    let qr = document.getElementById('qr-code-scanner');

    if (qr) {
        qr.hide();
    }
}