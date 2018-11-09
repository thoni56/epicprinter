import { jsPDF } from 'jspdf';

declare var window: any;

export function printEpicToPdf(key: string, title: string, effort: number, color: string) {
    let doc: jsPDF = new jsPDF({ orientation: 'landscape', units: 'mm', format: 'a4' });

    const marginX = 10;
    const marginY = 10;
    const unit = 30;
    const paperWidth = 297;
    const paperHeight = 210;
    const maxLength = paperWidth - 2 * marginX;
    const maxCount = Math.floor((paperHeight - 2 * marginY) / unit);

    let length = effort;
    let height = unit;
    let x = marginX;
    let y = marginY;

    // Scale to max width of 300 effort points
    const maxEffortWidth = 300;
    const scale = (paperWidth - marginX - marginY) / maxEffortWidth;

    // Color is a HTML RGB string, e.g. #45e922
    const rgb = hexToRgb(color);
    doc.setFillColor(rgb["r"], rgb["g"], rgb["b"]);

    while (length > maxEffortWidth) {
        doc.rect(x, y, maxEffortWidth * scale, height, 'F');
        doc.line(x, y + height, x + maxEffortWidth * scale, y + height);
        length -= maxEffortWidth;
        y += unit;
    }
    doc.rect(x, y, length * scale, height, 'F');
    doc.text([key, title, "Effort: " + effort.toString()], marginX + 5, marginY + 10);

    showPDF(doc);
}

function showPDF(doc: any) {
    // Show PDF in new tab, even in Chrome, thanks to https://stackoverflow.com/a/17861611/204658

    var string = doc.output('datauristring');
    var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
}

function hexToRgb(hexString: string) {
    let r = Number("0x" + hexString.substr(1, 2));
    let g = Number("0x" + hexString.substr(3, 2));
    let b = Number("0x" + hexString.substr(5, 2));
    return { r: r, g: g, b: b };
}
