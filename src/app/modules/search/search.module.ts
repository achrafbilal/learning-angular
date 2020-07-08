export class Search {
  public id: number;
  public name: string;
  public attributes: SearchAttribute[];
}

export class SearchAttribute {
  public id: number;
  public value: string;
  constructor(id: number, value: string) {
      this.id = id;
      this.value = value;
   }

}