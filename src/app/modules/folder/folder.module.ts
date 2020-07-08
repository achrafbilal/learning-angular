
export class Folder {

  id: string;

type: number;

client: number;

private owner: number;

reference: string;

number: number;

date: Date;

private creation_date: Date;
private last_edit_date: Date;

private is_delete: Boolean ;

  private parent_folder: string;
  
field1: number;

private  field2: string;

private field3: string;

private field4: string;

  get Id(): string {
      return this.id;
  }
  
  set Id(id: string) {
      this.id = id;
  }

  get Type(): number {
      return this.type;
  }
  //@required()
  set Type(type: number) {
      this.type = type;
  }

  get Client(): number {
      return this.client;
  }
  //@required()
  set Client(client: number) {
      this.client = client;
  }

  get Owner(): number {
      return this.owner;
  }
  
  set Owner(owner: number) {
      this.owner = owner;
  }
  
  get Reference(): string {
      return this.reference;
  }
  //@required()
  set Reference(reference: string) {
      this.reference = reference;
  }

  get Number(): number {
      return this.number;
  }
  //@required()
  set Number(number: number) {
      this.number = number;
  }

  get Date(): Date {
      return this.date;
  }
  //@required()
  set Date(date: Date) {
      this.date = date;
  }

  get Creation_date(): Date {
      return this.creation_date;
  }

  set Creation_date(creation_date: Date) {
      this.creation_date = creation_date;
  }

  get Last_edit_date(): Date {
      return this.last_edit_date;
  }

  set Last_edit_date(last_edit_date: Date) {
      this.last_edit_date = last_edit_date;
  }

  public isIs_delete(): Boolean {
      return this.is_delete;
  }

  set Is_delete(is_delete: Boolean) {
      this.is_delete = is_delete;
  }

  get Parent_folder(): string {
      return this.parent_folder;
  }

  set Parent_folder(parent_folder: string) {
      this.parent_folder = parent_folder;
  }



  get Field2(): string {
      return this.field2;
  }

  set Field2(field2: string) {
      this.field2 = field2;
  }

  get Field3(): string {
      return this.field3;
  }

  set Field3(field3: string) {
      this.field3 = field3;
  }

  get Field4(): string {
      return this.field4;
  }

  set Field4(field4: string) {
      this.field4 = field4;
  }


constructor(){}

}

