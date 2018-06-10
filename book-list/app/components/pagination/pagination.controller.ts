class PaginationController implements ng.IComponentController {
  public totalRecords: number = 0;
  public recordsPerPage: number = 5;
  public currentPage: number = 1;

  public totalPages(): number {
    return Math.ceil(this.totalRecords / this.recordsPerPage);
  }

  public next(): void {
    this.currentPage++;
  }

  public prev(): void {
    this.currentPage--;
  }

  public canPrev(): boolean {
    return this.currentPage > 1;
  }

  public canNext(): boolean {
    return this.currentPage < this.totalPages();
  }
}

export default PaginationController;
