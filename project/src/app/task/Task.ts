export class Task {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public deadline: Date,
    public owner: string,
    public state: string = 'pending',
    public file: File | null = null
  ) {}
}
