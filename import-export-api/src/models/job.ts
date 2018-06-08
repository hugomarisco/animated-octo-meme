export enum JobState {
  PENDING = "pending",
  FINISHED = "finished",
}

export default abstract class Job {
  public state: JobState = JobState.PENDING;
  public createdAt: Date = new Date();
  public updatedAt?: Date;

  constructor(public bookId: string, processingTime: number) {
    setTimeout(this.complete.bind(this), processingTime);
  }

  public toJSON(extraProps: object): object {
    return {
      book_id: this.bookId,
      created_at: this.createdAt,
      state: this.state,
      updated_at: this.updatedAt,
      ...extraProps,
    };
  }

  protected complete(): void {
    this.state = JobState.FINISHED;
    this.updatedAt = new Date();
  }
}
