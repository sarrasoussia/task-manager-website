export class Task {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public deadline: Date,
    public owner: string,
    public file: string,  // Assuming 'file' is a string; adjust the type as needed
    public state: string   // Assuming 'state' is a string; adjust the type as needed
  ) {}
}
