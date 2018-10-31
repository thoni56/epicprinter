import { jsPDF } from 'jspdf';


export function printEpicToPdf(key: string, title: string, effort: number, color: string) {
    let doc:jsPDF = new jsPDF({ orientation: 'landscape', units: 'mm', format: 'a4' });

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

    // Color is a HTML RGB string, e.g. #45e922
    const rgb = hexToRgb(color);
    doc.setFillColor(rgb["r"], rgb["g"], rgb["b"]);
    
    while (length > maxLength) {
        doc.rect(x, y, maxLength, height, 'F');
        doc.line(x, y + height, x + maxLength, y + height);
        length -= maxLength;
        y += unit;
    }
    doc.rect(x, y, length, height, 'F');
    doc.text([key, title], marginX + 5, marginY + 13);

    doc.save('epic.pdf');
}

function hexToRgb(hexString:string) {
    let r = Number("0x"+hexString.substr(1,2));
    let g = Number("0x"+hexString.substr(3,2));
    let b = Number("0x"+hexString.substr(5,2));
    return { r: r, g: g, b: b};
}
