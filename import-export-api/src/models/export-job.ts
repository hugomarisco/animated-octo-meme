import Job from "./job";

export enum ExportJobType {
  EPUB = "epub",
  PDF = "pdf",
}

const PROCESSING_TIMES = {
  [ExportJobType.EPUB]: 10000,
  [ExportJobType.PDF]: 25000,
};

export default class ExportJob extends Job {
  constructor(bookId: string, public type: ExportJobType) {
    super(bookId, PROCESSING_TIMES[type]);
  }

  public toJSON(): object {
    return super.toJSON({
      type: this.type,
    });
  }
}
