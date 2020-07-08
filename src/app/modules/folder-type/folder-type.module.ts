export class FolderTypeA{

    
  constructor(public  id: number,
      public name: string){

  }


  public get Id(): number {
      return this.id;
  }
  public set Id(value: number) {
      this.id = value;
  }
}