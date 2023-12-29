import * as dayjs from "dayjs";

export const FileExcelDownload = (res: any, excelName?: string) => {
    const name = excelName || '导出';
    const nowTime = dayjs().format('YYYY-MM-DD');
    const blob = new Blob([res]);
    const objectURL = URL.createObjectURL(blob);
    const btn = document.createElement('a');
    const body = document.querySelector('body');
    if (body) {
        body.appendChild(btn);
    }
    btn.download = `${name}-${nowTime}.xlsx`;
    btn.href = objectURL;
    btn.click();
    if (body) {
        body.removeChild(btn); // 删除标签
    }
};

export const FileDownload = (res: any, excelName?: string) => {
    const name = excelName || '导出';
    const nowTime = dayjs().format('YYYY-MM-DD');
    const blob = new Blob([res]);
    const objectURL = URL.createObjectURL(blob);
    const btn = document.createElement('a');
    const body = document.querySelector('body');
    if (body) {
        body.appendChild(btn);
    }
    btn.download = `${name}-${nowTime}.zip`;
    btn.href = objectURL;
    btn.click();
    if (body) {
        body.removeChild(btn); // 删除标签
    }
};
