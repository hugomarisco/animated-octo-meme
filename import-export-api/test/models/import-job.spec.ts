import assert from "assert";
import sinon, { SinonFakeTimers } from "sinon";
import ImportJob, { ImportJobType } from "../../src/models/import-job";
import { JobState } from "../../src/models/job";

describe("Import Job Model", () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it("should mark the job as completed after 60 seconds", () => {
    const job = new ImportJob(
      "1",
      ImportJobType.EVERNOTE,
      "http://example.com",
    );

    clock.tick(59000);

    assert.equal(job.state, JobState.PENDING);
    assert.equal(job.updatedAt, undefined);

    clock.tick(1000);

    assert.equal(job.state, JobState.FINISHED);
    assert.deepEqual(job.updatedAt, new Date(60000));
  });
});
