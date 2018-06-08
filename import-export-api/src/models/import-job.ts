import Job from "./job";

export enum ImportJobType {
  WORD = "word",
  PDF = "pdf",
  WATTPAD = "wattpad",
  EVERNOTE = "evernote",
}

const PROCESSING_TIME = 60000;

export default class ImportJob extends Job {
  constructor(bookId: string, public type: ImportJobType, public url: string) {
    super(bookId, PROCESSING_TIME);
  }

  public toJSON(): object {
    return super.toJSON({
      type: this.type,
      url: this.url,
    });
  }
}
