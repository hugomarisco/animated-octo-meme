class BookController implements ng.IController {
  public title: string = "";
  public image: string = "";
  public authors: string[] = [];
  public year: number = 0;
  public rating: number = 0;
  public description: string = "";
  public links: string[] = [];

  public showingDescription: boolean = false;

  public toggleDescription(): void {
    this.showingDescription = !this.showingDescription;
  }
}

export default BookController;
