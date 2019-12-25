export class Project {
  id: number;
  visible: boolean;
  nom: string;
  tema: string;
  tipus: string;
  titol: string;
  data: string;
  link: string;
  html: string;
  repositori: string;
  urlProjecte: string;
  urlGrup: string;
  
  likes: number;

  styleLike: string = "gray";

  public estaVotat: boolean = false;
  
  public show: boolean = false;
  
}