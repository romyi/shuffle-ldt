import * as pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

const definition = {
  header: "Заголовок",
  content: [{ text: "Контент", fontSize: 40 }],
  defaultStyle: {
    font: "MCW",
  },
};

const custom_fonts = {
  MCW: {
    normal: `${import.meta.env.VITE_ORIGIN}/mcw_bold.woff`,
  },
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

export const create_sample = () =>
  pdfMake.createPdf(definition, { custom: {} }, custom_fonts).open();
