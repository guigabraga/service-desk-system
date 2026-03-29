export interface IServicesObject {
  id: string;
  title: string;
  description: string;
  category: "Infra" | "Acesso" | "Software" | "Conexão";
  status: "Aberto" | "Em atendimento" | "Finalizado" | "Cancelado";
  createDate: string;
}