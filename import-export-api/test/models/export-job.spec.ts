import assert from "assert";
import sinon, { SinonFakeTimers } from "sinon";
import ImportJob, { ExportJobType } from "../../src/models/export-job";
import ExportJob from "../../src/models/export-job";
import { JobState } from "../../src/models/job";

describe("Export Job Model", () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it("should mark PDF as completed after 25 seconds", () => {
    const job = new ExportJob("1", ExportJobType.PDF);

    clock.tick(24000);

    assert.equal(job.state, JobState.PENDING);
    assert.equal(job.updatedAt, undefined);

    clock.tick(1000);

    assert.equal(job.state, JobState.FINISHED);
    assert.deepEqual(job.updatedAt, new Date(25000));
  });

  it("should mark EPUB as completed after 10 seconds", () => {
    const job = new ExportJob("1", ExportJobType.EPUB);

    clock.tick(9000);

    assert.equal(job.state, JobState.PENDING);
    assert.equal(job.updatedAt, undefined);

    clock.tick(1000);

    assert.equal(job.state, JobState.FINISHED);
    assert.deepEqual(job.updatedAt, new Date(10000));
  });
});
