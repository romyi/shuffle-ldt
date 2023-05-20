import { Template, BLANK_PDF } from "@pdfme/generator";

export const font = {
  mcw: {
    data: await fetch(`${import.meta.env.VITE_ORIGIN}/mcw_bold.woff`).then(
      (res) => res.arrayBuffer()
    ),
    fallback: true,
  },
};

export const template: Template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      a: {
        fontName: "mcw",
        type: "text",
        position: { x: 10, y: 10 },
        width: 30,
        height: 30,
      },
    },
  ],
};

export const inputs = [{ a: "Кастомный шрифт" }, { a: "Страница два" }];
