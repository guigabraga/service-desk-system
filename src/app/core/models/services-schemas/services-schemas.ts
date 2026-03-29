export interface IServicesObject {
  id: number;
  title: string;
  description: string;
  category: "Infra" | "Acesso" | "Software" | "Conexão";
  status: "Aberto" | "Em atendimento" | "Finalizado" | "Cancelado";
  createDate: string;
}