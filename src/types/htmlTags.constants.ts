export enum HTML_SECTIONS {
  HTML = 'html',
  BODY = 'body',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  P = 'p',
}

export const HTML_TAGS = {
  HTML: {
    START_TAG: `<${HTML_SECTIONS.HTML}>`,
    END_TAG: `</${HTML_SECTIONS.HTML}>`,
  },
  BODY: {
    START_TAG: `<${HTML_SECTIONS.BODY}>`,
    END_TAG: `</${HTML_SECTIONS.BODY}>`,
  },
  H1: {
    START_TAG: `<${HTML_SECTIONS.H1}>`,
    END_TAG: `</${HTML_SECTIONS.H1}>`,
  },
  H2: {
    START_TAG: `<${HTML_SECTIONS.H2}>`,
    END_TAG: `</${HTML_SECTIONS.H2}>`,
  },
  H3: {
    START_TAG: `<${HTML_SECTIONS.H3}>`,
    END_TAG: `</${HTML_SECTIONS.H3}>`,
  },
  H4: {
    START_TAG: `<${HTML_SECTIONS.H4}>`,
    END_TAG: `</${HTML_SECTIONS.H4}>`,
  },
  P: {
    START_TAG: `<${HTML_SECTIONS.P}>`,
    END_TAG: `</${HTML_SECTIONS.P}>`,
  },
};
